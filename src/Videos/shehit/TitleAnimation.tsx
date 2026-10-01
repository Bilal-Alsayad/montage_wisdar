import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from "remotion";
import {splitTitle} from "../../utils/textUtils";

export const TITLE_ANIMATION_DURATION = 151;

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

export default function TitleAnimation({
  text,
  fontFamily,
}: {
  text: string;
  fontFamily: string;
}) {
  const frame = useCurrentFrame();
  const {text1, text2} = splitTitle(text);

  return (
    <AbsoluteFill
      style={{
        opacity: interpolate(frame, [138, 149], [1, 0], {
          ...clamp,
          easing: Easing.bezier(0.54, 0, 0.46, 1),
        }),
      }}
    >
      <div
        style={{
          position: "absolute",
          top:
            1095 +
            interpolate(frame, [130, 150], [0, 97], {
              ...clamp,
              easing: Easing.bezier(1, 0, 0.715, 1),
            }),
          left: "50%",
          transform: "translateX(-50%)",
          display: "grid",
          fontFamily,
          fontSize: 79,
          color: "white",
          direction: "rtl",
        }}
      >
        <div
          style={{
            gridArea: "1 / 1",
            display: "grid",
            padding: "0 25px",
            visibility: "hidden",
          }}
        >
          <span style={{gridArea: "1 / 1", whiteSpace: "nowrap"}}>
            {text1}
          </span>
          <span style={{gridArea: "1 / 1", whiteSpace: "nowrap"}}>
            {text2}
          </span>
        </div>

        {text2 && (
          <div
            style={{
              gridArea: "1 / 1",
              height: 115,
              display: "grid",
              placeItems: "center",
              border: "5px solid #FF981B",
              borderRadius: "0 0 36px 36px",
              boxSizing: "border-box",
              opacity: frame < 51 ? 0 : 1,
              transform: `translateY(${interpolate(
                frame,
                [51, 88],
                [0, 90],
                {
                  ...clamp,
                  easing: Easing.bezier(0.498, 0, 0.19, 1),
                }
              )}px)`,
            }}
          >
            <span style={{transform: "translateY(-4px)"}}>{text2}</span>
          </div>
        )}

        <div
          style={{
            gridArea: "1 / 1",
            height: 110,
            display: "grid",
            placeItems: "center",
            backgroundColor: "#FF981B",
            borderRadius: "40px 12px 40px 12px",
            transform: `translateX(${interpolate(
              frame,
              [0, 51],
              [984, 0],
              {
                ...clamp,
                easing: Easing.bezier(0.406, 0.119, 0.103, 1),
              }
            )}px)`,
          }}
        >
          <span style={{transform: "translateY(-4px)"}}>{text1}</span>
        </div>
      </div>
    </AbsoluteFill>
  );
}