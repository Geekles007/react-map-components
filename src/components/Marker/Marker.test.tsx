import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import L from 'leaflet'
import { Marker } from './Marker'
import { MapContainer } from '../MapContainer'

describe('Marker', () => {
  it('creates a marker at the specified position', () => {
    const position: [number, number] = [51.505, -0.09]
    
    render(
      <MapContainer center={position} zoom={13}>
        <Marker position={position} />
      </MapContainer>
    )

    expect(L.marker).toHaveBeenCalledWith(
      position,
      expect.any(Object)
    )
  })

  it('creates a draggable marker when draggable is true', () => {
    const position: [number, number] = [51.505, -0.09]
    
    render(
      <MapContainer center={position} zoom={13}>
        <Marker position={position} draggable={true} />
      </MapContainer>
    )

    expect(L.marker).toHaveBeenCalledWith(
      position,
      expect.objectContaining({ draggable: true })
    )
  })
})
