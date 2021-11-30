import { LatLngBounds } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet/dist/leaflet.css";
import { Helmet } from "react-helmet";
import {
  LayersControl,
  MapContainer,
  ScaleControl,
  TileLayer,
} from "react-leaflet";
import { BottomLeftImages } from "./components/BottomLeftImages";
import { CityBoundary } from "./components/CityBoundary";
import { OverlayFeatureLayers } from "./components/OverlayFeatureLayers";
import { OverlayTileLayers } from "./components/OverlayTileLayers";
import cityOsm from "./generated/city-osm.json";
import featureCollections from "./generated/feature-collections.json";
import config from "./generated/hazardmap-config.json";
import imageNames from "./generated/image-names.json";

const breakpoint = 768;

function App() {
  const bounds = cityOsm.elements[0].bounds;
  const latLngBounds = new LatLngBounds(
    [bounds.minlat, bounds.minlon],
    [bounds.maxlat, bounds.maxlon]
  );

  return (
    <>
      <Helmet>
        <title>{config.city}ハザードマップ</title>
      </Helmet>

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
        <ScaleControl position="bottomright" />
        <CityBoundary cityOsm={cityOsm} />
        <LayersControl
          position="topright"
          collapsed={window.innerWidth <= breakpoint}
        >
          <OverlayTileLayers tiles={config.tiles} />
          <OverlayFeatureLayers
            // @ts-ignore
            featureCollections={featureCollections}
          />
        </LayersControl>
        <BottomLeftImages
          imageNames={imageNames}
          collapsed={window.innerWidth <= breakpoint}
        />
      </MapContainer>
    </>
  );
}

export default App;
