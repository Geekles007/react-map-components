import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import L from 'leaflet'
import { GeoJSON } from './GeoJSON'
import { MapContainer } from '../MapContainer'

describe('GeoJSON', () => {
  const mockGeoJSON: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-0.09, 51.505],
        },
        properties: {
          name: 'Test Point',
        },
      },
    ],
  }

  it('creates a GeoJSON layer with the provided data', () => {
    render(
      <MapContainer center={[51.505, -0.09]} zoom={13}>
        <GeoJSON data={mockGeoJSON} />
      </MapContainer>
    )

    expect(L.geoJSON).toHaveBeenCalledWith(
      mockGeoJSON,
      expect.any(Object)
    )
  })

  it('passes style options to GeoJSON layer', () => {
    const style = { color: 'blue', weight: 2 }
    
    render(
      <MapContainer center={[51.505, -0.09]} zoom={13}>
        <GeoJSON data={mockGeoJSON} style={style} />
      </MapContainer>
    )

    expect(L.geoJSON).toHaveBeenCalledWith(
      mockGeoJSON,
      expect.objectContaining({ style })
    )
  })
})
