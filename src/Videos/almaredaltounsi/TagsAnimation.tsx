/* eslint-disable @remotion/from-0 */
import type {CSSProperties} from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  interpolateColors,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";

interface TagItemStyles {
  textBox: CSSProperties;
  text: CSSProperties;
  iconBox: CSSProperties;
  icon: CSSProperties;
  textBackgroundColors: [string, string];
  textColors: [string, string, string];
  iconBackgroundColors: [string, string, string];
}

export interface TagsAnimationStyles {
  location: TagItemStyles;
  date: TagItemStyles;
  source: TagItemStyles;
}

interface TagsAnimationProps {
  location?: string;
  date?: string;
  source?: string;
  styles: TagsAnimationStyles;
}

const TAG_DURATION = 150;
const DATE_OFFSET_Y = 70;

export const TAGS_ANIMATION_DURATION = 300;

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

const ease = Easing.bezier(0.333, 0, 0.667, 1);
const textRevealEase = Easing.bezier(0.194, 0, 0.333, 1);

// --- Üç tag (location, date, source) aynı animasyonu paylaşıyor.
// Tek fark: hangi ikon dosyası kullanıldığı, ikonun opacity zamanlaması
// (location/source: 0-7.2, date: 3.6-10.8) ve date'in ekstra Y ofseti.

interface AnimatedTagProps {
  text?: string;
  styles: TagItemStyles;
  iconSrc: string;
  iconOpacityRange?: [number, number];
  offsetY?: number;
}

function AnimatedTag({
  text,
  styles,
  iconSrc,
  iconOpacityRange = [0, 7.2],
  offsetY = 0,
}: AnimatedTagProps) {
  const frame = useCurrentFrame();

  if (!text) {
    return null;
  }

  const animationFrame = frame < 108 ? frame : TAG_DURATION - frame;

  const textTranslateX = interpolate(animationFrame, [4.8, 20.4], [36, 0], {
    ...clamp,
    easing: ease,
  });

  const backgroundScaleX = interpolate(animationFrame, [4.8, 19.2], [0, 1], {
    ...clamp,
    easing: ease,
  });

  const textReveal = interpolate(animationFrame, [7.2, 25.2], [100, 0], {
    ...clamp,
    easing: textRevealEase,
  });

  const iconTranslateX = interpolate(animationFrame, [0, 19.2], [68, 0], {
    ...clamp,
    easing: ease,
  });

  const iconScaleX = interpolate(animationFrame, [0, 12], [0.16, 1], {
    ...clamp,
    easing: ease,
  });

  const iconOpacity = interpolate(animationFrame, iconOpacityRange, [0, 1], clamp);

  const content = (
    <>
      <div
        style={{
          ...styles.textBox,
          transform: `translateX(${textTranslateX}px)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: interpolateColors(
              animationFrame,
              [4.8, 15.6],
              styles.textBackgroundColors,
            ),
            transform: `scaleX(${backgroundScaleX})`,
            transformOrigin: "right center",
          }}
        />

        <div
          style={{
            ...styles.text,
            color: interpolateColors(
              animationFrame,
              [7.2, 13.2, 14.4],
              styles.textColors,
            ),
            clipPath: `inset(0 0 0 ${textReveal}%)`,
          }}
        >
          {text}
        </div>
      </div>

      <div
        style={{
          ...styles.iconBox,
          backgroundColor: interpolateColors(
            animationFrame,
            [9.6, 16.8, 18],
            styles.iconBackgroundColors,
          ),
          transform: `translateX(${iconTranslateX}px) scaleX(${iconScaleX})`,
        }}
      />

      <Img
        src={iconSrc}
        style={{
          ...styles.icon,
          opacity: iconOpacity,
        }}
      />
    </>
  );

  if (offsetY === 0) {
    return content;
  }

  return (
    <AbsoluteFill style={{transform: `translateY(${offsetY}px)`}}>
      {content}
    </AbsoluteFill>
  );
}

export default function TagsAnimation({
  location,
  date,
  source,
  styles,
}: TagsAnimationProps) {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={TAG_DURATION}>
        <AnimatedTag
          text={location}
          styles={styles.location}
          iconSrc={staticFile("pulitkat/almaredaltounsi/images/location.png")}
        />

        <AnimatedTag
          text={date}
          styles={styles.date}
          iconSrc={staticFile("pulitkat/almaredaltounsi/images/date.png")}
          iconOpacityRange={[3.6, 10.8]}
          offsetY={DATE_OFFSET_Y}
        />
      </Sequence>

      <Sequence from={150} durationInFrames={TAG_DURATION}>
        <AnimatedTag
          text={source}
          styles={styles.source}
          iconSrc={staticFile("pulitkat/almaredaltounsi/images/source.png")}
        />
      </Sequence>
    </AbsoluteFill>
  );
}