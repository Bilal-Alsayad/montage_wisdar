import { Lottie, LottieAnimationData } from "@remotion/lottie";
import { useEffect, useState } from "react";
import {
  cancelRender,
  continueRender,
  delayRender,
  Easing,
  interpolate,
  staticFile,
  Img,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const LOGO_BAR_HEIGHT = 1387;
const LOGO_BAR_TOP = 533;
const LOGO_BAR_ENTER_DURATION = 30;
const LOGO_BAR_EXIT_DURATION = 82.8 - 48;

const LOGO = {
  position: {
    left: 900,
    top: 495,
  },
  source: {
    width: 1920,
    height: 1080,
  },
  crop: {
    left: 710,
    top: 370,
    width: 570,
    height: 240,
  },
  scale: 0.25,
} as const;

type LogoAnimationProps = {
  privateSource?: boolean;
};

const lottieInterpolate = (
  frame: number,
  inputRange: [number, number],
  outputRange: [number, number],
  easing: (input: number) => number,
) =>
  interpolate(frame, inputRange, outputRange, {
    ...CLAMP,
    easing,
  });

function LogoBar() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const exitStart = LOGO_BAR_ENTER_DURATION + fps;

  const enterProgress = lottieInterpolate(
    frame,
    [9.6, LOGO_BAR_ENTER_DURATION],
    [0, 1],
    Easing.bezier(0.218, 0.651, 0.559, 1),
  );

  const exitProgress = lottieInterpolate(
    frame,
    [exitStart, exitStart + LOGO_BAR_EXIT_DURATION],
    [0, 1],
    Easing.bezier(0.074, 0.276, 0.216, 1),
  );

  const height =
    frame >= exitStart
      ? LOGO_BAR_HEIGHT * (1 - exitProgress)
      : LOGO_BAR_HEIGHT * enterProgress;

  return (
    <div
      style={{
        position: "absolute",
        right: 20,
        top:
          frame >= exitStart
            ? LOGO_BAR_TOP
            : LOGO_BAR_TOP + LOGO_BAR_HEIGHT - height,
        width: 8,
        height: Math.max(0, height),
        backgroundColor: "#ffffff",
      }}
    />
  );
}

function ExactLogoAnimation() {
  const [renderHandle] = useState(() =>
    delayRender("Loading MEE logo animation"),
  );

  const [animationData, setAnimationData] =
    useState<LottieAnimationData | null>(null);

  useEffect(() => {
    fetch(staticFile("mee/animations/logo.json"))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Logo JSON yüklenemedi: ${response.status}`);
        }

        return response.json() as Promise<LottieAnimationData>;
      })
      .then((json) => {
        setAnimationData(json);
        continueRender(renderHandle);
      })
      .catch((error) => {
        cancelRender(error);
      });
  }, [renderHandle]);

  if (!animationData) {
    return null;
  }

  return (
    <Lottie
      animationData={animationData}
      loop={false}
      playbackRate={1}
      renderer="svg"
      preserveAspectRatio="xMidYMid meet"
      style={{
        position: "absolute",
        left: LOGO.position.left - LOGO.crop.left * LOGO.scale,
        top: LOGO.position.top - LOGO.crop.top * LOGO.scale,
        width: LOGO.source.width * LOGO.scale,
        height: LOGO.source.height * LOGO.scale,
        clipPath: `inset(${LOGO.crop.top * LOGO.scale}px ${
          (LOGO.source.width - LOGO.crop.left - LOGO.crop.width) * LOGO.scale
        }px ${
          (LOGO.source.height - LOGO.crop.top - LOGO.crop.height) * LOGO.scale
        }px ${LOGO.crop.left * LOGO.scale}px)`,
        filter: "brightness(0) invert(1)",
      }}
    />
  );
}

export default function LogoAnimation({ privateSource }: LogoAnimationProps) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: 1080,
        height: 1920,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <LogoBar />

      <ExactLogoAnimation />

      {privateSource && (
        <Img
          src={staticFile("mee/images/logo.png")}
          style={{
            position: "absolute",
            left: 900,
            top: 555,
          }}
        />
      )}
    </div>
  );
}