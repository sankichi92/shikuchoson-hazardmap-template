import { FeatureCollection } from "geojson";
import "leaflet/dist/leaflet.css";
import osmtogeojson from "osmtogeojson";
import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
import cityOsm from "./city-osm.json";
import config from "./hazardmap-config.json";

function App() {
  const bounds = cityOsm.elements[0].bounds;
  const node = cityOsm.elements[0].members.find((member) => {
    return member.type === "node";
  }) as { lat: number; lon: number };
  const cityGeoJson = osmtogeojson(cityOsm) as FeatureCollection;

  return (
    <MapContainer
      center={[node.lat, node.lon]}
      zoom={config.zoom}
      minZoom={10}
      maxBounds={[
        [bounds.minlat, bounds.minlon],
        [bounds.maxlat, bounds.maxlon],
      ]}
      style={{ height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        data={cityGeoJson.features[0]}
        style={() => {
          return { fillOpacity: 0 };
        }}
      />
    </MapContainer>
  );
}

export default App;
