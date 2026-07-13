import {
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import type { CSSProperties } from "react";
import SourceAnimation from "./SourceAnimation";

interface TagsAnimationProps {
  location?: string;
  source?: string;
  date?: string;
  fontFamily: string;
  sourceFontFamily: string;
}

const CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export default function TagsAnimation({
  location,
  source,
  date,
  fontFamily,
  sourceFontFamily,
}: TagsAnimationProps) {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    ...CLAMP,
    easing: Easing.out(Easing.cubic),
  });

  const textStyle: CSSProperties = {
    color: "#fff",
    fontFamily,
    fontSize: 45,
    lineHeight: "45px",
    textShadow: "0 0 5px rgba(0, 0, 0, 0.45)",
    flexShrink: 0,
    opacity,
  };

  const hasContentBeforeDate = Boolean(source || location);

  return (
    <div
      style={{
        position: "absolute",
        left: 30,
        top: 1440,
        display: "flex",
        alignItems: "center",
        transform: "rotate(-90deg)",
        transformOrigin: "top left",
        whiteSpace: "nowrap",
      }}
    >
      {/* Source */}
      {source && (
        <div
          style={{
            marginRight: location || date ? 70 : 0,
            flexShrink: 0,
          }}
        >
          <SourceAnimation
            source={source}
            fontFamily={sourceFontFamily}
          />
        </div>
      )}

      {/* Location */}
      {location && (
        <div
          style={{
            ...textStyle,
            marginRight: 12,
          }}
        >
          {location}
        </div>
      )}

      {/* Location icon */}
      {location && (
        <Img
          src={staticFile("harmony/images/location.png")}
          style={{
            width: 48,
            height: 48,
            objectFit: "contain",
            flexShrink: 0,
            opacity,
          }}
        />
      )}

      {/* Divider */}
      {date && hasContentBeforeDate && (
        <div
          style={{
            width: 4,
            height: 55,
            marginLeft: 18,
            marginRight: 28,
            backgroundColor: "#fff",
            flexShrink: 0,
            opacity,
          }}
        />
      )}

      {/* Date */}
      {date && <div style={textStyle}>{date}</div>}
    </div>
  );
}