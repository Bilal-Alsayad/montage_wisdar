import {
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { splitTitle } from "../../utils/textUtils";

interface TitleAnimationProps {
  text: string;
  fontFamily: string;
}

interface TitleLineProps {
  text: string;
  fontFamily: string;
  color: string;
  backgroundColor: string;
  top: number;
  skew: number;
  scale: number;
}

const CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const getScale = (
  frame: number,
  enterStart: number,
  enterEnd: number,
  exitStart: number,
  exitEnd: number,
) =>
  frame < exitStart
    ? interpolate(frame, [enterStart, enterEnd], [0, 1], {
        ...CLAMP,
        easing: Easing.bezier(0.333, 0, 0, 1),
      })
    : interpolate(frame, [exitStart, exitEnd], [1, 0], {
        ...CLAMP,
        easing: Easing.bezier(0.662, 0, 0.289, 1),
      });

function TitleLine({
  text,
  fontFamily,
  color,
  backgroundColor,
  top,
  skew,
  scale,
}: TitleLineProps) {
  if (!text) {
    return null;
  }

  const skewOffset =
    Math.tan((skew * Math.PI) / 180) * 55 * scale;

  const collapsedOffset = (1 - scale) * 413.655;
  const left = (1 - scale) * 50;
  const right = (1 + scale) * 50;

  const clipPath = `polygon(
    calc(${left}% + ${collapsedOffset - skewOffset}px) 0%,
    calc(${right}% + ${collapsedOffset - skewOffset}px) 0%,
    calc(${right}% + ${collapsedOffset + skewOffset}px) 100%,
    calc(${left}% + ${collapsedOffset + skewOffset}px) 100%
  )`;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top,
        width: "max-content",
        height: 110,
        padding: "0 37.5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: "translateX(-50%)",
        clipPath,
        color,
        fontFamily,
        fontSize: 55,
        direction: "rtl",
        unicodeBidi: "plaintext",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -30,
          backgroundColor,
        }}
      />

      <span style={{ position: "relative" }}>
        {text}
      </span>
    </div>
  );
}

export default function TitleAnimation({
  text,
  fontFamily,
}: TitleAnimationProps) {
  const frame = useCurrentFrame();
  const { text1, text2 } = splitTitle(text);

  const firstLineScale = getScale(
    frame,
    0,
    49.95,
    112.038,
    147.0025,
  );

  const secondLineScale = getScale(
    frame,
    2.997,
    52.947,
    115.035,
    149,
  );

  return (
    <>
      <TitleLine
        text={text1}
        fontFamily={fontFamily}
        color="#000000"
        backgroundColor="#BFBFBF"
        top={1228.648}
        skew={20}
        scale={firstLineScale}
      />

      <TitleLine
        text={text2}
        fontFamily={fontFamily}
        color="#FFFFFF"
        backgroundColor="#D29218"
        top={1348.648}
        skew={15}
        scale={secondLineScale}
      />
    </>
  );
}