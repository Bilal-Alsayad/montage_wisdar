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
import LocationTagAnimation from "./TagsAnimation";
import PalCaptions from "./PalCaptions";
import SocialMediaAnimation, {
  PAL_SOCIAL_MEDIA_DURATION,
} from "./SocialMediaAnimation";
import SourceAnimation from "./SourceAnimation";
import SpeakerCard, { PAL_SPEAKER_CARD_DURATION } from "./SpeakerCard";
import Cover from "../../Components/Cover";
import AudioClips from "../../Components/AudioClips";

const TAG_ANIMATIONS = [
  { key: "location", icon: "location", from: 220, duration: 142 },
  { key: "date", icon: "date", from: 369, duration: 143 },
] as const;

const PAL_ALEF = "Alef";
const PAL_RUBIK = "Rubik";
const PAL_DIN_ALTERNATE_BOLD = "DINAlternate Bold";
const PAL_CAPTIONS_SOURCE = "subtitle_translated_4362.srt";
const PAL_DEFAULT_VIDEO_SEQUENCE = {
  start: 0,
  end: 20,
  crop: {
    top_left: [0, 0] as [number, number],
    bottom_right: [0, 0] as [number, number],
  },
  volume: 1,
  videoSrc: staticFile("Sequence05_1.mp4"),
  blur: [],
};

type SpeakerWithOptionalEnd = TemplateProps["data"]["speakers"][number] & {
  end?: number;
};

const getSpeakerDuration = (speaker: SpeakerWithOptionalEnd, fps: number) => {
  if (speaker.end && speaker.end > speaker.start) {
    return Math.round((speaker.end - speaker.start) * fps);
  }

  return PAL_SPEAKER_CARD_DURATION;
};

export default function PalNewTemplate({ data }: TemplateProps) {
  const { fps } = useVideoConfig();

  const fontsLoaded = useLoadFonts([
    {
      family: PAL_ALEF,
      url: staticFile("pal/fonts/Alef-Regular.ttf"),
      weight: "400",
      style: "normal",
    },
    {
      family: PAL_RUBIK,
      url: staticFile("pal/fonts/Rubik-Regular.ttf"),
      weight: "400",
      style: "normal",
    },
    {
      family: PAL_DIN_ALTERNATE_BOLD,
      url: staticFile("pal/fonts/DINAlternate-Bold.ttf"),
      weight: "700",
      style: "normal",
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
        sequences={
          data.sequences.length > 0
            ? data.sequences
            : [PAL_DEFAULT_VIDEO_SEQUENCE]
        }
        scaleToFit={data.scale_to_fit}
        backgroundUrl={data.background_img_url}
      />

      {data.cover_src && <Cover coverSrc={data.cover_src} />}

      {data.audio_clips && <AudioClips audioClips={data.audio_clips} />}

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

      <Sequence durationInFrames={PAL_SOCIAL_MEDIA_DURATION}>
        <SocialMediaAnimation fontFamily={PAL_RUBIK} />
      </Sequence>

      {data.tags.source ? (
        <Sequence durationInFrames={189}>
          <SourceAnimation text={data.tags.source} fontFamily={PAL_RUBIK} />
        </Sequence>
      ) : null}

      {TAG_ANIMATIONS.map(({ key, icon, from, duration }) => {
        const text = data.tags[key];

        return text ? (
          <Sequence key={key} from={from} durationInFrames={duration}>
            <LocationTagAnimation
              text={text}
              icon={icon}
              durationInFrames={duration}
              rectX={775}
              rectY={261}
              squareStartX={771}
              squareStartY={278}
              fontFamily={PAL_RUBIK}
            />
          </Sequence>
        ) : null;
      })}

      {data.speakers.map((speaker, index) => {
        return (
          <Sequence
            key={`${speaker.name}-${speaker.start}-${index}`}
            from={Math.round(speaker.start * fps)}
            durationInFrames={getSpeakerDuration(speaker, fps)}
          >
            <SpeakerCard
              name={speaker.name}
              description={speaker.description ?? ""}
              fontFamily={PAL_RUBIK}
            />
          </Sequence>
        );
      })}
      <PalCaptions
        src={data.captions.src || staticFile(PAL_CAPTIONS_SOURCE)}
        fontFamily={PAL_DIN_ALTERNATE_BOLD}
      />
    </AbsoluteFill>
  );
}
