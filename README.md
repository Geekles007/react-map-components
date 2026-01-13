# React Map Components

[![npm version](https://badge.fury.io/js/@geekles%2Freact-map-components.svg)](https://www.npmjs.com/package/@geekles/react-map-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue.svg)](https://www.typescriptlang.org/)

Modern, lightweight React components for interactive maps built on top of Leaflet.

## ✨ Features

- 🗺️ **Easy to use** - Simple, declarative API for creating maps
- 📦 **Lightweight** - Tree-shakeable, only import what you need
- 🎨 **Customizable** - Full control over styling and behavior
- 📱 **Responsive** - Works great on desktop and mobile
- 🔧 **TypeScript** - Full type support out of the box
- ⚛️ **React 18/19** - Built for modern React with hooks

## 📦 Installation

```bash
# npm
npm install @geekles/react-map-components

# yarn
yarn add @geekles/react-map-components

# pnpm
pnpm add @geekles/react-map-components
```

## 🚀 Quick Start

```tsx
import { MapContainer, TileLayer, Marker, Popup } from '@geekles/react-map-components'
import '@geekles/react-map-components/styles.css'

function App() {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          Hello! I'm a popup.
        </Popup>
      </Marker>
    </MapContainer>
  )
}
```

## 📚 Components

### MapContainer

The main container component for your map.

```tsx
<MapContainer
  center={[lat, lng]}
  zoom={13}
  minZoom={1}
  maxZoom={18}
  scrollWheelZoom={true}
  style={{ height: '100vh' }}
>
  {/* children */}
</MapContainer>
```

### TileLayer

Add tile layers to your map.

```tsx
<TileLayer
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  attribution="© OpenStreetMap"
  maxZoom={19}
/>
```

### Marker

Add markers to your map.

```tsx
<Marker 
  position={[51.505, -0.09]}
  draggable={false}
  eventHandlers={{
    click: () => console.log('Marker clicked!')
  }}
/>
```

### Popup

Add popups to markers or the map.

```tsx
<Marker position={[51.505, -0.09]}>
  <Popup>
    <h3>My Location</h3>
    <p>This is where I am!</p>
  </Popup>
</Marker>
```

### GeoJSON

Render GeoJSON data on your map.

```tsx
<GeoJSON 
  data={geojsonData}
  style={{ color: 'blue', weight: 2 }}
  onEachFeature={(feature, layer) => {
    layer.bindPopup(feature.properties.name)
  }}
/>
```

## 🪝 Hooks

### useMap

Access the map instance from any child component.

```tsx
import { useMap } from '@geekles/react-map-components'

function MyComponent() {
  const map = useMap()
  
  const flyToLocation = () => {
    map.flyTo([51.505, -0.09], 14)
  }
  
  return <button onClick={flyToLocation}>Go to London</button>
}
```

### useMapEvents

Subscribe to map events.

```tsx
import { useMapEvents } from '@geekles/react-map-components'

function LocationLogger() {
  useMapEvents({
    click: (e) => {
      console.log('Clicked at:', e.latlng)
    },
    zoomend: () => {
      console.log('Zoom changed')
    }
  })
  
  return null
}
```

## 🎨 Styling

Import the default styles:

```tsx
import '@geekles/react-map-components/styles.css'
```

Or customize with your own CSS:

```css
.leaflet-container {
  height: 100%;
  width: 100%;
  border-radius: 8px;
}

.leaflet-popup-content-wrapper {
  border-radius: 12px;
}
```

## 🔧 TypeScript

All components are fully typed. Import types as needed:

```tsx
import type { 
  MapContainerProps, 
  MarkerProps, 
  LatLngExpression 
} from '@geekles/react-map-components'
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

```bash
# Clone the repo
git clone https://github.com/geekles/react-map-components.git
cd react-map-components

# Install dependencies
pnpm install

# Start Storybook for development
pnpm dev

# Run tests
pnpm test

# Build the library
pnpm build
```

## 📝 License

MIT © [geekles](https://github.com/geekles)

## 🙏 Acknowledgments

- Built on top of [Leaflet](https://leafletjs.com/)
- Inspired by [react-leaflet](https://react-leaflet.js.org/)
