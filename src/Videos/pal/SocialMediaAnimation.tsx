import { memo, type ComponentType } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  interpolateColors,
  useCurrentFrame,
} from "remotion";

export const SOCIAL_MEDIA_ANIMATION_DURATION = 196;

// Easing curves
const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
const EASE_IN_OUT = Easing.bezier(0.33, 0, 0.67, 1);

// Layout constants
const ICON_SIZE = 50;
const ICON_BORDER = 4;
const BAR_LEFT = ICON_SIZE - ICON_BORDER; // 46px
const BAR_MAX_WIDTH = 212;
const TEXT = "pulseofpal";

// SVG Icons

const InstagramIcon = () => (
  <svg viewBox="0 0 32 32" style={{ width: 27, height: 27, display: "block" }}>
    <rect
      x="7"
      y="7"
      width="18"
      height="18"
      rx="4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.7"
    />
    <circle
      cx="16"
      cy="16"
      r="4.3"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    />
    <circle cx="21.5" cy="10.5" r="1.6" fill="currentColor" />
  </svg>
);

const XIcon = () => (
  <svg fill="#ffffff" width="27px" height="27px" viewBox="0 0 30 30">
    <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z" />
  </svg>
);

const TikTokIcon = () => (
  <svg fill="#ffffff" width="27px" height="27px" viewBox="0 0 32 32">
    <path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg fill="#ffffff" width="27px" height="27px" viewBox="-2 -5 24 24">
    <path d="M15.812.017H4.145C1.855.017 0 1.852 0 4.116v5.768c0 2.264 1.856 4.1 4.145 4.1h11.667c2.29 0 4.145-1.836 4.145-4.1V4.116c0-2.264-1.856-4.1-4.145-4.1zM13.009 7.28L7.552 9.855a.219.219 0 0 1-.314-.196V4.35c0-.161.173-.266.318-.193l5.458 2.735a.216.216 0 0 1-.005.389z" />
  </svg>
);

// ─── Platform definition ──────────────────────────────────────────────────────

interface PlatformDefinition {
  Icon: ComponentType;
  enterStart: number;
  enterEnd: number;
  exitStart?: number;
  exitEnd?: number;
}

const platforms: PlatformDefinition[] = [
  {
    Icon: InstagramIcon,
    enterStart: 18,
    enterEnd: 28,
    exitStart: 54,
    exitEnd: 62,
  },
  { Icon: XIcon, enterStart: 54, enterEnd: 62, exitStart: 94, exitEnd: 102 },
  {
    Icon: TikTokIcon,
    enterStart: 94,
    enterEnd: 102,
    exitStart: 134,
    exitEnd: 142,
  },
  { Icon: YouTubeIcon, enterStart: 134, enterEnd: 142 },
];

const getPlatformTransform = (
  frame: number,
  { enterStart, enterEnd, exitStart, exitEnd }: PlatformDefinition,
) => {
  if (frame < enterStart) {
    return { x: ICON_SIZE, opacity: 0 };
  }

  if (frame <= enterEnd) {
    return {
      x: interpolate(frame, [enterStart, enterEnd], [ICON_SIZE, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: EASE_IN_OUT,
      }),
      opacity: 1,
    };
  }

  if (exitStart !== undefined && exitEnd !== undefined && frame >= exitStart) {
    return {
      x: interpolate(frame, [exitStart, exitEnd], [0, -ICON_SIZE], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: EASE_IN_OUT,
      }),
      opacity: interpolate(frame, [exitStart, exitEnd], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    };
  }

  return { x: 0, opacity: 1 };
};

// ─── PlatformLayer component ──────────────────────────────────────────────────

const PlatformLayer = memo(
  ({ frame, platform }: { frame: number; platform: PlatformDefinition }) => {
    const { Icon } = platform;
    const motion = getPlatformTransform(frame, platform);

    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: motion.opacity,
          transform: `translateX(${motion.x}px)`,
          willChange: "transform, opacity",
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            backgroundColor: "#1a1a1a",
            color: "#ffffff",
          }}
        >
          <Icon />
        </div>
      </div>
    );
  },
);

// Main component

interface SocialMediaAnimationProps {
  fontFamily: string;
}

export default function SocialMediaAnimation({
  fontFamily,
}: SocialMediaAnimationProps) {
  const frame = useCurrentFrame();

  // Intro slide
  const introTranslateX = interpolate(frame, [0, 12], [76, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  const introOpacity = interpolate(frame, [0, 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Border color flash
  const outerBorderColor = interpolateColors(
    frame,
    [0, 9],
    ["#303030", "#ffffff"],
  );

  // Bar width
  const openingBarWidth = interpolate(frame, [11, 28], [0, 212], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  const closingBarWidth = interpolate(frame, [174, 185], [212, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_IN_OUT,
  });
  const barWidth = frame < 174 ? openingBarWidth : closingBarWidth;

  // Text reveal
  const textReveal = interpolate(frame, [23, 37], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  const textTranslateX = interpolate(frame, [23, 37], [-10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  const textOpacity = interpolate(frame, [23, 33], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textColor = interpolateColors(frame, [24, 37], ["#c5c5c5", "#111111"]);

  // Exit: icon mask collapse + final fade
  const iconMaskWidth = interpolate(frame, [186, 195], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_IN_OUT,
  });
  const finalOpacity = interpolate(frame, [193, 195], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 770,
          top: 230,
          width: ICON_SIZE + BAR_MAX_WIDTH,
          height: ICON_SIZE,
          opacity: finalOpacity,
        }}
      >
        {/* Text bar */}
        <div
          style={{
            position: "absolute",
            left: BAR_LEFT,
            top: 0,
            width: barWidth,
            height: ICON_SIZE,
            backgroundColor: "#ffffff",
            overflow: "hidden",
            boxSizing: "border-box",
            zIndex: 1,
            willChange: "width",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: BAR_MAX_WIDTH,
              height: ICON_SIZE,
              display: "flex",
              alignItems: "center",
              clipPath: `inset(0 ${100 - textReveal * 100}% 0 0)`,
            }}
          >
            <span
              style={{
                display: "block",
                width: BAR_MAX_WIDTH,
                textAlign: "center",
                fontFamily,
                fontSize: 35,
                fontWeight: 700,
                lineHeight: `${ICON_SIZE}px`,
                color: textColor,
                whiteSpace: "nowrap",
                opacity: textOpacity,
                transform: `translateX(${textTranslateX}px)`,
                willChange: "transform, opacity",
              }}
            >
              {TEXT}
            </span>
          </div>
        </div>

        {/* Icon circle with sliding mask */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: iconMaskWidth,
            height: ICON_SIZE,
            overflow: "hidden",
            transform: `translateX(${introTranslateX}px)`,
            opacity: introOpacity,
            zIndex: 3,
            willChange: "width, transform, opacity",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: ICON_SIZE,
              height: ICON_SIZE,
              border: `${ICON_BORDER}px solid ${outerBorderColor}`,
              backgroundColor: "#171717",
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            {/* Inner background */}
            <div
              style={{
                position: "absolute",
                inset: 5,
                backgroundColor: "#171717",
                boxSizing: "border-box",
                zIndex: 0,
              }}
            />

            {/* Platform icons */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                overflow: "hidden",
                zIndex: 2,
              }}
            >
              {platforms.map((platform, index) => (
                <PlatformLayer key={index} frame={frame} platform={platform} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}
