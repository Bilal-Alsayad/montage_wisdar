import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { splitTitle } from "../../utils/textUtils";
import { charEnter, EASE, reverseFrameOf } from "./animations";

export const TITLE_ANIMATION_DURATION = 160;

interface TitleAnimationProps {
  text: string;
  fontFamily: string;
}

export default function TitleAnimation({
  text,
  fontFamily,
}: TitleAnimationProps) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const { text1, text2 } = splitTitle(text);

  // Blue box
  const BLUE_BOX_OP_END    = Math.round(17 * 0.6);
  const BLUE_BOX_SLIDE_END = Math.round(20 * 0.6);
  const BLUE_SWEEP_START   = Math.round(1  * 0.6);
  const BLUE_SWEEP_END     = Math.round(40 * 0.6);

  // White box
  const WHITE_BOX_OP_START  = Math.round(16 * 0.6);
  const WHITE_BOX_OP_END    = Math.round(33 * 0.6);
  const WHITE_BOX_SLIDE_END = Math.round(36 * 0.6);
  const WHITE_SWEEP_START   = Math.round(16 * 0.6);
  const WHITE_SWEEP_END     = Math.round(55 * 0.6);

  // Enter duration
  const ENTER_DURATION = WHITE_SWEEP_END;

  const { reverseFrame, isExiting } = reverseFrameOf(frame, ENTER_DURATION, durationInFrames);
  const evalFrame = isExiting ? reverseFrame : frame;

  // Blue box
  const blueBoxOpacity = interpolate(evalFrame, [0, BLUE_BOX_OP_END], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE,
  });
  const blueBoxSlideY = interpolate(evalFrame, [0, BLUE_BOX_SLIDE_END], [8, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE,
  });

  // White box
  const whiteBoxOpacity = interpolate(
    evalFrame, [WHITE_BOX_OP_START, WHITE_BOX_OP_END], [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE }
  );
  const whiteBoxSlideY = interpolate(
    evalFrame, [WHITE_BOX_OP_START, WHITE_BOX_SLIDE_END], [8, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE }
  );

  const text1Chars = Array.from(text1);
  const text2Chars = Array.from(text2);

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 1220,
          left: 0,
          right: 0,
          margin: "0 auto",
          fontFamily,
          fontSize: "45px",
          direction: "ltr",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          width: "max-content",
        }}
      >
        {/*  Blue box  */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "105px",
            color: "#ffffff",
            backgroundColor: "#1b3f6d",
            padding: "0 25px",
            borderBottom: "6px solid #ff8400",
            borderTopRightRadius: "24px",
            opacity: blueBoxOpacity,
            transform: `translateY(${blueBoxSlideY}px)`,
          }}
        >
          <span style={{ display: "inline-flex", overflow: "hidden" }}>
            {text1Chars.map((char, i) => {
              const { opacity, translateX } = charEnter(evalFrame, i, text1Chars.length, BLUE_SWEEP_START, BLUE_SWEEP_END);
              return (
                <span key={i} style={{ display: "inline-block", opacity, transform: `translateX(${translateX}px)`, whiteSpace: "pre" }}>
                  {char}
                </span>
              );
            })}
          </span>
        </div>

        {/* White box */}
        <div
          style={{
            display: "flex",
            height: "105px",
            alignItems: "center",
            justifyContent: "center",
            color: "#1b3f6d",
            backgroundColor: "#ffffff",
            padding: "0 25px",
            borderBottomLeftRadius: "24px",
            opacity: whiteBoxOpacity,
            transform: `translateY(${whiteBoxSlideY}px)`,
          }}
        >
          <span style={{ display: "inline-flex", overflow: "hidden" }}>
            {text2Chars.map((char, i) => {
              const { opacity, translateX } = charEnter(evalFrame, i, text2Chars.length, WHITE_SWEEP_START, WHITE_SWEEP_END);
              return (
                <span key={i} style={{ display: "inline-block", opacity, transform: `translateX(${translateX}px)`, whiteSpace: "pre" }}>
                  {char}
                </span>
              );
            })}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
}
