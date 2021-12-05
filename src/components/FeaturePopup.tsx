import { Feature } from "geojson";

export function FeaturePopup({ feature }: { feature: Feature }) {
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
