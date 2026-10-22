import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import { TemplateProps } from "../types";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import Video from "../../Components/Video";
import TitleAnimation, { TITLE_ANIMATION_DURATION } from "./TitleAnimation";
import LocationAnimation from "./LocationAnimation";
import LogoAnimation from "./LogoAnimation";
import DateAnimation from "./DateAnimation";
import SourceAnimation, { SOURCE_ANIMATION_DURATION } from "./SourceAnimation";

import Cover from "../../Components/Cover";
import AudioClips from "../../Components/AudioClips";
import VideoLayers from "../../Components/VideoLayers";
import { f } from "../../utils/constants";
import SubtitleAnimation from "./SubtitleAnimation";

const AlmaraiExtraBold = "AlmaraiExtraBold";
const AlmaraiBold = "AlmaraiBold";

export default function ArrajelTemplate({ data }: TemplateProps) {
  const { fps, durationInFrames } = useVideoConfig();

  const fontsLoaded = useLoadFonts([
    {
      family: AlmaraiExtraBold,
      url: staticFile("arrajel/fonts/AlmaraiExtraBold.ttf"),
    },
    {
      family: AlmaraiBold,
      url: staticFile("arrajel/fonts/AlmaraiBold.ttf"),
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

      {data.captions.src && (
        <SubtitleAnimation
          src={data.captions.src}
          fontFamily={AlmaraiBold}
        />
      )}

      {/* Title */}
      <Sequence from={0} durationInFrames={TITLE_ANIMATION_DURATION}>
        <TitleAnimation
          fontFamily={AlmaraiExtraBold}
          text={data.title.text}
        />
      </Sequence>

      {/* Location */}
      {data.tags.location && (
        <Sequence from={TITLE_ANIMATION_DURATION} durationInFrames={f(120)}>
          <LocationAnimation
            fontFamily={AlmaraiBold}
            text={data.tags.location}
          />
        </Sequence>
      )}

      {/* Date */}
      {data.tags.date && (
        <Sequence from={TITLE_ANIMATION_DURATION} durationInFrames={f(120)}>
          <DateAnimation
            fontFamily={AlmaraiBold}
            text={data.tags.date}
          />
        </Sequence>
      )}

      {/* Source */}
      {data.tags.source && (
        <Sequence from={TITLE_ANIMATION_DURATION} durationInFrames={SOURCE_ANIMATION_DURATION}>
          <SourceAnimation
            fontFamily={AlmaraiBold}
            source={data.tags.source}
          />
        </Sequence>
      )}

      {(data.locations ?? []).map((location, index) => (
        <Sequence
          from={(location.from ?? TITLE_ANIMATION_DURATION) * fps}
          durationInFrames={
            location.duration
              ? Math.round(location.duration * fps)
              : f(120)
          }
          key={`location-${index}`}
        >
          <LocationAnimation text={location.text} fontFamily={AlmaraiBold} />
        </Sequence>
      ))}

      {(data.dates ?? []).map((date, index) => (
        <Sequence
          from={(date.from ?? TITLE_ANIMATION_DURATION) * fps}
          durationInFrames={
            date.duration
              ? Math.round(date.duration * fps)
              : f(120)
          }
          key={`date-${index}`}
        >
          <DateAnimation text={date.text} fontFamily={AlmaraiBold} />
        </Sequence>
      ))}

      {(data.sources ?? []).map((source, index) => (
        <Sequence
          from={(source.from ?? TITLE_ANIMATION_DURATION) * fps}
          durationInFrames={
            source.duration
              ? Math.round(source.duration * fps)
              : f(120)
          }
          key={`source-${index}`}
        >
          <SourceAnimation source={source.text} fontFamily={AlmaraiBold} />
        </Sequence>
      ))}

      {/* Logo */}
      <Sequence from={0} durationInFrames={durationInFrames}>
        <LogoAnimation />
      </Sequence>
    </AbsoluteFill>
  );
}
