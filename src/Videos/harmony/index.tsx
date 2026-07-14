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
import TitleAnimation, { TITLE_ANIMATION_DURATION } from "./TitleAnimation";

const CONFIG_VARIABLE = "ConfigVariable";
const FRACTUL_VARIABLE_BLACK = "FractulBlack";
const ADRIANE_TEXT_BOLD_ITALIC = "AdrianeTextBoldItalic";
const NEUE_PLAK_CONDBOLD ="NeuePlakCondensedBold"
export default function HarmonyTemplate({
  data,
  outroDurationInFrames = 0,
  outroStartFrame,
}: TemplateProps) {
  const { fps } = useVideoConfig();

  const fontsLoaded = useLoadFonts([
    {
      family: CONFIG_VARIABLE,
      url: staticFile("harmony/fonts/ConfigVariable.otf"),
    },
    {
      family: NEUE_PLAK_CONDBOLD,
      url: staticFile("harmony/fonts/NeuePlakCondensedBold.ttf"),
    },
    {
      family: FRACTUL_VARIABLE_BLACK,
      url: staticFile("harmony/fonts/fractulblack.ttf"),
    },
    {
      family: ADRIANE_TEXT_BOLD_ITALIC,
      url: staticFile("harmony/fonts/AdrianeTextBoldItalic.otf"),
    },
  ]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000000",
      }}
    >
      <Video
        sequences={data.sequences}
        scaleToFit={data.scale_to_fit}
        backgroundUrl={data.background_img_url}
      />

      <Img
        src={staticFile("harmony/elements/logo.png")}
        style={{
          position: "absolute",
          left: 110,
          top: 370,
          scale: "75%",
        }}
      />
      <Sequence from={20} durationInFrames={TITLE_ANIMATION_DURATION}>
        <TitleAnimation
          text={data.title.text}
          fontFamily={NEUE_PLAK_CONDBOLD}
        />
      </Sequence>

      <TagsAnimation
        location={data.tags.location}
        source={data.tags.source}
        date={data.tags.date}
        fontFamily={CONFIG_VARIABLE}
        sourceFontFamily={CONFIG_VARIABLE}
      />

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
            fontFamily: CONFIG_VARIABLE,
            fontSize: 45,
          }}
        />
      )}

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
