import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {measureText} from "@remotion/layout-utils";
import RedStrapAnimation, {
  RED_STRAP_BASE_WIDTH,
  RED_STRAP_HEIGHT,
} from "./RedStrapAnimation";

interface SpeakerAnimationProps {
  name: string;
  description: string;
  fontFamily: string;
}

export const SPEAKER_ANIMATION_DURATION = 138;

const STRAP_LEFT = 85;
const STRAP_TOP = 1040;

const NAME_FONT_SIZE = 33;
const DESCRIPTION_FONT_SIZE = 20.81146;
const DESCRIPTION_HEIGHT = 64;

const EASE = Easing.bezier(0.333, 0, 0.667, 1);

export default function SpeakerAnimation({
  name,
  description,
  fontFamily,
}: SpeakerAnimationProps) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const sourceFrame = (frame * 25) / fps;

  if (!name) {
    return null;
  }

  const nameWidth = measureText({
    text: name,
    fontFamily,
    fontSize: NAME_FONT_SIZE,
  }).width;

  const descriptionWidth = description
    ? measureText({
        text: description,
        fontFamily,
        fontSize: DESCRIPTION_FONT_SIZE,
      }).width
    : 0;

  /*
   * Description kutusu sadece kendi yazısına göre büyür.
   */
  const descriptionBoxWidth = Math.max(
    DESCRIPTION_HEIGHT,
    descriptionWidth + 40,
  );

  /*
   * Kırmızı kutu:
   * - name genişliği + 80
   * - description genişliği + 50
   *
   * değerlerinden daha büyüğünü kullanır.
   */
  const redBoxWidth = Math.max(
    RED_STRAP_BASE_WIDTH,
    nameWidth + 80,
    descriptionWidth + 50,
  );

  /*
   * Description kutusu kırmızı strap açıldıktan sonra iner.
   */
  const descriptionProgress = interpolate(
    sourceFrame,
    [17, 29],
    [0, 1],
    {
      easing: EASE,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const descriptionTranslateY = interpolate(
    descriptionProgress,
    [0, 1],
    [-38, 0],
  );

  /*
   * Speaker çıkışı sadece opacity ile yapılır.
   */
  const speakerOpacity = interpolate(
    frame,
    [126, SPEAKER_ANIMATION_DURATION],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  /*
   * Description kırmızı kutunun altına 6 px girer.
   */
  const descriptionTop =
    STRAP_TOP + RED_STRAP_HEIGHT - 6;

  const descriptionRadius =
    DESCRIPTION_HEIGHT / 2;

  return (
    <AbsoluteFill style={{opacity: speakerOpacity}}>
      {/*
       * Description önce çizilir.
       * Kırmızı strap daha sonra çizildiği için description
       * onun arkasından aşağı iniyormuş gibi görünür.
       */}
      {description && (
        <svg
          width="1080"
          height="1920"
          viewBox="0 0 1080 1920"
          style={{
            position: "absolute",
            inset: 0,
          }}
        >
          <g
            opacity={descriptionProgress}
            transform={`translate(${STRAP_LEFT} ${
              descriptionTop + descriptionTranslateY
            })`}
          >
            <path
              d={`
                M ${descriptionRadius} 0
                H ${descriptionBoxWidth}
                V ${DESCRIPTION_HEIGHT}
                H ${descriptionRadius}

                C 14.327 ${DESCRIPTION_HEIGHT}
                  0 49.673
                  0 ${descriptionRadius}

                C 0 14.327
                  14.327 0
                  ${descriptionRadius} 0

                Z
              `}
              fill="#FAE6D7"
            />

            <text
              x={descriptionBoxWidth / 2}
              y={DESCRIPTION_HEIGHT / 2 + 2}
              fill="#AE272E"
              fontFamily={fontFamily}
              fontSize={DESCRIPTION_FONT_SIZE}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                direction: "rtl",
                unicodeBidi: "plaintext",
              }}
            >
              {description}
            </text>
          </g>
        </svg>
      )}

      <RedStrapAnimation
        text={name}
        fontFamily={fontFamily}
        expandDirection="right"
        left={STRAP_LEFT}
        top={STRAP_TOP}
        width={redBoxWidth}
        fontSize={NAME_FONT_SIZE}
      />
    </AbsoluteFill>
  );
}