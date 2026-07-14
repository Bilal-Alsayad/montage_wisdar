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

export const TITLE_ANIMATION_DURATION = 148;

const CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export default function TitleAnimation({
  text,
  fontFamily,
}: TitleAnimationProps) {
  const frame = useCurrentFrame();

  const { text1, text2 } = splitTitle(text);

  const firstLineProgress = interpolate(
    frame,
    [12, 37],
    [0, 1],
    {
      ...CLAMP,
      easing: Easing.bezier(0.556, 0, 0.175, 1),
    },
  );

  const secondLineProgress = interpolate(
    frame,
    [20, 45],
    [0, 1],
    {
      ...CLAMP,
      easing: Easing.bezier(0.556, 0, 0.175, 1),
    },
  );

  const fadeOut = interpolate(
    frame,
    [128, 148],
    [1, 0],
    {
      ...CLAMP,
      easing: Easing.bezier(0.42, 0, 1, 1),
    },
  );

  return (
    <>
      {text1 && (
        <div
          style={{
            position: "absolute",
            top: 1332.48,
            left: 545.9,
            transform: `translateX(-50%) translateY(${interpolate(
              firstLineProgress,
              [0, 1],
              [-49, 0],
            )}px)`,
            opacity: firstLineProgress * fadeOut,
            color: "#FFFFFF",
            fontFamily,
            fontSize: 100,
            lineHeight: "120px",
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          {text1}
        </div>
      )}

      {text2 && (
        <div
          style={{
            position: "absolute",
            top: 1433.68,
            left: 545.9,
            transform: `translateX(-50%) translateY(${interpolate(
              secondLineProgress,
              [0, 1],
              [-49, 0],
            )}px)`,
            opacity: secondLineProgress * fadeOut,
            color: "#FFFFFF",
            fontFamily,
            fontSize: 100,
            lineHeight: "120px",
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          {text2}
        </div>
      )}
    </>
  );
}