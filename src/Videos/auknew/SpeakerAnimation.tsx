import React from "react";
import {
  AbsoluteFill,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Img,
  spring,
} from "remotion";

const ICON_SIZE = 53;
const BOX_HEIGHT = 53;
const TOP = 1300;
const RIGHT = 75;

interface SpeakerAnimationProps {
  name?: string;
  description?: string;
  fontFamily: string;
}

export const SpeakerAnimation: React.FC<SpeakerAnimationProps> = ({
  name = "",
  description = "",
  fontFamily,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ─── 1. WHITE ICON BOX: scaleY from center-bottom ───────────────────────
  const iconBoxScaleY = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 130, mass: 0.8 },
  });

  // ─── 2. ICON IMAGE: translateY slides up (delayed after box grows) ───────
  const iconY = spring({
    frame,
    fps,
    from: ICON_SIZE,
    to: 0,
    config: { damping: 14, stiffness: 110, mass: 0.8 },
    delay: Math.round(fps * 0.25),
  });

  // ─── 3. BLUE BOX BACKGROUND: translateX slides in from right ─────────────
  const blueX = spring({
    frame,
    fps,
    from: 180,
    to: 0,
    config: { damping: 16, stiffness: 95, mass: 1 },
  });

  // ─── 4. BLUE BOX: clipPath wipe right→left (0=hidden, 1=revealed) ────────
  const blueWipe = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 16, stiffness: 95, mass: 1 },
  });

  // ─── 5. NAME TEXT: translateY independent spring (slides up) ─────────────
  const nameY = spring({
    frame,
    fps,
    from: BOX_HEIGHT,
    to: 0,
    config: { damping: 18, stiffness: 120, mass: 1 },
    delay: Math.round(fps * 0.12),
  });

  // ─── 6. WHITE DESCRIPTION BOX: clipPath wipe only (delayed) ─────────────
  const whiteWipe = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 16, stiffness: 90, mass: 1 },
    delay: Math.round(fps * 0.35),
  });

  // clipPath: inset(0 0 0 X%) — clips X% from LEFT, reveals right portion first
  // As X goes 100%→0%, content is revealed right-to-left ✓
  const blueLeftInset = (1 - blueWipe) * 100;
  const whiteLeftInset = (1 - whiteWipe) * 100;

  return (
    <AbsoluteFill>
      {/* ── 1. WHITE ICON BOX ──────────────────────────────────────────────
          Separate element, scaleY from center-bottom.
          Icon slides up inside it (delayed). */}
      <div
        style={{
          position: "absolute",
          top: TOP,
          right: RIGHT,
          width: ICON_SIZE,
          height: BOX_HEIGHT,
          backgroundColor: "#ffffff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transformOrigin: "center bottom",
          transform: `scaleY(${iconBoxScaleY})`,
          overflow: "hidden",
        }}
      >
        <Img
          src={staticFile("auknew/elements/speaker.png")}
          style={{
            transform: `translateY(${iconY}px)`,
          }}
        />
      </div>

      {/* ── 2. BLUE NAME BOX ────────────────────────────────────────────────
          translateX: slides box in from right.
          clipPath: wipes from right to left (reveals content).
          overflow:hidden: ensures the text's translateY is clipped to box bounds. */}
      <div
        style={{
          position: "absolute",
          top: TOP,
          right: RIGHT + ICON_SIZE,
          height: BOX_HEIGHT,
          backgroundColor: "#395793",
          display: "flex",
          alignItems: "center",
          whiteSpace: "nowrap",
          overflow: "hidden",
          transform: `translateX(${blueX}px)`,
          clipPath: `inset(0 0 0 ${blueLeftInset}%)`,
        }}
      >
        {/* NAME TEXT: independent spring, only translateY (slides up from below).
            Not scaled by the box — just reveals through the box's clipPath. */}
        <div
          style={{
            fontFamily,
            fontSize: 35,
            color: "#ffffff",
            paddingRight: 20,
            paddingLeft: 20,
            lineHeight: 1.2,
            transform: `translateY(${nameY}px)`,
          }}
        >
          {name}
        </div>
      </div>

      {/* ── 3. WHITE DESCRIPTION BOX ────────────────────────────────────────
          clipPath only — no translateX.
          Text inside has no animation of its own. */}
      <div
        style={{
          position: "absolute",
          top: TOP + BOX_HEIGHT,
          right: RIGHT,
          height: BOX_HEIGHT,
          backgroundColor: "#ffffff",
          display: "flex",
          alignItems: "center",
          whiteSpace: "nowrap",
          clipPath: `inset(0 0 0 ${whiteLeftInset}%)`,
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 30,
            color: "#395793",
            paddingRight: 20,
            paddingLeft: 20,
            lineHeight: 1.2,
          }}
        >
          {description}
        </div>
      </div>
    </AbsoluteFill>
  );
};
