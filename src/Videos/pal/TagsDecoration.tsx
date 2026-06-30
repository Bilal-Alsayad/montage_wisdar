import { Lottie, type LottieAnimationData } from "@remotion/lottie";
import animationData from "../../../public/pal/tags/data.json";
import { patchPalDecorationData } from "./SpeakerDecoration";

type TagsDecorationProps = {
  x?: number;
  y?: number;
  scale?: number;
};

const patchedAnimationData = patchPalDecorationData(
  animationData as LottieAnimationData,
  { h: 1920 },
);

export default function TagsDecoration({
  x = 0,
  y = 0,
  scale = 1,
}: TagsDecorationProps) {
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
        opacity: 1,
        zIndex: 1,
        transform: `scale(${scale})`,
        transformOrigin: "left top",
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
