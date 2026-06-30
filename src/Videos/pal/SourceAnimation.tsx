import {
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

type SourceAnimationProps = {
  text: string;
  fontFamily?: string;
};

const SOURCE_WIDTH = 258;
const SOURCE_HEIGHT = 48;
const SOURCE_ICON_WIDTH = 50;
const SOURCE_TEXT_LEFT = 70;
const SOURCE_TEXT_WIDTH = 170;
const SOURCE_RED_BACKGROUND =
  "linear-gradient(90deg, rgba(178, 54, 54, 1) 0%, rgba(255, 0, 0, 1) 50%)";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export default function SourceAnimation({
  text,
  fontFamily = "Rubik",
}: SourceAnimationProps) {
  const frame = useCurrentFrame();

  const redWidth = interpolate(frame, [0, 24], [0, SOURCE_WIDTH], {
    easing: Easing.out(Easing.cubic),
    ...clamp,
  });

  const redExitScale = interpolate(frame, [179, 189], [1, 0], {
    easing: Easing.in(Easing.cubic),
    ...clamp,
  });

  const whiteWidth =
    frame < 172
      ? interpolate(frame, [9, 17], [0, SOURCE_WIDTH], {
          easing: Easing.out(Easing.cubic),
          ...clamp,
        })
      : interpolate(frame, [172, 181], [SOURCE_WIDTH, 0], {
          easing: Easing.in(Easing.cubic),
          ...clamp,
        });

  const iconInOpacity = interpolate(frame, [7, 15], [0, 1], {
    easing: Easing.out(Easing.cubic),
    ...clamp,
  });
  const iconOutOpacity = interpolate(frame, [170, 178], [1, 0], {
    easing: Easing.in(Easing.cubic),
    ...clamp,
  });
  const iconOpacity = Math.min(iconInOpacity, iconOutOpacity);

  const iconTranslateX =
    frame < 170
      ? interpolate(frame, [7, 15], [-SOURCE_ICON_WIDTH, 0], {
          easing: Easing.out(Easing.cubic),
          ...clamp,
        })
      : interpolate(frame, [170, 178], [0, -SOURCE_ICON_WIDTH], {
          easing: Easing.in(Easing.cubic),
          ...clamp,
        });

  const textIn = interpolate(frame, [14, 24], [0, 1], {
    easing: Easing.out(Easing.cubic),
    ...clamp,
  });
  const textOut = interpolate(frame, [168, 176], [1, 0], {
    easing: Easing.in(Easing.cubic),
    ...clamp,
  });
  const textProgress = Math.min(textIn, textOut);

  return (
    <div
      style={{
        position: "absolute",
        left: 770,
        top: 283,
        width: SOURCE_WIDTH,
        height: SOURCE_HEIGHT,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: redWidth,
          height: SOURCE_HEIGHT,
          background: SOURCE_RED_BACKGROUND,
          transform: `scaleX(${redExitScale})`,
          transformOrigin: "center center",
          overflow: "hidden",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: whiteWidth,
          height: SOURCE_HEIGHT,
          overflow: "hidden",
          backgroundColor: "#f7f7f7",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: Math.min(redWidth, SOURCE_ICON_WIDTH),
          height: SOURCE_HEIGHT,
          background: SOURCE_RED_BACKGROUND,
          transform: `scaleX(${redExitScale})`,
          transformOrigin: "center center",
          overflow: "hidden",
          zIndex: 2,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: SOURCE_ICON_WIDTH,
          height: SOURCE_HEIGHT,
          overflow: "hidden",
          zIndex: 3,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: SOURCE_ICON_WIDTH,
            height: SOURCE_HEIGHT,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: iconOpacity,
            transform: `translateX(${iconTranslateX}px)`,
            willChange: "transform, opacity",
          }}
        >
          <Img
            src={staticFile("pal/icons/source.png")}
            style={{
              width: 40,
              height: 40,
              objectFit: "contain",
              filter: "brightness(0) invert(1)",
            }}
          />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: SOURCE_TEXT_LEFT,
          top: 0,
          width: SOURCE_TEXT_WIDTH,
          height: SOURCE_HEIGHT,
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          clipPath: `inset(0 ${100 - textProgress * 100}% 0 0)`,
          opacity: textProgress,
          zIndex: 4,
          color: "#111111",
          fontFamily,
          fontSize: 38,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </div>
    </div>
  );
}
