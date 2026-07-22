import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {splitTitle} from "../../utils/textUtils";

interface TitleAnimationProps {
  text: string;
  fontFamily: string;
}

export const TITLE_ANIMATION_DURATION = 300;

export function TitleAnimation({
  text,
  fontFamily,
}: TitleAnimationProps) {
  const frame = useCurrentFrame();
  const {text1, text2} = splitTitle(text);

  const clamp = {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  } as const;

  return (
    <AbsoluteFill>
      {text1 && (
        <div
          dir="rtl"
          lang="ar"
          style={{
            position: "absolute",
            top: 1289,
            right: 135,
            height: 110,
            padding: "0 37.5px",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#E9B239",
            color: "#ffffff",
            fontFamily,
            fontSize: 60,
            whiteSpace: "nowrap",
            clipPath: `inset(0 0 0 ${
              100 -
              (frame < 262
                ? interpolate(frame, [0, 50], [0, 100], {
                    ...clamp,
                    easing: Easing.bezier(0.333, 0, 0, 1),
                  })
                : interpolate(frame, [262, 297], [100, 0], {
                    ...clamp,
                    easing: Easing.bezier(0.662, 0, 0.289, 1),
                  }))
            }%)`,
          }}
        >
          {text1}
        </div>
      )}

      {text2 && (
        <div
          dir="rtl"
          lang="ar"
          style={{
            position: "absolute",
            top: 1409,
            right: 135,
            height: 110,
            padding: "0 37.5px",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#ffffff",
            color: "#000000",
            fontFamily,
            fontSize: 60,
            whiteSpace: "nowrap",
            clipPath: `inset(0 0 0 ${
              100 -
              (frame < 265
                ? interpolate(frame, [3, 53], [0, 100], {
                    ...clamp,
                    easing: Easing.bezier(0.333, 0, 0, 1),
                  })
                : interpolate(frame, [265, 300], [100, 0], {
                    ...clamp,
                    easing: Easing.bezier(0.662, 0, 0.289, 1),
                  }))
            }%)`,
          }}
        >
          {text2}
        </div>
      )}

      {text1 && (
        <div
          style={{
            position: "absolute",
            top: 1235,
            left: 961,
            width: 45,
            height: 45,
            backgroundColor: "#ffffff",
            opacity:
              frame < 21
                ? Math.sin((frame * Math.PI) / 3) ** 2 * 0.25
                : frame < 24
                  ? interpolate(frame, [21, 24], [0, 1], clamp)
                  : frame < 265
                    ? 1
                    : frame < 286
                      ? Math.cos(((frame - 265) * Math.PI) / 6) ** 2
                      : 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 3,
              right: 3,
              width: 20,
              height: 20,
              backgroundColor: "#E9B239",
            }}
          />
        </div>
      )}

      <Img
        src={staticFile("jomark/images/logo.png")}
        style={{
          position: "absolute",
          top: -30,
          left: -38,
          width: 1080,
          height: 1920,
          opacity:
            frame < 28
              ? 0
              : interpolate(frame, [28, 48], [0.08, 1], {
                  ...clamp,
                  easing: Easing.bezier(0.333, 0, 0.667, 1),
                }),
        }}
      />

      <Img
        src={staticFile("jomark/images/tags.png")}
        style={{
          position: "absolute",
          top: 752,
          left: 0,
          width: 1080,
          height: 1080,
          opacity:
            frame < 20
              ? 0
              : interpolate(frame, [20, 40], [0.08, 1], {
                  ...clamp,
                  easing: Easing.bezier(0.333, 0, 0.667, 1),
                }),
        }}
      />
    </AbsoluteFill>
  );
}