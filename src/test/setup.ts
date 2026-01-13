import '@testing-library/jest-dom'

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
  bindPopup: vi.fn().mockReturnThis(),
  on: vi.fn(),
  off: vi.fn(),
  setLatLng: vi.fn(),
}

const mockPopup = {
  setContent: vi.fn().mockReturnThis(),
  openOn: vi.fn(),
  remove: vi.fn(),
}

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
    popup: vi.fn(() => mockPopup),
    geoJSON: vi.fn(() => mockGeoJSON),
    Icon: {
      Default: {
        mergeOptions: vi.fn(),
      },
    },
  },
  map: vi.fn(() => mockMap),
  tileLayer: vi.fn(() => mockTileLayer),
  marker: vi.fn(() => mockMarker),
  popup: vi.fn(() => mockPopup),
  geoJSON: vi.fn(() => mockGeoJSON),
}))

// Reset mocks before each test
beforeEach(() => {
  vi.clearAllMocks()
})
