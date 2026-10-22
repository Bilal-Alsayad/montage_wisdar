import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import { TemplateProps } from "../types";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import Video from "../../Components/Video";
import TitleAnimation, { TITLE_ANIMATION_DURATION } from "./TitleAnimation";
// import TagsAnimation, { TAGS_ANIMATION_DURATION } from "./TagsAnimation";
// import LocationAnimation from "./LocationAnimation";
// import SourceAnimation from "./SourceAnimation";
// import Captions from "../../Components/Captions";
// import SpeakerAnimation, {
//   SPEAKER_ANIMATION_DURATION,
// } from "./SpeakerAnimation";
import Cover from "../../Components/Cover";
import AudioClips from "../../Components/AudioClips";
import VideoLayers from "../../Components/VideoLayers";
// import { f } from "../../utils/constants";
import LogoAnimation from "./LogoAnimation";

const AlmaraiExtraBold = "AlmaraiExtraBold";

export default function ArrajelTemplate({ data }: TemplateProps) {
  const { fps, durationInFrames } = useVideoConfig();

  const fontsLoaded = useLoadFonts([
    {
      family: AlmaraiExtraBold,
      url: staticFile("arrajel/fonts/AlmaraiExtraBold.ttf"),
    }
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


      {/* Video Layers (overlay videos) */}
      <VideoLayers layers={data.video_layers} />

      {/* {data.captions.src && (
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
      )} */}

      {/* Title */}
      <Sequence from={0} durationInFrames={TITLE_ANIMATION_DURATION}>
        <TitleAnimation
          fontFamily={AlmaraiExtraBold}
          text={data.title.text}
        />
      </Sequence>

      {/* Location */}
      {/* {data.tags.location && (
        <Sequence from={0} durationInFrames={TAGS_ANIMATION_DURATION}>
          <TagsAnimation
            fontFamily={dinNextArabicMedium}
            location={data.tags.location}
          />
        </Sequence>
      )} */}

      {/* Source */}
      {/* {data.tags.source && (
        <Sequence from={f(94)} durationInFrames={durationInFrames}>
          <SourceAnimation
            fontFamily={dinNextArabicMedium}
            source={data.tags.source}
          />
        </Sequence>
      )} */}

      {/* {(data.locations ?? []).map((location, index) => (
        <Sequence
          from={(location.from ?? 0) * fps}
          durationInFrames={
            location.duration
              ? Math.round(location.duration * fps)
              : TAGS_ANIMATION_DURATION
          }
          key={`location-${index}`}
        >
          <LocationAnimation text={location.text} fontFamily={dinNextArabicMedium} />
        </Sequence>
      ))} */}

      {/* {(data.sources ?? []).map((source, index) => (
        <Sequence
          from={(source.from ?? 0) * fps}
          durationInFrames={
            source.duration
              ? Math.round(source.duration * fps)
              : TAGS_ANIMATION_DURATION
          }
          key={`source-${index}`}
        >
          <SourceAnimation source={source.text} fontFamily={dinNextArabicMedium} />
        </Sequence>
      ))} */}

      {/* {data.speakers.length > 0 &&
        data.speakers.map((speaker, index) => (
          <Sequence
            key={index}
            from={speaker.start * fps}
            durationInFrames={
              speaker.duration
                ? Math.round(speaker.duration * fps)
                : SPEAKER_ANIMATION_DURATION
            }
          >
            <SpeakerAnimation
              fontFamilyRegular={dinNextArabicRegular}
              fontFamilyMedium={dinNextArabicMedium}
              name={speaker.name}
              description={speaker.description}
            />
          </Sequence>
        ))} */}

      {/* Logo */}
      <Sequence from={0} durationInFrames={durationInFrames}>
        <LogoAnimation />
      </Sequence>
    </AbsoluteFill>
  );
}
