import { FeatureCollection } from "geojson";
import { LatLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";
import osmtogeojson from "osmtogeojson";
import { GeoJSON, LayersControl, MapContainer, TileLayer } from "react-leaflet";
import cityOsm from "./city-osm.json";
import config from "./hazardmap-config.json";

function App() {
  const bounds = cityOsm.elements[0].bounds;
  const latLngBounds = new LatLngBounds(
    [bounds.minlat, bounds.minlon],
    [bounds.maxlat, bounds.maxlon]
  );
  const cityGeoJson = osmtogeojson(cityOsm) as FeatureCollection;

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

      <GeoJSON
        data={cityGeoJson.features[0]}
        style={() => {
          return { fillOpacity: 0 };
        }}
        attribution='<a href="http://osm.org/copyright">OpenStreetMap</a>'
      />

      <LayersControl position="topright" collapsed={window.innerWidth < 1080}>
        {config.hazardmapPortalTiles.map((hazardmapPortalTile) => {
          return (
            <LayersControl.Overlay name={hazardmapPortalTile.name}>
              <TileLayer
                url={hazardmapPortalTile.url}
                opacity={0.75}
                attribution='<a href="https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html">ハザードマップポータルサイト</a>'
              />
            </LayersControl.Overlay>
          );
        })}
      </LayersControl>
    </MapContainer>
  );
}

export default App;
