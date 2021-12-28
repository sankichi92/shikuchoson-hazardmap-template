import { Feature, FeatureCollection } from "geojson";
import { Icon, Marker } from "leaflet";
import ReactDOMServer from "react-dom/server";
import { GeoJSON, LayersControl } from "react-leaflet";

type Props = {
  featureCollections: {
    [name: string]: FeatureCollection;
  };
};

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

function FeaturePopup({ feature }: { feature: Feature }) {
  return (
    <>
      <h2 className="h6 text-center">{feature.properties?.name}</h2>
      <ul className="list-unstyled">
        {feature.properties &&
          Object.entries(feature.properties)
            .filter(([key, _]) => key !== "name")
            .map(([key, val]) => (
              <li>
                <b>{key}</b>: {val}
              </li>
            ))}
      </ul>
    </>
  );
}

export function OverlayFeatureLayers({ featureCollections }: Props) {
  return (
    <>
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
    </>
  );
}
