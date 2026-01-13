import type { Map } from 'leaflet'
import { useMapContext } from '../context/MapContext'

/**
 * Hook to access the Leaflet map instance
 * Must be used within a MapContainer or MapProvider
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const map = useMap()
 *   
 *   const flyToLocation = () => {
 *     map.flyTo([51.505, -0.09], 14)
 *   }
 *   
 *   return <button onClick={flyToLocation}>Go to London</button>
 * }
 * ```
 * 
 * @returns The Leaflet map instance
 * @throws Error if map is not yet initialized or used outside MapContainer
 */
export function useMap(): Map {
  const { map } = useMapContext()
  
  if (!map) {
    throw new Error(
      'Map instance is not available. Make sure this hook is used within a MapContainer ' +
      'and the map has been initialized.'
    )
  }
  
  return map
}
