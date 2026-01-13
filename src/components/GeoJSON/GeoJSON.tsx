import { useEffect, useRef } from 'react'
import L from 'leaflet'
import type { GeoJSON as LeafletGeoJSON } from 'leaflet'
import { useMap } from '../../hooks/useMap'
import type { GeoJSONProps } from '../../types'

/**
 * Component for rendering GeoJSON data on the map
 * 
 * @example
 * ```tsx
 * const geojsonData = {
 *   type: 'FeatureCollection',
 *   features: [
 *     {
 *       type: 'Feature',
 *       geometry: { type: 'Point', coordinates: [-0.09, 51.505] },
 *       properties: { name: 'London' }
 *     }
 *   ]
 * }
 * 
 * <GeoJSON
 *   data={geojsonData}
 *   style={{ color: 'blue', weight: 2 }}
 *   onEachFeature={(feature, layer) => {
 *     layer.bindPopup(feature.properties.name)
 *   }}
 * />
 * ```
 */
export function GeoJSON({
  data,
  style,
  onEachFeature,
  pointToLayer,
  filter,
  options,
}: GeoJSONProps) {
  const map = useMap()
  const geoJsonRef = useRef<LeafletGeoJSON | null>(null)

  useEffect(() => {
    if (!map || !data) return

    // Create GeoJSON layer
    const geoJson = L.geoJSON(data, {
      style,
      onEachFeature,
      pointToLayer,
      filter,
      ...options,
    })

    geoJson.addTo(map)
    geoJsonRef.current = geoJson

    // Cleanup
    return () => {
      geoJson.remove()
      geoJsonRef.current = null
    }
  }, [map, data, style, onEachFeature, pointToLayer, filter, options])

  // Update data when it changes
  useEffect(() => {
    if (geoJsonRef.current && data) {
      geoJsonRef.current.clearLayers()
      geoJsonRef.current.addData(data)
    }
  }, [data])

  return null
}
