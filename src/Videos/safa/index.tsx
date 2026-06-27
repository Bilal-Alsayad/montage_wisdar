import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import Video from "../../Components/Video";
import { TemplateProps } from "../types";
import Cover from "../../Components/Cover";
import AudioClips from "../../Components/AudioClips";
import Captions from "../../Components/Captions";
import { ImageSequence } from "../../Components/ImageSequence";
import TitleAnimation, { TITLE_ANIMATION_DURATION } from "./TitleAnimation";
import TagsAnimation, { TAGS_ANIMATION_DURATION } from "./TagsAnimation";
import SpeakerAnimation, { SPEAKER_ANIMATION_DURATION } from "./SpeakerAnimation";

const AlexandriaSemiBold = "Alexandria SemiBold";

export default function SafaTemplate({
  data,
  mainVideoDurationInFrames,
}: TemplateProps) {
  const { fps } = useVideoConfig();

  const fontFamily = useLoadFonts([
    {
      family: AlexandriaSemiBold,
      url: staticFile("safa/fonts/AlexandriaSemiBold.ttf"),
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

      {/* Cover */}
      {data.cover_src && <Cover coverSrc={data.cover_src} />}

      {/* Audio Clips */}
      {data.audio_clips && <AudioClips audioClips={data.audio_clips} />}

      {/* Captions */}
      {data.captions.src && (
        <AbsoluteFill>
          <Captions
            src={data.captions.src}
            containerStyle={{
              bottom: 750,
              direction: "ltr",
              backgroundColor: "#1b3f6d",
              padding: "10px",
            }}
            textStyle={{
              fontSize: 44,
              fontFamily: AlexandriaSemiBold,
              color: "#FFFFFF",
            }}
          />
        </AbsoluteFill>
      )}

      {/* Title */}
      <Sequence from={0} durationInFrames={TITLE_ANIMATION_DURATION}>
        <TitleAnimation text={data.title.text} fontFamily={AlexandriaSemiBold} />
      </Sequence>

      {/* Tags */}
      <Sequence from={TITLE_ANIMATION_DURATION} durationInFrames={TAGS_ANIMATION_DURATION}>
        <TagsAnimation
          date={data.tags.date}
          location={data.tags.location}
          fontFamily={AlexandriaSemiBold}
        />
      </Sequence>

      {/* Speakers */}
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
              fontFamily={AlexandriaSemiBold}
            />
          </Sequence>
        ))}

      {data.private_source && (
        <Sequence from={0} durationInFrames={mainVideoDurationInFrames}>
          <ImageSequence
            folderPath={`${staticFile("safa/elements/special")}`}
            activeFrames={30}
            totalSequenceFrames={60}
            style={{ position: "absolute" }}
          />
        </Sequence>
      )}

      {/* Logo */}
      <ImageSequence
        folderPath={`${staticFile("safa/elements/logo")}`}
        activeFrames={30}
        totalSequenceFrames={80}
        style={{ position: "absolute" }}
      />
    </AbsoluteFill>
  );
}
