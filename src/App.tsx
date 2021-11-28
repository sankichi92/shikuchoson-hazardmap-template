import { LatLngBounds } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet/dist/leaflet.css";
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import cityOsm from "./city-osm.json";
import { CityBoundary } from "./components/CityBoundary";
import { OverlayFeatureLayers } from "./components/OverlayFeatureLayers";
import { OverlayTileLayers } from "./components/OverlayTileLayers";
import featureCollections from "./feature-collections.json";
import config from "./hazardmap-config.json";

function App() {
  const bounds = cityOsm.elements[0].bounds;
  const latLngBounds = new LatLngBounds(
    [bounds.minlat, bounds.minlon],
    [bounds.maxlat, bounds.maxlon]
  );

  return (
    <MapContainer
      bounds={latLngBounds}
      maxBounds={latLngBounds}
      minZoom={5}
      maxZoom={17}
      style={{ height: "100vh" }}
    >
      <TileLayer
        url="https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png"
        attribution='<a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>'
      />
      <CityBoundary cityOsm={cityOsm} />
      <LayersControl position="topright" collapsed={window.innerWidth <= 768}>
        <OverlayTileLayers tiles={config.tiles} />
        <OverlayFeatureLayers
          // @ts-ignore
          featureCollections={featureCollections}
        />
      </LayersControl>
    </MapContainer>
  );
}

export default App;
