import { useState } from "react";
import { LayersControl, TileLayer, useMapEvents } from "react-leaflet";
import config from "../hazardmap-config.json";

export const HazardmapPortalTiles = () => {
  const [legends, setLegends] = useState<{ [name: string]: string }>({});

  useMapEvents({
    overlayadd(e) {
      // @ts-ignore FIXME
      const legendImageUrl = e.layer.options["data-legend-image-url"];
      setLegends({ ...legends, [e.name]: legendImageUrl });
    },
    overlayremove(e) {
      const newLegends = { ...legends };
      delete newLegends[e.name];
      setLegends(newLegends);
    },
  });

  console.log(legends);

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
                data-legend-image-url={hazardmapPortalTile.legendImageUrl}
              />
            </LayersControl.Overlay>
          );
        })}
      </LayersControl>
      <div className="leaflet-bottom leaflet-left">
        {Object.entries(legends).map(([name, url]) => {
          return <img key={url} src={url} alt={name} />;
        })}
      </div>
    </>
  );
};
