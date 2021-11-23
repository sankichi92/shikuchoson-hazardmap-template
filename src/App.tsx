import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
import { fetchBoundary } from "./fetchCityBoundary";

function App() {
  const [cityBoundary, setCityBoundary] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetchBoundary("八王子市");
      // @ts-ignore
      setCityBoundary(response);
    })();
  }, []);

  return (
    <MapContainer
      center={[35.66667, 139.31583]}
      zoom={13}
      style={{ height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {cityBoundary && <GeoJSON data={cityBoundary} />}
    </MapContainer>
  );
}

export default App;
