import { Icon, LatLngBounds, Marker } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet/dist/leaflet.css";
import ReactDOMServer from "react-dom/server";
import { Helmet } from "react-helmet";
import {
  GeoJSON,
  LayersControl,
  Map,
  ScaleControl,
  TileLayer
} from "react-leaflet";
import { BottomLeftImages } from "./components/BottomLeftImages";
import { CityBoundary } from "./components/CityBoundary";
import { FeaturePopup } from "./components/FeaturePopup";
import cityOsm from "./generated/city-osm.json";
import featureCollections from "./generated/feature-collections.json";
import config from "./generated/hazardmap-config.json";
import imageNames from "./generated/image-names.json";

const breakpoint = 768;

const iconColors = [
  "blue",
  "gold",
  "red",
  "green",
  "orange",
  "yellow",
  "violet",
  "gray",
  "black",
];

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

      <Map
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
          {/* Tiles */}
          {config.tiles.map((tile) => {
            return (
              <LayersControl.Overlay key={tile.name} name={tile.name}>
                <TileLayer
                  url={tile.url}
                  opacity={0.75}
                  attribution={tile.attribution}
                />
              </LayersControl.Overlay>
            );
          })}

          {/* CSV Point Features */}
          {Object.entries(featureCollections).map(
            ([name, featureCollection], i) => {
              const iconColor = iconColors[i % iconColors.length];
              const icon = new Icon.Default({
                iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${iconColor}.png`,
                iconRetinaUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${iconColor}.png`,
              });

              return (
                <LayersControl.Overlay key={name} name={name}>
                  <GeoJSON
                    // @ts-ignore
                    data={featureCollection}
                    pointToLayer={(pointFeature, latlng) => {
                      return new Marker(latlng, { icon: icon }).bindPopup(
                        // https://stackoverflow.com/a/60686195
                        ReactDOMServer.renderToString(
                          <FeaturePopup feature={pointFeature} />
                        )
                      );
                    }}
                  />
                </LayersControl.Overlay>
              );
            }
          )}
        </LayersControl>

        <BottomLeftImages
          imageNames={imageNames}
          collapsed={window.innerWidth <= breakpoint}
        />
      </Map>
    </>
  );
}

export default App;
