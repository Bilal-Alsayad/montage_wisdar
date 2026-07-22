/* eslint-disable @remotion/from-0 */
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {measureText} from "@remotion/layout-utils";
import RedStrapAnimation, {
  RED_STRAP_BASE_WIDTH,
  RED_STRAP_HEIGHT,
} from "./RedStrapAnimation";

interface TagsAnimationProps {
  location: string;
  date: string;
  source: string;
  fontFamily: string;
}

interface TagItemProps {
  text: string;
  icon: string;
  fontFamily: string;
}

export const TAG_ANIMATION_DURATION = 138;
export const TAGS_ANIMATION_DURATION = 276;

const TAG_TOP = 240;
const TAG_RIGHT = 60;

const TAG_FONT_SIZE = 33;
const TAG_HORIZONTAL_PADDING = 80;

const ICON_BOX_WIDTH = 96;
const ICON_BOX_HEIGHT = 72;
const ICON_SIZE = 46;

const EASE = Easing.bezier(0.333, 0, 0.667, 1);

function TagItem({
  text,
  icon,
  fontFamily,
}: TagItemProps) {
  const frame = useCurrentFrame();
  const {width: compositionWidth} = useVideoConfig();

  if (!text) {
    return null;
  }

  /*
   * RedStrapAnimation ile tamamen aynı genişlik hesabı.
   * Böylece ikon kutusu strap'in sol kenarına bağlanır.
   */
  const strapWidth = Math.max(
    RED_STRAP_BASE_WIDTH,
    measureText({
      text,
      fontFamily,
      fontSize: TAG_FONT_SIZE,
    }).width + TAG_HORIZONTAL_PADDING,
  );

  const strapLeft =
    compositionWidth - TAG_RIGHT - strapWidth;

  /*
   * Kırmızı strap 16. kare civarında tamamlanır.
   * İkon kutusu hemen ardından aşağı iner.
   */
  const iconBoxProgress = interpolate(
    frame,
    [18, 30],
    [0, 1],
    {
      easing: EASE,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  /*
   * Çıkış animasyonu sadece opacity.
   */
  const tagOpacity = interpolate(
    frame,
    [126, TAG_ANIMATION_DURATION],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <AbsoluteFill style={{opacity: tagOpacity}}>
      {/*
       * İkon kutusu önce çizilir.
       * RedStrapAnimation daha sonra çizildiği için kutu
       * strap'in arkasından aşağı çıkıyormuş gibi görünür.
       */}
      <div
        style={{
          position: "absolute",
          top: TAG_TOP + RED_STRAP_HEIGHT - 4,
          left: strapLeft,
          width: ICON_BOX_WIDTH,
          height: ICON_BOX_HEIGHT,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          backgroundColor: "#B82E38",
          borderRadius: "0 0 0 34px",
          opacity: iconBoxProgress,
          transform: `translateY(${interpolate(
            iconBoxProgress,
            [0, 1],
            [-ICON_BOX_HEIGHT + 8, 0],
          )}px)`,
        }}
      >
        <Img
          src={staticFile(icon)}
          style={{
            width: ICON_SIZE,
            height: ICON_SIZE,
            objectFit: "contain",
          }}
        />
      </div>

      <RedStrapAnimation
        text={text}
        fontFamily={fontFamily}
        expandDirection="left"
        right={TAG_RIGHT}
        top={TAG_TOP}
        fontSize={TAG_FONT_SIZE}
        horizontalPadding={TAG_HORIZONTAL_PADDING}
      />
    </AbsoluteFill>
  );
}

export default function TagsAnimation({
  location,
  date,
  fontFamily,
}: TagsAnimationProps) {
  return (
    <AbsoluteFill>
      {location && (
        <Sequence
          from={0}
          durationInFrames={TAG_ANIMATION_DURATION}
        >
          <TagItem
            text={location}
            icon="turkpress/images/location.png"
            fontFamily={fontFamily}
          />
        </Sequence>
      )}

      {date && (
        <Sequence
          from={TAG_ANIMATION_DURATION}
          durationInFrames={TAG_ANIMATION_DURATION}
        >
          <TagItem
            text={date}
            icon="turkpress/images/date.png"
            fontFamily={fontFamily}
          />
        </Sequence>
      )}
    </AbsoluteFill>
  );
}