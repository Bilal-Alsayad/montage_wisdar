import { Easing, interpolate, staticFile, useCurrentFrame } from "remotion";

// ─── Timing ────────────────────────────────────────────────────────────────────
const EASE = Easing.bezier(0.333, 0, 0.667, 1);

const SEGMENT = 170;           // duration of each group (location+date | source)
const ENTER_DURATION = 20;     // clipPath reveal duration (frames)
const EXIT_DURATION = 20;      // fadeOut duration (frames)

export const TAGS_ANIMATION_DURATION = SEGMENT * 2; // 340 frames total

// ─── Per-group animation values ────────────────────────────────────────────────
// Returns clipPath (enter) and opacity (exit) for a group
// that lives in [segmentStart, segmentStart + SEGMENT]
function useGroupAnim(frame: number, segmentStart: number) {
  const localFrame = frame - segmentStart;

  // Enter: clipPath reveal from top → bottom (0→ENTER_DURATION)
  const clipProgress = interpolate(localFrame, [0, ENTER_DURATION], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
  const clipPath = `inset(0 0 ${(1 - clipProgress) * 100}% 0)`;

  // Exit: fadeOut (SEGMENT-EXIT_DURATION → SEGMENT)
  const opacity = interpolate(
    localFrame,
    [SEGMENT - EXIT_DURATION, SEGMENT],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE }
  );

  // Visible only within this segment
  const visible = localFrame >= 0 && localFrame < SEGMENT;

  return { clipPath, opacity, visible };
}

// ─── Single tag pill ───────────────────────────────────────────────────────────
interface TagProps {
  text: string;
  icon: string;
  fontFamily: string;
}

function TagPill({ text, icon, fontFamily }: TagProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#BF2C31",
        borderRadius: "50px",
        padding: "5px 20px",
        width: "fit-content",
      }}
    >
      <span style={{ fontFamily, fontSize: 35, color: "#fff", marginRight: 15 }}>
        {text}
      </span>
      <img src={icon} alt={text} width={30} height={30} />
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
interface TagsAnimationProps {
  location?: string;
  date?: string;
  source?: string;
  fontFamily: string;
}

export default function TagsAnimation({
  location,
  date,
  source,
  fontFamily,
}: TagsAnimationProps) {
  const frame = useCurrentFrame();

  // Group 1: location + date  (frames 0 → 170)
  const group1 = useGroupAnim(frame, 0);

  // Group 2: source  (frames 170 → 340)
  const group2 = useGroupAnim(frame, SEGMENT);

  const containerStyle = {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "flex-start",
    gap: "10px",
    position: "absolute" as const,
    top: 390,
    left: 100,
  };

  return (
    <>
      {/* Group 1 — location + date */}
      {group1.visible && (
        <div
          style={{
            ...containerStyle,
            clipPath: group1.clipPath,
            opacity: group1.opacity,
          }}
        >
          {location && (
            <TagPill
              text={location}
              icon={staticFile("diasporapulse/icons/location.png")}
              fontFamily={fontFamily}
            />
          )}
          {date && (
            <TagPill
              text={date}
              icon={staticFile("diasporapulse/icons/date.png")}
              fontFamily={fontFamily}
            />
          )}
        </div>
      )}

      {/* Group 2 — source */}
      {group2.visible && (
        <div
          style={{
            ...containerStyle,
            clipPath: group2.clipPath,
            opacity: group2.opacity,
          }}
        >
          {source && (
            <TagPill
              text={source}
              icon={staticFile("diasporapulse/icons/source.png")}
              fontFamily={fontFamily}
            />
          )}
        </div>
      )}
    </>
  );
}
