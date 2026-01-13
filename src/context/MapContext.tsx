import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Map } from 'leaflet'
import type { MapContextValue } from '../types'

const MapContext = createContext<MapContextValue | null>(null)

export interface MapProviderProps {
  children: ReactNode
}

/**
 * Provider component for sharing map instance across components
 */
export function MapProvider({ children }: MapProviderProps) {
  const [map, setMap] = useState<Map | null>(null)

  return (
    <MapContext.Provider value={{ map, setMap }}>
      {children}
    </MapContext.Provider>
  )
}

/**
 * Hook to access the map context
 * @throws Error if used outside of MapProvider
 */
export function useMapContext(): MapContextValue {
  const context = useContext(MapContext)
  
  if (!context) {
    throw new Error('useMapContext must be used within a MapProvider or MapContainer')
  }
  
  return context
}

export { MapContext }
