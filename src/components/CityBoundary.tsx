import { FeatureCollection } from "geojson";
import osmtogeojson from "osmtogeojson";
import { GeoJSON } from "react-leaflet";
import cityOsm from "../city-osm.json";

export const CityBoundary = () => {
  const cityGeoJson = osmtogeojson(cityOsm) as FeatureCollection;

  return (
    <GeoJSON
      data={cityGeoJson.features[0]}
      style={{ fillOpacity: 0 }}
      attribution='<a href="http://osm.org/copyright">OpenStreetMap</a>'
    />
  );
};
