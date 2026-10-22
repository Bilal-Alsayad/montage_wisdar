import { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Easing,
  Sequence,
  continueRender,
  delayRender,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { parseSrt, type Caption } from "@remotion/captions";
import { f } from "../../utils/constants";

// All frame numbers below are written for 30fps. f() converts them to the video fps.
const LOTTIE_EASE = Easing.bezier(0.12, 0, 0.12, 1); // easing taken from the Lottie file

const CLAMP = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

// Center of the subtitle box on the 1080x1920 canvas
const CENTER_X = 540;
const CENTER_Y = 1362;

// One subtitle: a dark box that pops in, with a short red line under it.
// It plays once per SRT cue, so the Sequence around it gives it its own timeline.
function SubtitleBox({
  text,
  fontFamily,
}: {
  text: string;
  fontFamily: string;
}) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Pops in from 86%, overshoots to 103%, settles at 100% (frames 0 -> 3.6 -> 6)
  const scale = interpolate(frame, [0, f(3.6), f(6)], [0.86, 1.03, 1], {
    ...CLAMP,
    easing: LOTTIE_EASE,
  });

  // Fades in over 2.4 frames, fades out over the last 3.6 frames of the cue
  const opacity = Math.min(
    interpolate(frame, [0, f(2.4)], [0, 1], CLAMP),
    interpolate(frame, [durationInFrames - f(4.8), durationInFrames - f(1.2)], [1, 0], CLAMP),
  );

  return (
    <div
      style={{
        position: "absolute",
        left: CENTER_X,
        top: CENTER_Y,
        maxWidth: 900,
        opacity,
        // Centers the box on the point above, then scales it around its own center
        transform: `translate(-50%, -50%) scale(${scale})`,
      }}
    >
      {/* Dark box: 68px high for one line, 22px padding on each side */}
      <div
        dir="rtl"
        style={{
          minHeight: 68,
          padding: "10px 22px",
          boxSizing: "border-box",
          fontFamily,
          fontSize: 40,
          lineHeight: "48px",
          textAlign: "center",
          color: "#F4F4F2",
          unicodeBidi: "plaintext",
          backgroundColor: "rgba(13, 16, 19, 0.92)",
          // Cuts the top-left and bottom-right corners (8px)
          clipPath:
            "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
        }}
      >
        {text}
      </div>

      {/* Red line under the box: about 58% of the box width, centered */}
      <div
        style={{
          position: "absolute",
          top: "100%",
          left: "50%",
          width: "58.14%",
          height: 4.65,
          marginTop: 10,
          transform: "translateX(-50%)",
          backgroundColor: "#E31B23",
        }}
      />
    </div>
  );
}

export default function SubtitleAnimation({
  src,
  fontFamily,
}: {
  src: string;
  fontFamily: string;
}) {
  const { fps } = useVideoConfig();
  const [captions, setCaptions] = useState<Caption[] | null>(null);
  const [handle] = useState(() => delayRender("Loading subtitles"));

  // Load and parse the SRT file
  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch(src);
        const { captions } = parseSrt({ input: await response.text() });
        setCaptions(captions);
      } catch (e) {
        console.error("Failed to load subtitles:", e);
      }
      continueRender(handle);
    };

    load();
  }, [handle, src]);

  if (!captions) return null;

  return (
    <AbsoluteFill>
      {captions.map((caption, index) => {
        const text = caption.text.trim();
        if (!text || text === ".") return null;

        const from = Math.round((caption.startMs / 1000) * fps);
        const to = Math.round((caption.endMs / 1000) * fps);

        return (
          <Sequence key={index} from={from} durationInFrames={Math.max(1, to - from)}>
            <SubtitleBox text={text} fontFamily={fontFamily} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
}
