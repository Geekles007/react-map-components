import type { Map, LatLngExpression, MapOptions, TileLayerOptions, MarkerOptions, PopupOptions, GeoJSONOptions, LeafletEventHandlerFnMap } from 'leaflet'
import type { CSSProperties, ReactNode } from 'react'

// Re-export useful Leaflet types
export type { LatLngExpression, Map as LeafletMap }

/**
 * Props for the MapContainer component
 */
export interface MapContainerProps {
  /** Initial center position [lat, lng] */
  center: LatLngExpression
  /** Initial zoom level */
  zoom: number
  /** Minimum zoom level */
  minZoom?: number
  /** Maximum zoom level */
  maxZoom?: number
  /** Enable scroll wheel zoom */
  scrollWheelZoom?: boolean
  /** Enable dragging */
  dragging?: boolean
  /** Enable double click zoom */
  doubleClickZoom?: boolean
  /** Enable zoom control */
  zoomControl?: boolean
  /** Custom CSS styles */
  style?: CSSProperties
  /** Custom CSS class */
  className?: string
  /** Child components */
  children?: ReactNode
  /** Callback when map is ready */
  whenReady?: (map: Map) => void
  /** Additional Leaflet map options */
  options?: Omit<MapOptions, 'center' | 'zoom'>
}

/**
 * Props for the TileLayer component
 */
export interface TileLayerProps {
  /** Tile URL template */
  url: string
  /** Attribution text */
  attribution?: string
  /** Maximum zoom level */
  maxZoom?: number
  /** Minimum zoom level */
  minZoom?: number
  /** Tile opacity (0-1) */
  opacity?: number
  /** Z-index */
  zIndex?: number
  /** Additional Leaflet tile layer options */
  options?: Omit<TileLayerOptions, 'attribution' | 'maxZoom' | 'minZoom'>
}

/**
 * Props for the Marker component
 */
export interface MarkerProps {
  /** Marker position [lat, lng] */
  position: LatLngExpression
  /** Enable dragging */
  draggable?: boolean
  /** Marker opacity (0-1) */
  opacity?: number
  /** Alt text for accessibility */
  alt?: string
  /** Event handlers */
  eventHandlers?: LeafletEventHandlerFnMap
  /** Child components (usually Popup) */
  children?: ReactNode
  /** Additional Leaflet marker options */
  options?: Omit<MarkerOptions, 'draggable' | 'opacity' | 'alt'>
}

/**
 * Props for the Popup component
 */
export interface PopupProps {
  /** Popup position (optional if used inside Marker) */
  position?: LatLngExpression
  /** Popup content */
  children: ReactNode
  /** Maximum width */
  maxWidth?: number
  /** Minimum width */
  minWidth?: number
  /** Auto close on map click */
  autoClose?: boolean
  /** Close on click */
  closeOnClick?: boolean
  /** Custom CSS class */
  className?: string
  /** Additional Leaflet popup options */
  options?: Omit<PopupOptions, 'maxWidth' | 'minWidth' | 'autoClose' | 'closeOnClick' | 'className'>
}

/**
 * Props for the GeoJSON component
 */
export interface GeoJSONProps {
  /** GeoJSON data */
  data: GeoJSON.GeoJsonObject
  /** Style for features */
  style?: GeoJSONOptions['style']
  /** Callback for each feature */
  onEachFeature?: GeoJSONOptions['onEachFeature']
  /** Point to layer callback */
  pointToLayer?: GeoJSONOptions['pointToLayer']
  /** Filter function */
  filter?: GeoJSONOptions['filter']
  /** Additional Leaflet GeoJSON options */
  options?: Omit<GeoJSONOptions, 'style' | 'onEachFeature' | 'pointToLayer' | 'filter'>
}

/**
 * Map context value
 */
export interface MapContextValue {
  /** Leaflet map instance */
  map: Map | null
  /** Set map instance */
  setMap: (map: Map | null) => void
}

/**
 * Event handlers map type
 */
export type MapEventHandlers = LeafletEventHandlerFnMap
