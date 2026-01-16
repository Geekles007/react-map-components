import { useEffect, useRef, useState } from 'react'
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
  const [container, setContainer] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!map) return

    // Create container for React portal
    const containerElement = document.createElement('div')
    setContainer(containerElement)

    // Create popup with position if standalone
    const popupOptions = {
      maxWidth,
      minWidth,
      autoClose,
      closeOnClick,
      className,
      ...options,
    }

    const popup = !marker && position 
      ? L.popup(popupOptions).setLatLng(position)
      : L.popup(popupOptions)

    popup.setContent(containerElement)
    popupRef.current = popup

    // Bind to marker (don't open yet)
    if (marker) {
      marker.bindPopup(popup)
    }

    // Cleanup
    return () => {
      if (marker) {
        marker.unbindPopup()
      }
      popup.remove()
      popupRef.current = null
      setContainer(null)
    }
  }, [map, marker]) // eslint-disable-line react-hooks/exhaustive-deps

  // Open popup after container is ready
  useEffect(() => {
    if (popupRef.current && container && map) {
      if (marker) {
        // For marker-bound popups, use marker's openPopup method which handles position
        marker.openPopup()
      } else if (position) {
        // For standalone popups, open at position
        popupRef.current.openOn(map)
      }
    }
  }, [container, map, marker, position])  // Update position for standalone popups
  useEffect(() => {
    if (popupRef.current && position && !marker && map) {
      popupRef.current.setLatLng(position)
      if (!popupRef.current.isOpen()) {
        popupRef.current.openOn(map)
      }
    }
  }, [position, marker, map])

  // Render children into popup container using portal
  if (!container) {
    return null
  }

  return createPortal(children, container)
}
