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
            1105 +
            interpolate(frame, [130, 150], [0, 97], {
              ...CLAMP,
              easing: Easing.bezier(1, 0, 0.715, 1),
            }),
          left: "50%",
          transform: "translateX(-50%)",
          display: "inline-grid",
          fontFamily,
          fontSize: 79,
          lineHeight: "95px",
          color: "white",
          textAlign: "center",
          direction: "rtl",
        }}
      >
        {text2 && (
          <div
            style={{
              gridArea: "1 / 1",
              zIndex: 1,
              width: "100%",
              height: 110,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 25px",
              boxSizing: "border-box",
              border: "5px solid #FF981B",
              borderRadius: 36,
              whiteSpace: "nowrap",
              transform: `translateY(${interpolate(frame, [28, 88], [0, 88], {
                ...CLAMP,
                easing: Easing.bezier(0.498, 0, 0.19, 1),
              })}px)`,
              overflow: "hidden",
            }}
          >
            <span
              style={{
                opacity: interpolate(frame, [41, 108], [0, 1], {
                  ...CLAMP,
                  easing: Easing.bezier(0.19, 0, 0.104, 1),
                }),
                transform: `translateY(${interpolate(frame, [41, 108], [-28, 0], {
                  ...CLAMP,
                  easing: Easing.bezier(0.19, 0, 0.104, 1),
                })}px)`,
              }}
            >
              {text2}
            </span>
          </div>
        )}

        <div
          style={{
            gridArea: "1 / 1",
            zIndex: 2,
            width: "100%",
            height: 110,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 25px",
            boxSizing: "border-box",
            backgroundColor: "#FF981B",
            borderRadius: "34px 12px 34px 12px",
            whiteSpace: "nowrap",
            transform: `translateX(${interpolate(frame, [0, 51], [984, 0], {
              ...CLAMP,
              easing: Easing.bezier(0.406, 0.119, 0.103, 1),
            })}px)`,
            overflow: "hidden",
          }}
        >
          <span
            style={{
              opacity: interpolate(frame, [0, 67], [0, 1], {
                ...CLAMP,
                easing: Easing.bezier(0.19, 0, 0.104, 1),
              }),
              transform: `translateY(${interpolate(frame, [0, 67], [42, -3], {
                ...CLAMP,
                easing: Easing.bezier(0.19, 0, 0.104, 1),
              })}px)`,
            }}
          >
            {text1}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
}
