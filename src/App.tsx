import { LatLngBounds } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet/dist/leaflet.css";
import { GeoJSON, LayersControl, MapContainer, TileLayer } from "react-leaflet";
import cityOsm from "./city-osm.json";
import { CityBoundary } from "./components/CityBoundary";
import features from "./features.json";
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
      <CityBoundary />
      <LayersControl position="topright" collapsed={window.innerWidth < 1080}>
        {config.hazardmapPortalTiles.map((hazardmapPortalTile) => {
          return (
            <LayersControl.Overlay
              key={hazardmapPortalTile.name}
              name={hazardmapPortalTile.name}
            >
              <TileLayer
                url={hazardmapPortalTile.url}
                opacity={0.75}
                attribution='<a href="https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html">ハザードマップポータルサイト</a>'
              />
            </LayersControl.Overlay>
          );
        })}
        {Object.entries(features).map(([name, geojson]) => {
          return (
            <LayersControl.Overlay key={name} name={name}>
              <GeoJSON
                // @ts-ignore
                data={geojson}
                onEachFeature={(feature, layer) => {
                  layer.bindPopup(`
                    <h3 style="margin: 0 0 0.5rem; text-align: center;">${
                      feature.properties.name
                    }</h3>
                    ${Object.entries(feature.properties)
                      .filter(([key, _]) => key !== "name")
                      .map(([key, val]) => `<b>${key}</b>: ${val}<br />`)
                      .join("")}
                  `);
                }}
              />
            </LayersControl.Overlay>
          );
        })}
      </LayersControl>
    </MapContainer>
  );
}

export default App;
