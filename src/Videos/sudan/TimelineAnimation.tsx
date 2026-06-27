import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";


export function TimelineAnimation() {
  const { durationInFrames } = useVideoConfig()
  const frame = useCurrentFrame();

  const fillProgress = interpolate(
    frame,
    [0, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // ─── Reveal clip for the FILLED part (left side, LTR) ─────────────────────
  // inset(0  RIGHT%  0  0) → shows from left up to fillProgress
  const fillRightClip = (1 - fillProgress) * 100;



  return (
    <AbsoluteFill>
      {/* ── Timeline container — positioned at bottom of frame ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 20,
        }}
      >

        {/* Fill (progress — white, clips to reveal LTR) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            clipPath: `inset(0 ${fillRightClip}% 0 0)`,
            backgroundColor: "#10FFF3",
          }}
        />
      </div>
    </AbsoluteFill>
  );
}
