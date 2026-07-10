import React from "react";
import { Img } from "remotion";

interface CroppedImageProps {
  src: string;
  crop?: {
    topLeft: { x: number; y: number };
    bottomRight: { x: number; y: number };
  };
  style?: React.CSSProperties;
}

export const CroppedImage: React.FC<CroppedImageProps> = ({
  src,
  crop,
  style = {},
}) => {
  const isCropEmpty =
    !crop ||
    crop.bottomRight.x - crop.topLeft.x <= 0 ||
    crop.bottomRight.y - crop.topLeft.y <= 0;

  if (isCropEmpty) {
    return (
      <Img
        src={src}
        style={{
          ...style,
          objectFit: "cover",
          objectPosition: "center center",
        }}
      />
    );
  }

  const cropW = crop.bottomRight.x - crop.topLeft.x;
  const cropH = crop.bottomRight.y - crop.topLeft.y;

  const maxDim = Math.max(cropW, cropH);

  const centerX = crop.topLeft.x + cropW / 2;
  const centerY = crop.topLeft.y + cropH / 2;

  const squareX = centerX - maxDim / 2;
  const squareY = centerY - maxDim / 2;

  return (
    <div
      style={{
        ...style,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center center",
          objectViewBox: `xywh(${squareX}px ${squareY}px ${maxDim}px ${maxDim}px)`,
        }}
      />
    </div>
  );
};
