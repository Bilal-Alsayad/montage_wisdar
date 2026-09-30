import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from "remotion";
import {splitTitle} from "../../utils/textUtils";

export const TITLE_ANIMATION_DURATION = 151;

const CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

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
          ...CLAMP,
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
              ...CLAMP,
              easing: Easing.bezier(1, 0, 0.715, 1),
            }),
          left: "50%",
          transform: "translateX(-50%)",
          display: "grid",
          fontFamily,
          fontSize: 79,
          lineHeight: "95px",
          color: "white",
          textAlign: "center",
          direction: "rtl",
        }}
      >
        <div
          style={{
            gridArea: "1 / 1",
            height: 110,
            display: "grid",
            alignItems: "center",
            padding: "0 25px",
            visibility: "hidden",
          }}
        >
          <span style={{gridArea: "1 / 1", whiteSpace: "nowrap"}}>{text1}</span>
          <span style={{gridArea: "1 / 1", whiteSpace: "nowrap"}}>{text2}</span>
        </div>

        {text2 && (
          <div
            style={{
              gridArea: "1 / 1",
              zIndex: 1,
              height: 110,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "5px solid #FF981B",
              borderRadius: 36,
              boxSizing: "border-box",
              whiteSpace: "nowrap",
              opacity: frame < 51 ? 0 : 1,
              transform: `translateY(${interpolate(frame, [51, 88], [0, 84], {
                ...CLAMP,
                easing: Easing.bezier(0.498, 0, 0.19, 1),
              })}px)`,
            }}
          >
            <span style={{position: "relative", top: -4}}>{text2}</span>
          </div>
        )}

        <div
          style={{
            gridArea: "1 / 1",
            zIndex: 2,
            height: 110,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FF981B",
            borderRadius: "34px 12px 34px 12px",
            whiteSpace: "nowrap",
            transform: `translateX(${interpolate(frame, [0, 51], [984, 0], {
              ...CLAMP,
              easing: Easing.bezier(0.406, 0.119, 0.103, 1),
            })}px)`,
          }}
        >
          <span style={{position: "relative", top: -4}}>{text1}</span>
        </div>
      </div>
    </AbsoluteFill>
  );
}
