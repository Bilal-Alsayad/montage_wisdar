import type { CSSProperties } from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

export const HARMONY_SPEAKER_ANIMATION_DURATION = 180;

const TEXT_SELECTOR_EASE = Easing.bezier(0.167, 0.167, 0.833, 0.833);

const NAME_LAYER = {
  fontSize: 116,
  lineHeight: 116,
  scaleX: 1,
  scaleY: 1.04,
  color: "#ffffff",
  ip: 0,
  selector: [
    { frame: 0, value: 0 },
    { frame: 30, value: 100 },
    { frame: 135, value: 100 },
    { frame: 165, value: 0 },
  ],
};

const DESCRIPTION_LAYER = {
  fontSize: 60,
  lineHeight: 60,
  scaleX: 0.95,
  scaleY: 1.12,
  color: "#9dfbed",
  ip: 10,
  selector: [
    { frame: 10, value: 0 },
    { frame: 50, value: 100 },
    { frame: 144, value: 100 },
    { frame: 180, value: 0 },
  ],
};

type SelectorKeyframe = {
  frame: number;
  value: number;
};

type TextLayerConfig = typeof NAME_LAYER;

interface SpeakerAnimationProps {
  name: string;
  description: string;
  fontFamily: string;
}

const selectorValueAtFrame = (frame: number, keyframes: SelectorKeyframe[]) => {
  if (frame <= keyframes[0].frame) {
    return keyframes[0].value;
  }

  for (let i = 0; i < keyframes.length - 1; i += 1) {
    const current = keyframes[i];
    const next = keyframes[i + 1];

    if (frame <= next.frame) {
      if (current.value === next.value) {
        return current.value;
      }

      return interpolate(
        frame,
        [current.frame, next.frame],
        [current.value, next.value],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: TEXT_SELECTOR_EASE,
        },
      );
    }
  }

  return keyframes[keyframes.length - 1].value;
};

const characterOpacity = (
  selectorStart: number,
  index: number,
  totalCharacters: number,
) => {
  if (totalCharacters === 0) {
    return 0;
  }

  const charStart = (index / totalCharacters) * 100;
  const charEnd = ((index + 1) / totalCharacters) * 100;

  return interpolate(selectorStart, [charStart, charEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: TEXT_SELECTOR_EASE,
  });
};

const AnimatedTextLayer = ({
  text,
  layer,
  frame,
  fontFamily,
}: {
  text: string;
  layer: TextLayerConfig;
  frame: number;
  fontFamily: string;
}) => {
  if (frame < layer.ip || text.length === 0) {
    return null;
  }

  const selectorStart = selectorValueAtFrame(frame, layer.selector);
  const characters = Array.from(text);

  return (
    <div
    >
      <div
        style={{
          display: "inline-flex",
          color: layer.color,
          fontFamily,
          fontSize: layer.fontSize,
          lineHeight: `${layer.lineHeight}px`,
          fontWeight: 400,
          fontStyle: "normal",
          letterSpacing: 0,
          scale: `${layer.scaleX} ${layer.scaleY}`,
          textAlign: "left",
          transformOrigin: "0 0",
          whiteSpace: "nowrap",//heloo
        }}
      >
        {characters.map((character, index) => (
          <span
            key={`${character}-${index}`}
            style={{
              display: "inline-block",
              opacity: characterOpacity(
                selectorStart,
                index,
                characters.length,
              ),
            }}
          >
            {character}
          </span>
        ))}
      </div>
    </div>
  );
};

export default function SpeakerAnimation({
  fontFamily,
  name,
  description,
}: SpeakerAnimationProps) {
  const frame = useCurrentFrame();

  const stageStyle: CSSProperties = {
    position: "absolute",
    left: 170,
    top: 950,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 10,
  };

  return (
    <AbsoluteFill>
      <div style={stageStyle}>
        <AnimatedTextLayer
          text={name}
          layer={NAME_LAYER}
          frame={frame}
          fontFamily={fontFamily}
        />
        <AnimatedTextLayer
          text={description}
          layer={DESCRIPTION_LAYER}
          frame={frame}
          fontFamily={fontFamily}
        />
      </div>
    </AbsoluteFill>
  );
}
