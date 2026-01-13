import { useEffect, useRef } from 'react'
import L from 'leaflet'
import type { TileLayer as LeafletTileLayer } from 'leaflet'
import { useMap } from '../../hooks/useMap'
import type { TileLayerProps } from '../../types'

/**
 * Component for adding tile layers to the map
 * 
 * @example
 * ```tsx
 * <TileLayer
 *   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
 *   attribution='&copy; OpenStreetMap contributors'
 *   maxZoom={19}
 * />
 * ```
 */
export function TileLayer({
  url,
  attribution,
  maxZoom,
  minZoom,
  opacity,
  zIndex,
  options,
}: TileLayerProps) {
  const map = useMap()
  const tileLayerRef = useRef<LeafletTileLayer | null>(null)

  useEffect(() => {
    if (!map) return

    // Create tile layer
    const tileLayer = L.tileLayer(url, {
      attribution,
      maxZoom,
      minZoom,
      opacity,
      zIndex,
      ...options,
    })

    tileLayer.addTo(map)
    tileLayerRef.current = tileLayer

    // Cleanup
    return () => {
      tileLayer.remove()
      tileLayerRef.current = null
    }
  }, [map, url, attribution, maxZoom, minZoom, opacity, zIndex, options])

  return null
}
