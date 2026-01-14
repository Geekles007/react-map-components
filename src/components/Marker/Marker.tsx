import { useEffect, useState, createContext, useContext } from 'react'
import L from 'leaflet'
import type { Marker as LeafletMarker } from 'leaflet'
import { useMap } from '../../hooks/useMap'
import type { MarkerProps } from '../../types'

// Context for sharing marker with Popup
interface MarkerContextValue {
  marker: LeafletMarker | null
}

const MarkerContext = createContext<MarkerContextValue>({ marker: null })

export function useMarker(): LeafletMarker | null {
  const { marker } = useContext(MarkerContext)
  return marker
}

/**
 * Component for adding markers to the map
 * 
 * @example
 * ```tsx
 * <Marker
 *   position={[51.505, -0.09]}
 *   draggable={false}
 *   eventHandlers={{
 *     click: () => console.log('Marker clicked!')
 *   }}
 * >
 *   <Popup>Hello!</Popup>
 * </Marker>
 * ```
 */
export function Marker({
  position,
  draggable = false,
  opacity,
  alt,
  eventHandlers,
  children,
  options,
}: MarkerProps) {
  const map = useMap()
  const [marker, setMarker] = useState<LeafletMarker | null>(null)

  useEffect(() => {
    if (!map) return

    // Create marker
    const markerInstance = L.marker(position, {
      draggable,
      opacity,
      alt,
      ...options,
    })

    markerInstance.addTo(map)
    setMarker(markerInstance)

    // Cleanup
    return () => {
      markerInstance.remove()
      setMarker(null)
    }
  }, [map]) // eslint-disable-line react-hooks/exhaustive-deps

  // Update position
  useEffect(() => {
    if (marker) {
      marker.setLatLng(position)
    }
  }, [position, marker])

  // Update draggable option
  useEffect(() => {
    if (marker) {
      if (draggable) {
        marker.dragging?.enable()
      } else {
        marker.dragging?.disable()
      }
    }
  }, [draggable, marker])

  // Update opacity
  useEffect(() => {
    if (marker && opacity !== undefined) {
      marker.setOpacity(opacity)
    }
  }, [opacity, marker])

  // Attach event handlers
  useEffect(() => {
    if (!marker || !eventHandlers) return

    const eventNames = Object.keys(eventHandlers) as Array<keyof typeof eventHandlers>
    
    eventNames.forEach(eventName => {
      const handler = eventHandlers[eventName]
      if (handler) {
        // @ts-expect-error - Leaflet's type definitions require specific handler types per event, but we're dynamically iterating
        marker.on(eventName, handler)
      }
    })

    return () => {
      eventNames.forEach(eventName => {
        const handler = eventHandlers[eventName]
        if (handler) {
          // @ts-expect-error - Leaflet's type definitions require specific handler types per event, but we're dynamically iterating
          marker.off(eventName, handler)
        }
      })
    }
  }, [eventHandlers, marker])

  return (
    <MarkerContext.Provider value={{ marker }}>
      {children}
    </MarkerContext.Provider>
  )
}
