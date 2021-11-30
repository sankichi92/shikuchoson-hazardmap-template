import { useEffect, useState } from "react";

type Props = {
  imageNames: string[];
};

export function BottomLeftImages({ imageNames }: Props) {
  const [images, setImages] = useState<{ title: string; src: string }[]>([]);

  useEffect(() => {
    (async () => {
      const importedImages = await Promise.all(
        imageNames.map(async (imageName) => {
          const title = imageName.replace(/\.[^.]+$/, "");
          const image = await import(`../images/${imageName}`);
          return { title: title, src: image.default };
        })
      );
      setImages(importedImages);
    })();
  }, [imageNames]);

  return (
    <div className="leaflet-bottom leaflet-left">
      <div className="leaflet-control">
        {images.map(({ title, src }) => (
          <img key={title} src={src} alt={title} />
        ))}
      </div>
    </div>
  );
}
