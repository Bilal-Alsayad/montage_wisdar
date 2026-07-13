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

const FADE_DURATION = 15;

const FONT_SIZE = 45;
const TEXT_COLOR = "#FFFFFF";

const SIDE_LEFT = 30;
const SIDE_START_Y = 1440;

const SOURCE_TO_LOCATION_GAP = 70;

const ICON_SIZE = 48;
const LOCATION_ICON_GAP = 12;

const DIVIDER_WIDTH = 55;
const DIVIDER_GAP = 18;

const DATE_GAP = 28;

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

  // Tags fade in once and remain visible for the rest of the video.
  const opacity = interpolate(frame, [0, FADE_DURATION], [0, 1], {
    ...CLAMP,
    easing: Easing.out(Easing.cubic),
  });

  const textStyle: CSSProperties = {
    color: TEXT_COLOR,
    fontFamily,
    fontSize: FONT_SIZE,
    lineHeight: `${FONT_SIZE}px`,
    whiteSpace: "nowrap",
    textShadow: "0 0 5px rgba(0, 0, 0, 0.45)",
    flexShrink: 0,
    opacity,
  };

  const hasContentBeforeDate = Boolean(source || location);

  return (
    <div
      style={{
        position: "absolute",
        left: SIDE_LEFT,
        top: SIDE_START_Y,

        /*
         * Flex düzeni normalde soldan sağa:
         *
         * source → location → icon → line → date
         *
         * -90 derece döndürüldüğünde ekranda aşağıdan yukarıya:
         *
         * source
         * location
         * icon
         * line
         * date
         */
        display: "flex",
        alignItems: "center",
        transform: "rotate(-90deg)",
        transformOrigin: "top left",
        whiteSpace: "nowrap",
        pointerEvents: "none",
      }}
    >
      {/* Source */}
      {source && (
        <SourceAnimation source={source} fontFamily={sourceFontFamily} />
      )}

      {/* Source ile location arasındaki boşluk */}
      {source && (location || date) && (
        <div
          style={{
            width: SOURCE_TO_LOCATION_GAP,
            flexShrink: 0,
          }}
        />
      )}

      {/* Location */}
      {location && <div style={textStyle}>{location}</div>}

      {/* Location ile icon arasındaki boşluk */}
      {location && (
        <div
          style={{
            width: LOCATION_ICON_GAP,
            flexShrink: 0,
          }}
        />
      )}

      {/* Location icon */}
      {location && (
        <Img
          src={staticFile("harmony/images/location.png")}
          style={{
            width: ICON_SIZE,
            height: ICON_SIZE,
            objectFit: "contain",
            flexShrink: 0,
            opacity,
          }}
        />
      )}

      {/* Icon ile divider arasındaki boşluk */}
      {date && hasContentBeforeDate && (
        <div
          style={{
            width: DIVIDER_GAP,
            flexShrink: 0,
          }}
        />
      )}

      {/* Divider */}
      {date && hasContentBeforeDate && (
        <div
          style={{
            width: 4,
            height: DIVIDER_WIDTH,
            backgroundColor: TEXT_COLOR,
            flexShrink: 0,
            opacity,
          }}
        />
      )}

      {/* Divider ile date arasındaki boşluk */}
      {date && hasContentBeforeDate && (
        <div
          style={{
            width: DATE_GAP,
            flexShrink: 0,
          }}
        />
      )}

      {/* Date */}
      {date && <div style={textStyle}>{date}</div>}
    </div>
  );
}
