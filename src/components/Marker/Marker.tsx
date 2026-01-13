import { useEffect, useRef, createContext, useContext } from 'react'
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
  const markerRef = useRef<LeafletMarker | null>(null)

  useEffect(() => {
    if (!map) return

    // Create marker
    const marker = L.marker(position, {
      draggable,
      opacity,
      alt,
      ...options,
    })

    marker.addTo(map)
    markerRef.current = marker

    // Cleanup
    return () => {
      marker.remove()
      markerRef.current = null
    }
  }, [map]) // eslint-disable-line react-hooks/exhaustive-deps

  // Update position
  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLatLng(position)
    }
  }, [position])

  // Update draggable option
  useEffect(() => {
    if (markerRef.current) {
      if (draggable) {
        markerRef.current.dragging?.enable()
      } else {
        markerRef.current.dragging?.disable()
      }
    }
  }, [draggable])

  // Update opacity
  useEffect(() => {
    if (markerRef.current && opacity !== undefined) {
      markerRef.current.setOpacity(opacity)
    }
  }, [opacity])

  // Attach event handlers
  useEffect(() => {
    const marker = markerRef.current
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
  }, [eventHandlers])

  return (
    <MarkerContext.Provider value={{ marker: markerRef.current }}>
      {children}
    </MarkerContext.Provider>
  )
}
