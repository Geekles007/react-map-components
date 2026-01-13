import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import L from 'leaflet'
import type { Popup as LeafletPopup } from 'leaflet'
import { useMap } from '../../hooks/useMap'
import { useMarker } from '../Marker/Marker'
import type { PopupProps } from '../../types'

/**
 * Component for adding popups to markers or the map
 * 
 * When used inside a Marker, it automatically binds to that marker.
 * When used standalone, you must provide a position.
 * 
 * @example
 * ```tsx
 * // Inside a Marker
 * <Marker position={[51.505, -0.09]}>
 *   <Popup>
 *     <h3>My Location</h3>
 *     <p>This is where I am!</p>
 *   </Popup>
 * </Marker>
 * 
 * // Standalone
 * <Popup position={[51.505, -0.09]}>
 *   Hello from this location!
 * </Popup>
 * ```
 */
export function Popup({
  position,
  children,
  maxWidth = 300,
  minWidth = 50,
  autoClose = true,
  closeOnClick = true,
  className,
  options,
}: PopupProps) {
  const map = useMap()
  const marker = useMarker()
  const popupRef = useRef<LeafletPopup | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!map) return

    // Create container for React portal
    const container = document.createElement('div')
    containerRef.current = container

    // Create popup
    const popup = L.popup({
      maxWidth,
      minWidth,
      autoClose,
      closeOnClick,
      className,
      ...options,
    })

    popup.setContent(container)
    popupRef.current = popup

    // Bind to marker or open at position
    if (marker) {
      marker.bindPopup(popup)
    } else if (position) {
      popup.setLatLng(position).openOn(map)
    }

    // Cleanup
    return () => {
      if (marker) {
        marker.unbindPopup()
      }
      popup.remove()
      popupRef.current = null
      containerRef.current = null
    }
  }, [map, marker]) // eslint-disable-line react-hooks/exhaustive-deps

  // Update position for standalone popups
  useEffect(() => {
    if (popupRef.current && position && !marker) {
      popupRef.current.setLatLng(position)
    }
  }, [position, marker])

  // Render children into popup container using portal
  if (!containerRef.current) {
    return null
  }

  return createPortal(children, containerRef.current)
}
