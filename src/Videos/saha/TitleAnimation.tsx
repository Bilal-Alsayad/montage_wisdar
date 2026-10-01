import {Easing, interpolate, useCurrentFrame} from "remotion";
import {splitTitle} from "../../utils/textUtils";

export const TITLE_ANIMATION_DURATION = 152;

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

const boxEase = Easing.bezier(0.5, 0, 0.5, 1);
const textEase = Easing.bezier(0.333, 0, 0.667, 1);

export default function TitleAnimation({
  text,
  fontFamily,
}: {
  text: string;
  fontFamily: string;
}) {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        top: 950,
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: 20,
        fontFamily,
        fontSize: 80,
      }}
    >
      <div
        style={{
          position: "relative",
          height: 100,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#C0856E",
            transform: `scaleX(${
              frame < 106
                ? interpolate(frame, [4, 49], [0, 1], {
                    ...clamp,
                    easing: boxEase,
                  })
                : interpolate(frame, [106, 151], [1, 0], {
                    ...clamp,
                    easing: boxEase,
                  })
            })`,
            transformOrigin: "left",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            height: "100%",
            color: "#FFFFFF",
            padding: "0 20px",
            whiteSpace: "nowrap",
            clipPath: `inset(0 ${
              (1 -
                (frame < 102
                  ? interpolate(frame, [8, 53], [0, 1], {
                      ...clamp,
                      easing: textEase,
                    })
                  : interpolate(frame, [102, 147], [1, 0], {
                      ...clamp,
                      easing: textEase,
                    }))) *
              100
            }% 0 0)`,
          }}
        >
          {splitTitle(text).text1}
        </div>
      </div>

      <div
        style={{
          position: "relative",
          height: 100,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#925842",
            transform: `scaleX(${
              frame < 102
                ? interpolate(frame, [0, 45], [0, 1], {
                    ...clamp,
                    easing: boxEase,
                  })
                : interpolate(frame, [102, 147], [1, 0], {
                    ...clamp,
                    easing: boxEase,
                  })
            })`,
            transformOrigin: "left",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            height: "100%",
            color: "#FFFFFF",
            padding: "0 20px",
            whiteSpace: "nowrap",
            clipPath: `inset(0 ${
              (1 -
                (frame < 98
                  ? interpolate(frame, [4, 49], [0, 1], {
                      ...clamp,
                      easing: textEase,
                    })
                  : interpolate(frame, [98, 143], [1, 0], {
                      ...clamp,
                      easing: textEase,
                    }))) *
              100
            }% 0 0)`,
          }}
        >
          {splitTitle(text).text2}
        </div>
      </div>
    </div>
  );
}
