import { FeatureCollection } from "geojson";
import osmtogeojson from "osmtogeojson";
import { GeoJSON } from "react-leaflet";

type Props = {
  cityOsm: any;
};

export function CityBoundary({ cityOsm }: Props) {
  const cityGeoJSON = osmtogeojson(cityOsm) as FeatureCollection;
  const boundaryFeature = cityGeoJSON.features.find((feature) =>
    feature.id?.toString()?.startsWith("relation/")
  );

  if (!boundaryFeature) return null;

  return (
    <GeoJSON
      data={boundaryFeature}
      style={{ fillOpacity: 0 }}
      attribution='<a href="http://osm.org/copyright">OpenStreetMap</a>'
    />
  );
}
