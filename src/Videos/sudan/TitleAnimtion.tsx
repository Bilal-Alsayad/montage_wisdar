import {
  AbsoluteFill,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Audio } from "@remotion/media";
import { splitTitle } from "../../utils/textUtils";

interface TitleAnimationProps {
  text: string;
  fontFamily: string;
}

// Lottie fps: 25 → Remotion fps: 30 → scale factor: 1.2
// Enter: Lottie selector scale t=0→25 = frames 0→30 Remotion
// Easing: o:{x:1,y:0}, i:{x:0.492,y:1}
const ENTER_EASE = Easing.bezier(1, 0, 0.492, 1);

// Exit: Lottie Linear Wipe t=200→215, Feather=335
// = frames 240→258 Remotion, Easing: o:{x:0.333,y:0}, i:{x:0.667,y:1}
const EXIT_EASE = Easing.bezier(0.333, 0, 0.667, 1);

const ENTER_DURATION = 30; // frames (25 Lottie × 1.2)
const BOX2_DELAY = 12; // Lottie: comp_0 st:11 - comp_1 st:1 = 10 frames × 1.2
const EXIT_START = 240; // frame (200 Lottie × 1.2)
const EXIT_END = 258; // frame (215 Lottie × 1.2)

export const TITLE_ANIMATION_DURATION = EXIT_END;

const BOX_HEIGHT = 112;
const MAX_BOX_WIDTH = 1500; // wider than any expected title on 1920 canvas

// Square moment: matches the 0.45 in useBoxDimensions
const SQUARE_FRAMES = Math.round(ENTER_DURATION * 0.45); // ≈13 frames

// Per-character scale config
const CHAR_SCALE_FRAMES = 1; // frame 0 = 50% size, frame 1 = 100% size (exactly 2 frames)

// Per-character reveal with font-size animation:
// Characters appear one-by-one sequentially (1 char per frame).
// Each char is an inline <span> (preserves Arabic shaping/connections).
// font-size animates from 50%→100% per character to simulate scale.
function AnimatedText({
  text,
  frame,
  startFrame,
}: {
  text: string;
  frame: number;
  startFrame: number;
}) {
  // Unicode-safe split to handle Arabic correctly
  const chars = [...text];
  const N = chars.length;
  if (N === 0) return null;

  // Text starts AFTER the square moment (when box height is fully open)
  const textStart = startFrame + SQUARE_FRAMES;

  // Sequential: exactly 1 character per frame
  const elapsed = frame - textStart;
  const visibleCount = Math.min(
    N,
    Math.max(0, elapsed >= 0 ? Math.floor(elapsed) + 1 : 0),
  );

  if (visibleCount === 0) {
    return (
      <span style={{ display: "block", whiteSpace: "nowrap" }}>{"\u200B"}</span>
    );
  }

  return (
    <span
      style={{
        direction: "rtl",
        display: "block",
        textAlign: "center",
        whiteSpace: "nowrap",
      }}
    >
      {chars.slice(0, visibleCount).map((char, i) => {
        // Frame when this character first appears
        const charFrame = textStart + i;
        const sizeScale = interpolate(
          frame,
          [charFrame, charFrame + CHAR_SCALE_FRAMES],
          [0.5, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        return (
          <span
            key={i}
            style={{
              // inline (default) keeps Arabic shaping connected
              fontSize: `${sizeScale * 100}%`,
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}

// Box dimensions calculator:
// Phase 1: width = height → both grow from 0 to BOX_HEIGHT (perfect square)
// Phase 2: height stays at BOX_HEIGHT, width continues to MAX_BOX_WIDTH (rectangle)
function useBoxDimensions(frame: number, start: number) {
  // Phase 1 ends when height reaches BOX_HEIGHT
  const squareEnd = start + ENTER_DURATION * 0.45;

  // Phase 1: square growth (0 → 112 for both width & height)
  const squareSize = interpolate(frame, [start, squareEnd], [0, BOX_HEIGHT], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ENTER_EASE,
  });

  // Phase 2: width continues (112 → MAX_BOX_WIDTH), height stays at 112
  const expandedWidth = interpolate(
    frame,
    [squareEnd, start + ENTER_DURATION],
    [BOX_HEIGHT, MAX_BOX_WIDTH],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ENTER_EASE },
  );

  return {
    height: squareSize, // 0→112, clamped at 112
    width: frame >= squareEnd ? expandedWidth : squareSize, // square→rectangle
  };
}

export default function TitleAnimation({
  text,
  fontFamily,
}: TitleAnimationProps) {
  const frame = useCurrentFrame();
  const { text1, text2 } = splitTitle(text);

  // ─── Box dimensions: pixel-based width/height animation ───────────────────────
  const box1 = useBoxDimensions(frame, 0);
  const box2 = useBoxDimensions(frame, BOX2_DELAY);

  // ─── Exit: diagonal fade at ~45° with heavy soft edge (Feather=335) ───────────
  const exitProgress = interpolate(frame, [EXIT_START, EXIT_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EXIT_EASE,
  });
  // Sweep upper-right → lower-left; 60% soft zone simulates Lottie feather=335
  const sweepPos = interpolate(exitProgress, [0, 1], [-60, 160]);
  const exitMask =
    exitProgress > 0
      ? `linear-gradient(225deg, transparent ${sweepPos - 60}%, black ${sweepPos + 60}%)`
      : undefined;

  return (
    <AbsoluteFill>
      {/* Title Sound */}
      <Audio src={staticFile("sudan/sounds/title.wav")} />

      <div
        style={{
          position: "absolute",
          top: 880,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 20,
          color: "#ffffff",
          fontFamily,
          fontSize: 60,
          whiteSpace: "nowrap",
          direction: "rtl",
          // Exit diagonal fade applied to the whole title group
          WebkitMaskImage: exitMask,
          maskImage: exitMask,
        }}
      >
        {/* Box 1: Teal — grows from center center */}
        <div style={{ position: "relative", height: BOX_HEIGHT }}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: box1.width,
              height: box1.height,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#007675",
                padding: "2px 25px",
                height: BOX_HEIGHT,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "max-content",
              }}
            >
              <AnimatedText text={text1} frame={frame} startFrame={0} />
            </div>
          </div>
        </div>

        {/* Box 2: Orange — grows from center center, staggered */}
        <div style={{ position: "relative", height: BOX_HEIGHT }}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: box2.width,
              height: box2.height,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#F88353",
                padding: "2px 25px",
                height: BOX_HEIGHT,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "max-content",
              }}
            >
              <AnimatedText
                text={text2}
                frame={frame}
                startFrame={BOX2_DELAY}
              />
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}
