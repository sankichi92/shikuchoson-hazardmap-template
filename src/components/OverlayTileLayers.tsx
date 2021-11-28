import { LayersControl, TileLayer } from "react-leaflet";

type Props = {
  tiles: {
    name: string;
    url: string;
    attribution: string;
    opacity?: number;
  }[];
};

export function OverlayTileLayers({ tiles }: Props) {
  return (
    <>
      {tiles.map((tile) => {
        return (
          <LayersControl.Overlay key={tile.name} name={tile.name}>
            <TileLayer
              url={tile.url}
              opacity={tile.opacity || 0.75}
              attribution={tile.attribution}
            />
          </LayersControl.Overlay>
        );
      })}
    </>
  );
}
