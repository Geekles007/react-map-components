import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import type { Map } from 'leaflet'
import { MapProvider, useMapContext } from '../../context/MapContext'
import type { MapContainerProps } from '../../types'

// Fix for default marker icons in Leaflet with bundlers
import 'leaflet/dist/leaflet.css'

// @ts-expect-error - Leaflet icon fix
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

interface MapContainerInnerProps extends MapContainerProps {
  setMapReady: (ready: boolean) => void
}

function MapContainerInner({
  center,
  zoom,
  minZoom,
  maxZoom,
  scrollWheelZoom = true,
  dragging = true,
  doubleClickZoom = true,
  zoomControl = true,
  style,
  className,
  children,
  whenReady,
  options,
  setMapReady,
}: MapContainerInnerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { setMap } = useMapContext()
  const mapRef = useRef<Map | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    // Create the map
    const map = L.map(containerRef.current, {
      center,
      zoom,
      minZoom,
      maxZoom,
      scrollWheelZoom,
      dragging,
      doubleClickZoom,
      zoomControl,
      ...options,
    })

    mapRef.current = map
    setMap(map)
    setMapReady(true)

    // Call whenReady callback
    if (whenReady) {
      whenReady(map)
    }

    // Cleanup
    return () => {
      map.remove()
      mapRef.current = null
      setMap(null)
      setMapReady(false)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Update view when center or zoom changes
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(center, zoom)
    }
  }, [center, zoom])

  return (
    <div
      ref={containerRef}
      style={{
        height: '100%',
        width: '100%',
        ...style,
      }}
      className={className}
    >
      {children}
    </div>
  )
}

/**
 * Main container component for creating a Leaflet map
 * 
 * @example
 * ```tsx
 * <MapContainer
 *   center={[51.505, -0.09]}
 *   zoom={13}
 *   style={{ height: '400px' }}
 * >
 *   <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
 *   <Marker position={[51.505, -0.09]} />
 * </MapContainer>
 * ```
 */
export function MapContainer(props: MapContainerProps) {
  const [mapReady, setMapReady] = useState(false)

  return (
    <MapProvider>
      <MapContainerInner {...props} setMapReady={setMapReady}>
        {mapReady ? props.children : null}
      </MapContainerInner>
    </MapProvider>
  )
}
