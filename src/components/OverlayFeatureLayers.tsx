import { FeatureCollection } from "geojson";
import { LayersControl, GeoJSON } from "react-leaflet";

type Props = {
  featureCollections: {
    [name: string]: FeatureCollection;
  };
};

export function OverlayFeatureLayers({ featureCollections }: Props) {
  return (
    <>
      {Object.entries(featureCollections).map(([name, featureCollection]) => {
        return (
          <LayersControl.Overlay key={name} name={name}>
            <GeoJSON
              data={featureCollection}
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
    </>
  );
}
