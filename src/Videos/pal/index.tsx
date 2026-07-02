import {
  AbsoluteFill,
  Img,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import Video from "../../Components/Video";
import { TemplateProps } from "../types";
import TagsAnimation from "./TagsAnimation";
import SocialMediaAnimation, {
  SOCIAL_MEDIA_ANIMATION_DURATION,
} from "./SocialMediaAnimation";
import SourceAnimation, { SOURCE_ANIMATION_DURATION } from "./SourceAnimation";
import SpeakerAnimation from "./SpeakerAnimation";
import Cover from "../../Components/Cover";
import AudioClips from "../../Components/AudioClips";
import Captions from "../../Components/Captions";

const RubikRegular = "RubikRegular";
const DINAlternateBold = "DINAlternate Bold";

export default function PalTemplate({ data }: TemplateProps) {
  const { fps } = useVideoConfig();

  const fontsLoaded = useLoadFonts([
    {
      family: RubikRegular,
      url: staticFile("pal/fonts/Rubik-Regular.ttf"),
    },
    {
      family: DINAlternateBold,
      url: staticFile("pal/fonts/DINAlternate-Bold.ttf"),
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

      {/* Logo */}
      <Img
        src={staticFile("pal/elements/logo.png")}
        style={{
          position: "absolute",
          left: 25,
          top: 65,
          width: 260,
          height: 460,
        }}
      />

      {/* Captions */}
      <Captions
        src={data.captions.src}
        containerStyle={{
          top: 1120,
          maxWidth: "90%",
          padding: 18,
          borderRadius: 12,
          backgroundColor: "rgba(172, 0, 0, 0.85)",
        }}
        textStyle={{
          color: "#ffffff",
          fontFamily: DINAlternateBold,
          fontSize: 60,
          lineHeight: 1.1,
          textShadow: "2.12px 2.12px 12px rgba(0, 0, 0, 1)",
          textTransform: "uppercase",
        }}
      />

      {/* Social Media */}
      <Sequence  durationInFrames={SOCIAL_MEDIA_ANIMATION_DURATION}>
        <SocialMediaAnimation fontFamily={RubikRegular} />
      </Sequence>

      {/* Source */}
      <Sequence  durationInFrames={SOURCE_ANIMATION_DURATION}>
        <SourceAnimation text={data.tags.source} fontFamily={RubikRegular} />
      </Sequence>

      {/* Tags */}
      <TagsAnimation
        location={data.tags.location}
        date={data.tags.date}
        fontFamily={RubikRegular}
      />
      {/* Speakers */}
      {data.speakers.length > 0 &&
        data.speakers.map((speaker, index) => (
          <Sequence
            from={speaker.start * fps}
            key={index}
            durationInFrames={250}
          >
            <SpeakerAnimation
              name={speaker.name}
              description={speaker.description}
              fontFamily={RubikRegular}
            />
          </Sequence>
        ))}
    </AbsoluteFill>
  );
}
