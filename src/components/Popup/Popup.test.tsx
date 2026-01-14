import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MapContainer } from '../MapContainer'
import { Marker } from '../Marker'
import { Popup } from './Popup'

describe('Popup', () => {
  it('renders children content', () => {
    render(
      <MapContainer center={[51.505, -0.09]} zoom={13}>
        <Marker position={[51.505, -0.09]}>
          <Popup>
            <span data-testid="popup-content">Hello World</span>
          </Popup>
        </Marker>
      </MapContainer>
    )

    // Note: Due to portal rendering, we need to query the document
    expect(document.querySelector('[data-testid="popup-content"]')).toBeTruthy()
  })

  it('renders with custom className', () => {
    render(
      <MapContainer center={[51.505, -0.09]} zoom={13}>
        <Popup position={[51.505, -0.09]} className="custom-popup">
          Test content
        </Popup>
      </MapContainer>
    )

    // Popup should be created with the class
    expect(document.querySelector('.custom-popup')).toBeTruthy()
  })
})
