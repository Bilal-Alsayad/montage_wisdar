import { Lottie, type LottieAnimationData } from "@remotion/lottie";
import animationData from "../../../public/pal/speaker/data.json";

type SpeakerDecorationProps = {
  x?: number;
  y?: number;
  scale?: number;
};

type PalDecorationLayer = {
  nm?: string;
  ks?: {
    o?: { k?: unknown };
    p?: { k?: unknown };
  };
};

const PATCHED_OPACITY_LAYERS = new Set([
  "XF",
  "Text 3 Po 2",
  "Text 3 Po",
  "Text 2 Po",
  "Shapes Pos",
]);

export const removeExpressionStrings = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map(removeExpressionStrings);
  }

  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .filter(([key, nestedValue]) => {
          return !(key === "x" && typeof nestedValue === "string");
        })
        .map(([key, nestedValue]) => [
          key,
          removeExpressionStrings(nestedValue),
        ]),
    );
  }

  return value;
};

export const patchPalDecorationData = (
  data: LottieAnimationData,
  dimensions: Partial<Pick<LottieAnimationData, "w" | "h">> = {},
): LottieAnimationData => {
  const patched = removeExpressionStrings(data) as LottieAnimationData;

  Object.assign(patched, dimensions);

  const layers = patched.layers as PalDecorationLayer[] | undefined;

  layers?.forEach((layer) => {
    const opacity = layer.ks?.o;
    const position = layer.ks?.p;

    if (layer.nm && PATCHED_OPACITY_LAYERS.has(layer.nm) && opacity) {
      opacity.k = 100;
    }

    if ((layer.nm === "Text 3 Po 2" || layer.nm === "Text 3 Po") && position) {
      position.k = [0, 42, 0];
    }

    if (layer.nm === "Text 2 Po" && position) {
      position.k = [0, 45, 0];
    }

    if (layer.nm === "Shapes Pos" && position) {
      position.k = [540, 580, 0];
    }
  });

  return patched;
};

const patchedAnimationData = patchPalDecorationData(
  animationData as LottieAnimationData,
  { w: 1080, h: 1920 },
);

export default function SpeakerDecoration({
  x = 0,
  y = 0,
  scale = 1,
}: SpeakerDecorationProps) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 1080,
        height: 1920,
        overflow: "visible",
        pointerEvents: "none",
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }}
    >
      <Lottie
        animationData={patchedAnimationData}
        playbackRate={25 / 30}
        loop={false}
        renderer="svg"
        preserveAspectRatio="xMinYMin meet"
        style={{
          position: "absolute",
          inset: 0,
          width: 1080,
          height: 1920,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
