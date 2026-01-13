import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MapContainer } from './MapContainer'

describe('MapContainer', () => {
  it('renders without crashing', () => {
    render(
      <MapContainer center={[51.505, -0.09]} zoom={13}>
        <div data-testid="child">Child content</div>
      </MapContainer>
    )
    
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('applies custom styles', () => {
    const { container } = render(
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: '500px', width: '100%' }}
      />
    )
    
    const mapDiv = container.firstChild as HTMLElement
    expect(mapDiv).toHaveStyle({ height: '500px', width: '100%' })
  })

  it('applies custom className', () => {
    const { container } = render(
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        className="custom-map"
      />
    )
    
    const mapDiv = container.firstChild as HTMLElement
    expect(mapDiv).toHaveClass('custom-map')
  })
})
