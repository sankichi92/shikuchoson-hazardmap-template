import { LayersControl, TileLayer } from "react-leaflet";
import config from "../hazardmap-config.json";

export const HazardmapPortalTiles = () => {
  return (
    <>
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
      </LayersControl>
    </>
  );
};
