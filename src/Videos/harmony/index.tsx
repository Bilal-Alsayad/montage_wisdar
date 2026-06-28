import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import Video from "../../Components/Video";
import Captions from "../../Components/Captions";
import { TemplateProps } from "../types";
import SpeakerAnimation, {
  HARMONY_SPEAKER_ANIMATION_DURATION,
} from "./SpeakerAnimation";
import SourceAnimation, {
  HARMONY_SOURCE_ANIMATION_DURATION,
} from "./SourceAnimation";

const HARMONY_ANTON = "HarmonyAnton";
const HARMONY_MONTSERRAT = "HarmonyMontserratSemiBold";

export default function HarmonyTemplate({
  data,
  outroDurationInFrames = 0,
  outroStartFrame,
}: TemplateProps) {
  const { fps } = useVideoConfig();

  const fontsLoaded = useLoadFonts([
    {
      family: HARMONY_ANTON,
      url: staticFile("harmony/elements/AntonRegular.ttf"),
      weight: "400",
      style: "normal",
    },
    {
      family: HARMONY_MONTSERRAT,
      url: staticFile("harmony/elements/MontserratSemiBold.ttf"),
      weight: "600",
      style: "normal",
    },
  ]);

  if (!fontsLoaded) return null;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Video
        sequences={data.sequences}
        scaleToFit={data.scale_to_fit}
        backgroundUrl={data.background_img_url}
      />

      {data.tags.source && (
        <Sequence durationInFrames={HARMONY_SOURCE_ANIMATION_DURATION}>
          <SourceAnimation
            source={data.tags.source}
            fontFamily={HARMONY_ANTON}
          />
        </Sequence>
      )}

      {data.speakers.length > 0 &&
        data.speakers.map((speaker, index) => (
          <Sequence
            from={speaker.start * fps}
            key={index}
            durationInFrames={HARMONY_SPEAKER_ANIMATION_DURATION}
          >
            <SpeakerAnimation
              name={speaker.name}
              description={speaker.description}
              fontFamily={HARMONY_ANTON}
            />
          </Sequence>
        ))}

      <Img
        src={staticFile("harmony/elements/logo.png")}
        style={{
          position: "absolute",
          left: 540 - (3744 * 0.06822347164154) / 2,   // LOGO_POSITION_X - logoWidth / 2
          top: 158.53209972381592 - (714 * 0.06822347164154) / 2,  // LOGO_POSITION_Y - logoHeight / 2
          width: 3744 * 0.06822347164154,   // logoWidth
          height: 714 * 0.06822347164154,   // logoHeight
        }}
      />

      {data.captions.src && (
        <Captions
          src={data.captions.src}
          containerStyle={{
            top: 1180,
            width: "fit-content",
            padding: 24,
            borderRadius: 15,
            backgroundColor: "#000000",
          }}
          textStyle={{
            color: "#ffffff",
            fontFamily: HARMONY_MONTSERRAT,
            fontSize: 55,
            lineHeight: 1.15,
          }}
        />
      )}

      <Sequence
        from={outroStartFrame}
        durationInFrames={outroDurationInFrames}
      >
        <OffthreadVideo
          src={staticFile("harmony/elements/outro.webm")}
          transparent
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Sequence>
    </AbsoluteFill>
  );
}