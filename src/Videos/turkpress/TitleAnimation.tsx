import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { splitTitle } from "../../utils/textUtils";

interface TitleAnimationProps {
  text: string;
  fontFamily: string;
}

export const TITLE_ANIMATION_DURATION = 144;

const ease = Easing.bezier(0.33, 0, 0.2, 1);

export default function TitleAnimation({
  text,
  fontFamily,
}: TitleAnimationProps) {
  const frame = useCurrentFrame();
  const { text1, text2 } = splitTitle(text);

  if (!text1) {
    return null;
  }

  return (
    <AbsoluteFill>
      <div
        dir="rtl"
        lang="ar"
        style={{
          position: "absolute",
          top: 1050,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            width: "max-content",
            padding: "12px 24px",
            backgroundColor: "#f7941d",
            color: "#fff",
            fontFamily,
            fontSize: 61,
            lineHeight: "73.2px",
            whiteSpace: "nowrap",
            opacity: interpolate(frame, [112, 136], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: ease,
            }),
            transform: `translateY(${interpolate(
              frame,
              [0, 24],
              [133.36, 0],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: ease,
              },
            )}px)`,
          }}
        >
          {text1}
        </div>

        {text2 && (
          <div
            style={{
              width: "max-content",
              padding: "12px 24px",
              backgroundColor: "#f7941d",
              color: "#fff",
              fontFamily,
              fontSize: 61,
              lineHeight: "73.2px",
              whiteSpace: "nowrap",
              opacity: interpolate(frame, [116, 140], [1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: ease,
              }),
              transform: `translateY(${interpolate(
                frame,
                [4, 28],
                [133.36, 0],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: ease,
                },
              )}px)`,
            }}
          >
            {text2}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
}