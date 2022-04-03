import { useEffect, useState } from "react";
import { Button, Card, Collapse } from "react-bootstrap";

type Props = {
  imageNames: string[];
  collapsed: boolean;
};

export const BottomLeftImages = ({ imageNames, collapsed }: Props) => {
  const [images, setImages] = useState<{ title: string; src: string }[]>([]);
  const [open, setOpen] = useState(!collapsed);

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
        <Button
          variant="light"
          onClick={() => setOpen(!open)}
          aria-controls="collapse-images"
          aria-expanded={open}
          className="mb-1"
        >
          {open ? "説明を隠す" : "説明を表示"}
        </Button>
        <Collapse in={open}>
          <div id="collapse-images">
            <div className="d-flex align-items-start flex-wrap">
              {images.map(({ title, src }) => (
                <Card
                  key={title}
                  className="shadow opacity-75 me-1 mb-1"
                  style={{ width: "12rem" }}
                >
                  <Card.Header as="h6" className="text-center">
                    {title}
                  </Card.Header>
                  <Card.Img variant="bottom" src={src} />
                </Card>
              ))}
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
};
