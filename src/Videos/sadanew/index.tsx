import {
  AbsoluteFill,
  Img,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import { TemplateProps } from "../types";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import Video from "../../Components/Video";
import TitleAnimation, { TITLE_ANIMATION_DURATION } from "./TitleAnimation";
import TagsAnimation, { TAGS_ANIMATION_DURATION } from "./TagsAnimation";
import SourceAnimation from "./SourceAnimation";
import Captions from "../../Components/Captions";
import SpeakerAnimation, {
  SPEAKER_ANIMATION_DURATION,
} from "./SpeakerAnimation";
import Cover from "../../Components/Cover";
import AudioClips from "../../Components/AudioClips";
// import { MONTAGE_FILES_URL } from "../../utils/constants";

const dinNextArabicMedium = "DinNextArabicMedium";
const dinNextArabicRegular = "DinNextArabicRegular";

export default function SadaNewTemplate({ data }: TemplateProps) {
  const { fps, durationInFrames } = useVideoConfig();

  const fontsLoaded = useLoadFonts([
    {
      family: dinNextArabicMedium,
      url: staticFile("sadanew/fonts/DINNEXTARABICMEDIUM.otf"),
    },
    {
      family: dinNextArabicRegular,
      url: staticFile("sadanew/fonts/DINNEXTARABICREGULAR.otf"),
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

      {data.cover_src && <Cover coverSrc={data.cover_src} />}

      {/* Audio Clips */}
      {data.audio_clips && <AudioClips audioClips={data.audio_clips} />}

      {data.captions.src && (
        <Captions
          src={data.captions.src}
          containerStyle={{
            top: 1520,
            fontSize: 48,
            fontFamily: dinNextArabicMedium,
            color: "#FFFFFF",
          }}
          textStyle={{
            display: "inline",
            background: "#52B5C3",
            padding: "5px 15px",
            lineHeight: 1.9,
            boxDecorationBreak: "clone",
            WebkitBoxDecorationBreak: "clone",
            transform: `translateY(-3px)`,
            direction: "rtl",
          }}
        />
      )}

      {/* Title */}
      <Sequence from={0} durationInFrames={TITLE_ANIMATION_DURATION}>
        <TitleAnimation
          fontFamily={dinNextArabicMedium}
          text={data.title.text}
        />
      </Sequence>

      {/* Location */}
      {data.tags.location && (
        <Sequence from={0} durationInFrames={TAGS_ANIMATION_DURATION}>
          <TagsAnimation
            fontFamily={dinNextArabicMedium}
            location={data.tags.location}
          />
        </Sequence>
      )}

      {/* Source */}
      {data.tags.source && (
        <Sequence from={94} durationInFrames={durationInFrames}>
          <SourceAnimation
            fontFamily={dinNextArabicMedium}
            source={data.tags.source}
          />
        </Sequence>
      )}

      {data.speakers.length > 0 &&
        data.speakers.map((speaker, index) => (
          <Sequence
            key={index}
            from={speaker.start * fps}
            durationInFrames={SPEAKER_ANIMATION_DURATION}
          >
            <SpeakerAnimation
              fontFamilyRegular={dinNextArabicRegular}
              fontFamilyMedium={dinNextArabicMedium}
              name={speaker.name}
              description={speaker.description}
            />
          </Sequence>
        ))}

      {/* Logo */}
      <Img
        src={staticFile("sadanew/elements/logo.png")}
        style={{
          position: "absolute",
          right: 132,
          top: 162,
        }}
      />
    </AbsoluteFill>
  );
}
