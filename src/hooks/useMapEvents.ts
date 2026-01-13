import { useEffect } from 'react'
import type { LeafletEventHandlerFnMap } from 'leaflet'
import { useMap } from './useMap'

/**
 * Hook to subscribe to Leaflet map events
 * Automatically cleans up event listeners on unmount
 * 
 * @example
 * ```tsx
 * function LocationLogger() {
 *   useMapEvents({
 *     click: (e) => {
 *       console.log('Clicked at:', e.latlng)
 *     },
 *     zoomend: () => {
 *       console.log('Zoom changed')
 *     },
 *     moveend: () => {
 *       console.log('Map moved')
 *     }
 *   })
 *   
 *   return null
 * }
 * ```
 * 
 * @param handlers - Object mapping event names to handler functions
 */
export function useMapEvents(handlers: LeafletEventHandlerFnMap): void {
  const map = useMap()

  useEffect(() => {
    if (!map || !handlers) return

    // Register all event handlers
    const eventNames = Object.keys(handlers) as Array<keyof LeafletEventHandlerFnMap>
    
    eventNames.forEach(eventName => {
      const handler = handlers[eventName]
      if (handler) {
        // @ts-expect-error - Leaflet's type definitions require specific handler types per event, but we're dynamically iterating
        map.on(eventName, handler)
      }
    })

    // Cleanup: remove all event handlers
    return () => {
      eventNames.forEach(eventName => {
        const handler = handlers[eventName]
        if (handler) {
          // @ts-expect-error - Leaflet's type definitions require specific handler types per event, but we're dynamically iterating
          map.off(eventName, handler)
        }
      })
    }
  }, [map, handlers])
}
