import { AbsoluteFill, Img, Sequence, staticFile } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import Video from "../../Components/Video";
import { TemplateProps } from "../types";
import Cover from "../../Components/Cover";
import AudioClips from "../../Components/AudioClips";
import Captions from "../../Components/Captions";
import { Video as RemotionVideo } from "@remotion/media";
import TitleAnimation, { TITLE_ANIMATION_DURATION } from "./TitleAnimtion";
import { SourceAnimation, SOURCE_ANIMATION_DURATION } from "./SourceAnimation";
import TagsAnimation, { TAGS_ANIMATION_DURATION } from "./TagsAnimation";
import { SpeakerAnimation } from "./SpeakerAnimation";
import { TimelineAnimation } from "./TimelineAnimation";
import { useVideoConfig } from "remotion";

const SudanPlusBold = "Sudan Plus Bold";
export default function SudanTemplate({ data }: TemplateProps) {
  const { fps } = useVideoConfig();
  const fontFamily = useLoadFonts([
    {
      family: SudanPlusBold,
      url: staticFile("sudan/fonts/SudanPlusBold.otf"),
    },
  ]);

  if (!fontFamily) return null;

  return (
    <AbsoluteFill>
      {/* Video */}
      <Video
        sequences={data.sequences}
        scaleToFit={data.scale_to_fit}
        backgroundUrl={data.background_img_url}
      />

      {/* Logo */}
      <RemotionVideo
        src={staticFile("sudan/elements/logo.webm")}
        loop
        style={{ mixBlendMode: "multiply" }}
      />
      <Img
        src={staticFile("sudan/elements/logo.png")}
        style={{
          position: "absolute",
          left: 405,
          bottom: 755,
          scale: 0.3,
        }}
      />
      {/* Cover */}
      {data.cover_src && <Cover coverSrc={data.cover_src} />}

      {/* Audio Clips */}
      {data.audio_clips && <AudioClips audioClips={data.audio_clips} />}

      {/* Captions */}
      {data.captions.src && (
        <AbsoluteFill
          style={{
            width: "970px",
            height: "100%",
            left: 0,
            right: 0,
            margin: "0 auto",
          }}
        >
          <Captions
            src={data.captions.src}
            containerStyle={{
              top: 700,
              direction: "ltr",
              backgroundColor: "#007675",
              padding: "0 5px"
            }}
            textStyle={{
              fontSize: 40,
              fontFamily: SudanPlusBold,
              color: "#F0FFFF",
            }}
          />
        </AbsoluteFill>
      )}

      {/* Title Animation */}
      <Sequence from={60} durationInFrames={TITLE_ANIMATION_DURATION}>
        <TitleAnimation text={data.title.text} fontFamily={SudanPlusBold} />
      </Sequence>

      {/* Date Animation */}
      <Sequence
        from={60 + TITLE_ANIMATION_DURATION}
        durationInFrames={TAGS_ANIMATION_DURATION}
      >
        <TagsAnimation
          date={data.tags.date}
          location={data.tags.location}
          fontFamily={SudanPlusBold}
        />
      </Sequence>

      {/* Source Animation */}
      <Sequence
        from={60 + TITLE_ANIMATION_DURATION + TAGS_ANIMATION_DURATION}
        durationInFrames={SOURCE_ANIMATION_DURATION}
      >
        <SourceAnimation source={data.tags.source} fontFamily={SudanPlusBold} />
      </Sequence>

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
              fontFamily={SudanPlusBold}
            />
          </Sequence>
        ))}

      {/* Timeline */}
      <TimelineAnimation />
    </AbsoluteFill>
  );
}
