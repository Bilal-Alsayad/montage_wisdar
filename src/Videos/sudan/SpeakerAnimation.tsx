import React from "react";
import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// ─── Lottie data.json: fr=24fps, Remotion=30fps → multiplier = 1.25 ───────────
//
// Layer 2 (name text): Position X, t:3→23 @24fps → 4→29 @30fps
//   from x=125.8 to x=166.5 → offset ≈ 41px (slides in from right)
//   Easing: o={x:0.333,y:0} i={x:0,y:1} → bezier(0.333,0,0,1)
//
// Layer 4 (description text): Position X, t:7→27 @24fps → 9→34 @30fps
//   offset ≈ 37px
//   Easing: same bezier(0.333,0,0,1)
//
// Icon (user request): rotate 45°→0° in 10 frames, shadow color #D2F474→transparent
// Exit: exact reverse-frame of enter for all elements

// ─── Easing ───────────────────────────────────────────────────────────────────
// Text slide: o={x:0.333,y:0} i={x:0,y:1}
const TEXT_EASE = Easing.bezier(0.333, 0, 0, 1);
// Icon rotate: smooth ease-out
const ICON_EASE = Easing.bezier(0.2, 0, 0, 1);

// ─── Timing constants (30fps) ─────────────────────────────────────────────────
const ICON_ENTER_END = 10;       // icon rotation: 0→10 frames
const NAME_ENTER_START = 4;
const NAME_ENTER_END = 29;
const DESC_ENTER_START = 9;
const DESC_ENTER_END = 34;

// Longest enter = DESC_ENTER_END = 34 frames
const ENTER_DURATION = DESC_ENTER_END;

const WHITE = "#FFFFFF";

// ─── Component ────────────────────────────────────────────────────────────────
interface SpeakerAnimationProps {
  name: string;
  description: string;
  fontFamily: string;
}

export const SpeakerAnimation: React.FC<SpeakerAnimationProps> = ({
  name,
  description,
  fontFamily,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const exitStart = durationInFrames - ENTER_DURATION;

  // ─── Reverse-frame for exit ────────────────────────────────────────────────
  const reverseFrame = Math.max(
    0,
    Math.min(ENTER_DURATION, ENTER_DURATION - (frame - exitStart))
  );
  const isExiting = frame >= exitStart;

  // ─── Icon: Rotation 45°→0° on enter, 0°→45° on exit ──────────────────────
  const iconEnterRot = interpolate(
    frame,
    [0, ICON_ENTER_END],
    [-45, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ICON_EASE }
  );
  const iconExitRot = interpolate(
    reverseFrame,
    [0, ICON_ENTER_END],
    [-45, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ICON_EASE }
  );
  const iconRot = isExiting ? iconExitRot : iconEnterRot;

  // ─── Icon: Shadow duplicate — same icon lagged by ~4 frames, colored #D2F474 ──
  // Shadow rotation is 4 frames behind the main icon, giving a trailing trail effect
  const SHADOW_LAG = 1;
  const shadowEnterRot = interpolate(
    Math.max(0, frame - SHADOW_LAG),
    [0, ICON_ENTER_END],
    [-45, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ICON_EASE }
  );
  const shadowExitRot = interpolate(
    Math.max(0, reverseFrame - SHADOW_LAG),
    [0, ICON_ENTER_END],
    [-45, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ICON_EASE }
  );
  const shadowRot = isExiting ? shadowExitRot : shadowEnterRot;

  // Shadow opacity: fully visible at start of rotation, fades out as icon reaches 0°
  const shadowOpacity = interpolate(
    isExiting ? reverseFrame : frame,
    [0, ICON_ENTER_END],
    [0.8, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // ─── Icon: Overall opacity ─────────────────────────────────────────────────
  const iconEnterOpacity = interpolate(
    frame,
    [0, 5],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: TEXT_EASE }
  );
  const iconExitOpacity = interpolate(
    reverseFrame,
    [0, 5],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: TEXT_EASE }
  );
  const iconOpacity = Math.min(iconEnterOpacity, iconExitOpacity);

  // ─── Name text: slides in from LEFT (negative X) ─────────────────────────
  // Lottie: position X offset ≈ 41px → we start at -41 (from left) and arrive at 0
  const nameEnterX = interpolate(
    frame,
    [NAME_ENTER_START, NAME_ENTER_END],
    [-41, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: TEXT_EASE }
  );
  const nameExitX = interpolate(
    reverseFrame,
    [NAME_ENTER_START, NAME_ENTER_END],
    [-41, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: TEXT_EASE }
  );
  const nameX = isExiting ? nameExitX : nameEnterX;

  // clipPath wipe for name (RTL Arabic): reveals right→left
  // inset(top right bottom left) — LEFT inset goes 100%→0% (reveal right-to-left)
  const nameWipeProgress = interpolate(
    isExiting ? reverseFrame : frame,
    [NAME_ENTER_START, NAME_ENTER_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: TEXT_EASE }
  );
  const nameClip = `inset(0 0 0 ${(1 - nameWipeProgress) * 100}%)`;

  // ─── Description text: slides in from LEFT, staggered after name ──────────
  const descEnterX = interpolate(
    frame,
    [DESC_ENTER_START, DESC_ENTER_END],
    [-37, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: TEXT_EASE }
  );
  const descExitX = interpolate(
    reverseFrame,
    [DESC_ENTER_START, DESC_ENTER_END],
    [-37, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: TEXT_EASE }
  );
  const descX = isExiting ? descExitX : descEnterX;

  // clipPath wipe for description (RTL Arabic): reveals right→left
  const descWipeProgress = interpolate(
    isExiting ? reverseFrame : frame,
    [DESC_ENTER_START, DESC_ENTER_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: TEXT_EASE }
  );
  const descClip = `inset(0 0 0 ${(1 - descWipeProgress) * 100}%)`;

  return (
    <AbsoluteFill>
      <Audio src={staticFile("sudan/sounds/speaker.wav")} />
      <div
        style={{
          position: "absolute",
          top: 550,
          right: 100,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* ── Text block: name + description ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 5,
          }}
        >
          {/* Name — clipPath wipe reveals left→right, text slides from left */}
          <div style={{ clipPath: nameClip, overflow: "visible" }}>
            <span
              style={{
                fontFamily,
                fontSize: 33,
                color: WHITE,
                transform: `translateX(${nameX}px)`,
                display: "block",
                whiteSpace: "nowrap",
              }}
            >
              {name}
            </span>
          </div>

          {/* Description — same clipPath wipe treatment */}
          <div style={{ clipPath: descClip, overflow: "visible" }}>
            <span
              style={{
                fontFamily,
                fontSize: 28,
                color: "#EA9369",
                transform: `translateX(${descX}px)`,
                display: "block",
                whiteSpace: "nowrap",
              }}
            >
              {description}
            </span>
          </div>
        </div>

        {/* ── Icon: shadow duplicate (lagged rotation, #D2F474) + main icon ── */}
        <div style={{ opacity: iconOpacity, position: "relative", flexShrink: 0 }}>
          {/* Shadow: same icon, lagged rotation, accent color via mix-blend + tint filter */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              opacity: shadowOpacity,
              transform: `rotate(${shadowRot}deg)`,
              filter: "brightness(0) saturate(100%) invert(88%) sepia(55%) saturate(500%) hue-rotate(30deg) brightness(1.1)",
            }}
          >
            <Img
              src={staticFile("sudan/icons/speaker.png")}
              style={{ display: "block" }}
            />
          </div>

          {/* Main icon on top */}
          <div style={{ transform: `rotate(${iconRot}deg)` }}>
            <Img
              src={staticFile("sudan/icons/speaker.png")}
              style={{ display: "block" }}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
