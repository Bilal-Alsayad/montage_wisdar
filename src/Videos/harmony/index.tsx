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
// import Captions from "../../Components/Captions";
import { TemplateProps } from "../types";
import SpeakerAnimation, {
  // HARMONY_SPEAKER_ANIMATION_DURATION,
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
      url: staticFile("harmony/fonts/AntonRegular.ttf"),
    },
    {
      family: HARMONY_MONTSERRAT,
      url: staticFile("harmony/fonts/MontserratSemiBold.ttf"),
    },
  ]);

  if (!fontsLoaded) return null;

  return (
    <AbsoluteFill>
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
            from={0 * fps}
            key={index}
            durationInFrames={300}
          >
            <SpeakerAnimation
              name={speaker.name}
              description={speaker.description}
              fontFamily={HARMONY_ANTON}
            />
          </Sequence>
        ))}

      <Img
        src={staticFile("harmony/images/logo.png")}
        style={{
          position: "absolute",
          left: 170,
          top: 420,
          scale: "75%"
        }}
      />

      {/* {data.captions.src && (
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
      )} */}

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