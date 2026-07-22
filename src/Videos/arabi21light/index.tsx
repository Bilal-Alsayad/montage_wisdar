import {
  AbsoluteFill,
  Loop,
  OffthreadVideo,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import { TemplateProps } from "../types";
import Captions from "../../Components/Captions";
import Video from "../../Components/Video";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import TitleAnimation, { TITLE_ANIMATION_DURATION } from "./TitleAnimation";
import TagsAnimation from "./TagsAnimation";
import SpeakerAnimation, {
  SPEAKER_ANIMATION_DURATION,
} from "./SpeakerAnimation";
import Cover from "../../Components/Cover";
import AudioClips from "../../Components/AudioClips";

const itfHuwiyaArabicBold = "ITF Huwiya Arabic Bold";
const itfHuwiyaArabicMedium = "ITF Huwiya Arabic Medium";
const itfHuwiyaArabicRegular = "ITF Huwiya Arabic Regular";

const LOGO_DURATION_FRAMES = 1800;

export default function Arabi21LightTemplate({
  outroStartFrame,
  outroDurationInFrames,
  data,
}: TemplateProps) {
  const { fps } = useVideoConfig();

  const fontsLoaded = useLoadFonts([
    {
      family: itfHuwiyaArabicBold,
      url: `${staticFile("arabi21light/fonts/ITFHuwiyaArabicBold.otf")}`,
    },
    {
      family: itfHuwiyaArabicMedium,
      url: `${staticFile("arabi21light/fonts/ITFHuwiyaArabicMedium.otf")}`,
    },
    {
      family: itfHuwiyaArabicRegular,
      url: `${staticFile("arabi21light/fonts/ITFHuwiyaArabicRegular.otf")}`,
    },
  ]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AbsoluteFill>
      {/* Video */}
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
            top: 1000,
            maxWidth: "100%",
            whiteSpace: "nowrap",
          }}
          textStyle={{
            fontSize: 50,
            fontFamily: itfHuwiyaArabicBold,
            color: "#FFFFFF",
            lineHeight: 1.4,
            textShadow: "2.1px 2.1px 12px rgba(0, 0, 0, 0.71)",
            direction: "rtl",
          }}
          wordByWord
        />
      )}
      {/* Title */}
      <Sequence from={0} durationInFrames={TITLE_ANIMATION_DURATION}>
        <TitleAnimation
          text={data.title.text}
          fontFamily={itfHuwiyaArabicBold}
        />
      </Sequence>

      {/* Tags */}
      <Sequence from={0} durationInFrames={TITLE_ANIMATION_DURATION}>
        <TagsAnimation
          location={data.tags.location}
          source={data.tags.source}
          date={data.tags.date}
          fontFamily={itfHuwiyaArabicMedium}
          fontFamilyRegular={itfHuwiyaArabicRegular}
        />
      </Sequence>

      {/* Speaker */}
      {data.speakers.length > 0 &&
        data.speakers.map((speaker, index) => (
          <Sequence
            from={speaker.start * fps}
            durationInFrames={SPEAKER_ANIMATION_DURATION}
            key={index}
          >
            <SpeakerAnimation
              nameText={speaker.name}
              descriptionText={speaker.description}
              fontBoldFamily={itfHuwiyaArabicBold}
              fontRegularFamily={itfHuwiyaArabicRegular}
            />
          </Sequence>
        ))}

      {/* Outro */}
      <Sequence from={outroStartFrame} durationInFrames={outroDurationInFrames}>
        <OffthreadVideo
          src={`${staticFile("arabi21light/elements/outro.webm")}`}
          style={{ zIndex: 100 }}
          transparent
        />
      </Sequence>
      {/* Logo */}
      <Loop durationInFrames={LOGO_DURATION_FRAMES}>
        <OffthreadVideo
          src={`${staticFile("arabi21light/elements/logo.webm")}`}
          style={{ zIndex: 99 }}
          transparent
        />
      </Loop>
    </AbsoluteFill>
  );
}
