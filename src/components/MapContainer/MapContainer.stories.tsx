import type { Meta, StoryObj } from '@storybook/react'
import { MapContainer } from './MapContainer'
import { TileLayer } from '../TileLayer'
import { Marker } from '../Marker'
import { Popup } from '../Popup'

const meta = {
  title: 'Components/MapContainer',
  component: MapContainer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    center: {
      control: 'object',
      description: 'Initial center position [lat, lng]',
    },
    zoom: {
      control: { type: 'range', min: 1, max: 18, step: 1 },
      description: 'Initial zoom level',
    },
    scrollWheelZoom: {
      control: 'boolean',
      description: 'Enable scroll wheel zoom',
    },
    dragging: {
      control: 'boolean',
      description: 'Enable map dragging',
    },
  },
} satisfies Meta<typeof MapContainer>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Basic map with OpenStreetMap tiles
 */
export const Default: Story = {
  args: {
    center: [51.505, -0.09],
    zoom: 13,
    style: { height: '500px', width: '100%' },
  },
  render: (args) => (
    <MapContainer {...args}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  ),
}

/**
 * Map with a marker and popup
 */
export const WithMarker: Story = {
  args: {
    center: [51.505, -0.09],
    zoom: 13,
    style: { height: '500px', width: '100%' },
  },
  render: (args) => (
    <MapContainer {...args}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          <h3 style={{ margin: '0 0 8px 0' }}>London</h3>
          <p style={{ margin: 0 }}>Welcome to London!</p>
        </Popup>
      </Marker>
    </MapContainer>
  ),
}

/**
 * Map with multiple markers
 */
export const MultipleMarkers: Story = {
  args: {
    center: [51.505, -0.09],
    zoom: 12,
    style: { height: '500px', width: '100%' },
  },
  render: (args) => (
    <MapContainer {...args}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>Location 1</Popup>
      </Marker>
      <Marker position={[51.51, -0.1]}>
        <Popup>Location 2</Popup>
      </Marker>
      <Marker position={[51.49, -0.08]}>
        <Popup>Location 3</Popup>
      </Marker>
    </MapContainer>
  ),
}

/**
 * Full screen map
 */
export const FullScreen: Story = {
  args: {
    center: [48.8566, 2.3522],
    zoom: 12,
    style: { height: '100vh', width: '100%' },
  },
  render: (args) => (
    <MapContainer {...args}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[48.8566, 2.3522]}>
        <Popup>
          <h3 style={{ margin: '0 0 8px 0' }}>Paris</h3>
          <p style={{ margin: 0 }}>The City of Light</p>
        </Popup>
      </Marker>
    </MapContainer>
  ),
}

/**
 * Map with disabled interactions
 */
export const StaticMap: Story = {
  args: {
    center: [51.505, -0.09],
    zoom: 13,
    scrollWheelZoom: false,
    dragging: false,
    doubleClickZoom: false,
    zoomControl: false,
    style: { height: '300px', width: '100%' },
  },
  render: (args) => (
    <MapContainer {...args}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  ),
}
