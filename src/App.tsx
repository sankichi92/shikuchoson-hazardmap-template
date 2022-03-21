import { LatLngBounds } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet/dist/leaflet.css";
import { Helmet } from "react-helmet";
import {
  GeoJSON,
  LayersControl,
  MapContainer,
  ScaleControl,
  TileLayer,
} from "react-leaflet";
import { BottomLeftImages } from "./components/BottomLeftImages";
import { OverlayFeatureLayers } from "./components/OverlayFeatureLayers";
import { OverlayTileLayers } from "./components/OverlayTileLayers";
import csvFeatureCollections from "./generated/csv-feature-collections.json";
import config from "./generated/hazardmap-config.json";
import imageNames from "./generated/image-names.json";
import shikuchosonBoundary from "./generated/shikuchoson-boundary.json";

const breakpoint = 768;

function App() {
  const bounds = new LatLngBounds(
    [shikuchosonBoundary.bbox[1], shikuchosonBoundary.bbox[0]],
    [shikuchosonBoundary.bbox[3], shikuchosonBoundary.bbox[2]]
  );

  return (
    <>
      <Helmet>
        <title>{config.shikuchoson}ハザードマップ</title>
      </Helmet>

      <MapContainer
        bounds={bounds}
        maxBounds={bounds}
        minZoom={5}
        maxZoom={17}
        style={{ height: "100vh" }}
      >
        <TileLayer
          url="https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png"
          attribution='<a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>'
        />

        <ScaleControl position="bottomright" />

        <GeoJSON
          // @ts-ignore
          data={shikuchosonBoundary.geometry}
          style={{ fillOpacity: 0 }}
        />

        <LayersControl
          position="topright"
          collapsed={window.innerWidth <= breakpoint}
        >
          <OverlayTileLayers tiles={config.tiles} />
          <OverlayFeatureLayers
            // @ts-ignore
            featureCollections={csvFeatureCollections}
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
