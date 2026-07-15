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
import TagsAnimation from "./TagsAnimation";
import SpeakerAnimation, {
  SPEAKER_ANIMATION_DURATION,
} from "./SpeakerAnimation";
import AudioClips from "../../Components/AudioClips";
import Cover from "../../Components/Cover";

const CONFIG_VARIABLE = "ConfigVariable";
const FRACTUL_VARIABLE_BLACK = "FractulBlack";
const ADRIANE_TEXT_BOLD_ITALIC = "AdrianeTextBoldItalic";
const NOIR_PRO_REGULAR = "NoirProRegular";
export default function HarmonyTemplate({
  data,
  outroDurationInFrames = 0,
  outroStartFrame,
}: TemplateProps) {
  const { fps, durationInFrames } = useVideoConfig();

  const fontsLoaded = useLoadFonts([
    {
      family: CONFIG_VARIABLE,
      url: staticFile("harmony/fonts/ConfigVariable.otf"),
    },
    {
      family: FRACTUL_VARIABLE_BLACK,
      url: staticFile("harmony/fonts/fractulblack.ttf"),
    },
    {
      family: ADRIANE_TEXT_BOLD_ITALIC,
      url: staticFile("harmony/fonts/AdrianeTextBoldItalic.otf"),
    },
    {
      family: NOIR_PRO_REGULAR,
      url: staticFile("harmony/fonts/NoirProRegular.otf"),
    },
  ]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AbsoluteFill>
      <Video
        sequences={data.sequences}
        scaleToFit={data.scale_to_fit}
        backgroundUrl={data.background_img_url}
      />

      {/* Cover */}
      {data.cover_src && <Cover coverSrc={data.cover_src} />}

      {/* Audio Clips */}
      {data.audio_clips && <AudioClips audioClips={data.audio_clips} />}

      {data.captions.src && (
        <Captions
          src={data.captions.src}
          containerStyle={{
            top: 1100,
            backgroundColor: "#000000",
            padding: "15px",
            borderRadius: "20px",
          }}
          textStyle={{
            color: "#ffffff",
            fontFamily: NOIR_PRO_REGULAR,
            fontSize: 45,
          }}
        />
      )}

      <Img
        src={staticFile("harmony/elements/logo.png")}
        style={{
          position: "absolute",
          left: 110,
          top: 370,
          scale: "75%",
        }}
      />

      <Sequence from={0} durationInFrames={durationInFrames}>
        <TagsAnimation
          location={data.tags.location}
          source={data.tags.source}
          date={data.tags.date}
          fontFamily={CONFIG_VARIABLE}
        />
      </Sequence>

      {data.speakers.length > 0 &&
        data.speakers.map((speaker, index) => (
          <Sequence
            from={speaker.start * fps}
            key={index}
            durationInFrames={SPEAKER_ANIMATION_DURATION}
          >
            <SpeakerAnimation
              name={speaker.name}
              description={speaker.description}
              nameFontFamily={FRACTUL_VARIABLE_BLACK}
              descriptionFontFamily={ADRIANE_TEXT_BOLD_ITALIC}
            />
          </Sequence>
        ))}

      <Sequence from={outroStartFrame} durationInFrames={outroDurationInFrames}>
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
