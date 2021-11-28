import ReactDOMServer from "react-dom/server";
import { Feature, FeatureCollection } from "geojson";
import { GeoJSON, LayersControl } from "react-leaflet";
import styles from "./OverlayFeatureLayers.module.css";

type Props = {
  featureCollections: {
    [name: string]: FeatureCollection;
  };
};

export function OverlayFeatureLayers({ featureCollections }: Props) {
  const FeaturePopup = ({ feature }: { feature: Feature }) => {
    return (
      <>
        <h3 className={styles.featurePopupTitle}>{feature.properties?.name}</h3>
        <ul className={styles.featurePopupProperties}>
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
  };

  return (
    <>
      {Object.entries(featureCollections).map(([name, featureCollection]) => {
        return (
          <LayersControl.Overlay key={name} name={name}>
            <GeoJSON
              data={featureCollection}
              onEachFeature={(feature, layer) => {
                // https://stackoverflow.com/a/60686195
                layer.bindPopup(
                  ReactDOMServer.renderToString(
                    <FeaturePopup feature={feature} />
                  )
                );
              }}
            />
          </LayersControl.Overlay>
        );
      })}
    </>
  );
}
