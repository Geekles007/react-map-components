import '@testing-library/jest-dom/vitest'
import { beforeEach, vi } from 'vitest'

// Mock Leaflet for testing
const mockMap = {
  setView: vi.fn().mockReturnThis(),
  remove: vi.fn(),
  on: vi.fn(),
  off: vi.fn(),
  flyTo: vi.fn(),
  getCenter: vi.fn(() => ({ lat: 0, lng: 0 })),
  getZoom: vi.fn(() => 13),
  addLayer: vi.fn(),
  removeLayer: vi.fn(),
}

const mockTileLayer = {
  addTo: vi.fn().mockReturnThis(),
  remove: vi.fn(),
}

const mockMarker = {
  addTo: vi.fn().mockReturnThis(),
  remove: vi.fn(),
  bindPopup: vi.fn(function(this: any, popup: any) {
    this._popup = popup
    return this
  }),
  unbindPopup: vi.fn().mockReturnThis(),
  on: vi.fn(),
  off: vi.fn(),
  setLatLng: vi.fn().mockReturnThis(),
  setOpacity: vi.fn().mockReturnThis(),
  dragging: {
    enable: vi.fn(),
    disable: vi.fn(),
  },
}

const createMockPopup = (options?: any) => ({
  _content: null as HTMLElement | null,
  _options: options || {},
  _isOpen: false,
  setContent: vi.fn(function(this: any, content: HTMLElement) {
    this._content = content
    return this
  }),
  setLatLng: vi.fn().mockReturnThis(),
  openOn: vi.fn(function(this: any) {
    // Simulate Leaflet adding popup content to DOM
    if (this._content) {
      // Wrap content in a container with the className if provided
      const wrapper = document.createElement('div')
      if (this._options.className) {
        wrapper.className = this._options.className
      }
      wrapper.appendChild(this._content)
      document.body.appendChild(wrapper)
      this._wrapper = wrapper
      this._isOpen = true
    }
    return this
  }),
  isOpen: vi.fn(function(this: any) {
    return this._isOpen
  }),
  remove: vi.fn(function(this: any) {
    // Simulate Leaflet removing popup content from DOM
    if (this._wrapper && this._wrapper.parentNode) {
      this._wrapper.parentNode.removeChild(this._wrapper)
    }
    this._isOpen = false
  }),
})

const mockGeoJSON = {
  addTo: vi.fn().mockReturnThis(),
  remove: vi.fn(),
  addData: vi.fn(),
  clearLayers: vi.fn(),
}

vi.mock('leaflet', () => ({
  default: {
    map: vi.fn(() => mockMap),
    tileLayer: vi.fn(() => mockTileLayer),
    marker: vi.fn(() => mockMarker),
    popup: vi.fn((options) => createMockPopup(options)),
    geoJSON: vi.fn(() => mockGeoJSON),
    Icon: {
      Default: {
        prototype: {
          _getIconUrl: vi.fn(),
        },
        mergeOptions: vi.fn(),
      },
    },
  },
  map: vi.fn(() => mockMap),
  tileLayer: vi.fn(() => mockTileLayer),
  marker: vi.fn(() => mockMarker),
  popup: vi.fn((options) => createMockPopup(options)),
  geoJSON: vi.fn(() => mockGeoJSON),
}))

// Reset mocks before each test
beforeEach(() => {
  vi.clearAllMocks()
})
