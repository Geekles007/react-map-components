import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import L from 'leaflet'
import { TileLayer } from './TileLayer'
import { MapContainer } from '../MapContainer'

describe('TileLayer', () => {
  it('creates a tile layer with the correct URL', () => {
    const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    
    render(
      <MapContainer center={[51.505, -0.09]} zoom={13}>
        <TileLayer url={url} />
      </MapContainer>
    )

    expect(L.tileLayer).toHaveBeenCalledWith(
      url,
      expect.any(Object)
    )
  })

  it('passes attribution to tile layer', () => {
    const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    const attribution = '© OpenStreetMap'
    
    render(
      <MapContainer center={[51.505, -0.09]} zoom={13}>
        <TileLayer url={url} attribution={attribution} />
      </MapContainer>
    )

    expect(L.tileLayer).toHaveBeenCalledWith(
      url,
      expect.objectContaining({ attribution })
    )
  })
})
