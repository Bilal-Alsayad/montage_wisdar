import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

export const HARMONY_SOURCE_ANIMATION_DURATION = 340;

const BODYMOVIN_LINE_HEIGHT = 78;

const FINAL_TEXT_COLOR = "#ffffff";
const FINAL_BACKGROUND_COLOR = "#962244";
const SOURCE_EXIT_SHIFT = 155;

type Keyframe = {
  t: number;
  s: number;
  o?: { x: number; y: number };
  i?: { x: number; y: number };
};

const containerWidthKeyframes: Keyframe[] = [
  { t: 4, s: 0, o: { x: 0.219, y: 0 } },
  { t: 27, s: 100, o: { x: 0.213, y: 0 }, i: { x: 0.843, y: 1 } },
  { t: 162, s: 100, o: { x: 0.788, y: 0 }, i: { x: 0.783, y: 1 } },
  { t: 185, s: 0 },
];

const textMoveKeyframes: Keyframe[] = [
  { t: 6, s: 0, o: { x: 0.095, y: 0 } },
  { t: 27, s: 100, o: { x: 0.366, y: 0 }, i: { x: 0.194, y: 1 } },
  { t: 162, s: 100, o: { x: 0.806, y: 0 }, i: { x: 0.825, y: 1 } },
  { t: 184, s: 0 },
];

interface SourceAnimationProps {
  source: string;
  fontFamily: string;
}

const toBodymovinFrame = (frame: number) => {
  if (frame <= 27) {
    return frame;
  }

  if (frame <= 317) {
    return 162;
  }

  return frame - SOURCE_EXIT_SHIFT;
};

const valueAtFrame = (frame: number, keyframes: Keyframe[]) => {
  if (frame <= keyframes[0].t) {
    return keyframes[0].s;
  }

  for (let i = 0; i < keyframes.length - 1; i += 1) {
    const current = keyframes[i];
    const next = keyframes[i + 1];

    if (frame <= next.t) {
      if (current.s === next.s) {
        return current.s;
      }

      const easing =
        current.o && next.i
          ? Easing.bezier(current.o.x, current.o.y, next.i.x, next.i.y)
          : Easing.linear;

      return interpolate(frame, [current.t, next.t], [current.s, next.s], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing,
      });
    }
  }

  return keyframes[keyframes.length - 1].s;
};

export default function SourceAnimation({ source, fontFamily }: SourceAnimationProps) {
  const frame = useCurrentFrame();
  const bodymovinFrame = toBodymovinFrame(frame);
  const widthProgress =
    valueAtFrame(bodymovinFrame, containerWidthKeyframes) / 100;
  const textProgress = valueAtFrame(bodymovinFrame, textMoveKeyframes) / 100;

  return (
    <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            margin: "0 auto",
            top: 1540,
            display: "flex",
            alignItems: "center",
            overflow: "hidden",

            width: "fit-content",
            minWidth: 0,
            height: 65,

            padding:25,

            backgroundColor: FINAL_BACKGROUND_COLOR,
            borderRadius: 0,
            boxSizing: "border-box",

            clipPath: `inset(
              0
              ${Math.max(0, (1 - widthProgress) * 100)}%
              0
              0
            )`,
          }}
        >
          <span
            style={{
              display: "block",
              flex: "0 0 auto",

              color: FINAL_TEXT_COLOR,
              fontFamily,
              fontSize: 55,
              fontStyle: "normal",
              fontWeight: 700,
              letterSpacing: 0,
              lineHeight: `${BODYMOVIN_LINE_HEIGHT}px`,
              whiteSpace: "nowrap",

              transform: `translateX(${(textProgress - 1) * 100}%)`,
            }}
          >
            {source}
          </span>
        </div>
    </AbsoluteFill>
  );
}
