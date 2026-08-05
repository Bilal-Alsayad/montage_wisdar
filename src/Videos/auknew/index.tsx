import {
  AbsoluteFill,
  Sequence,
  OffthreadVideo,
  staticFile,
  Img,
  useVideoConfig,
} from "remotion";
import { SpeakerAnimation } from "./SpeakerAnimation";
import { TemplateProps } from "../types";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import Video from "../../Components/Video";
import Cover from "../../Components/Cover";
import AudioClips from "../../Components/AudioClips";
import Captions from "../../Components/Captions";

const BahijTheSansArabicBold = "BahijTheSansArabicBold";

const SPEAKER_ANIMATION_DURATION = 120;

export default function AukTemplate({
  outroStartFrame,
  outroDurationInFrames,
  data,
}: TemplateProps) {
  const { fps } = useVideoConfig();
  const fontsLoaded = useLoadFonts([
    {
      family: BahijTheSansArabicBold,
      url: `${staticFile("auknew/fonts/BahijTheSansArabicBold.ttf")}`,
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

      {/* Shadow */}
      {/* <Img
        src={staticFile("auknew/elements/Shadow.png")}
        style={{
          position: "absolute",
          left: 0,
          top: 860,
          width: 1080,
          height: 1160,
          zIndex: 2,
        }}
      /> */}

      {/* Logo */}
      <Img
        src={staticFile("auknew/elements/logo.png")}
        style={{
          position: "absolute",
          top: 235,
          left: 85,
          width: 180,
        }}
      />

      {/* Captions */}
      {data.captions.src && (
        <Captions
          src={data.captions.src}
          containerStyle={{
            top: 1450,
            direction: "rtl",
            backgroundColor: "#395793",
            padding: 5,
          }}
          textStyle={{
            fontSize: 50,
            fontFamily: BahijTheSansArabicBold,
            color: "#FFFFFF",
          }}
          subtitleSpeakers={data.subtitle_speakers}
          speakerStyles={{
            S1: {
              color: "#FFFFFF",
              backgroundColor: "#395793",
            },
            S2: {
              color: "#FFFFFF",
              backgroundColor: "#e69432",
            },
          }}
        />
      )}

      {/* Speaker */}
      {data.speakers.length > 0 &&
        data.speakers.map((speaker, index) => (
          <Sequence
            from={speaker.start * fps}
            durationInFrames={SPEAKER_ANIMATION_DURATION}
            key={index}
          >
            <SpeakerAnimation
              name={speaker.name}
              description={speaker.description}
              fontFamily={BahijTheSansArabicBold}
            />
          </Sequence>
        ))}

      {/* Outro */}
      <Sequence from={outroStartFrame} durationInFrames={outroDurationInFrames}>
        <OffthreadVideo
          src={staticFile("auknew/elements/outro.webm")}
          style={{ zIndex: 100 }}
          transparent
        />
      </Sequence>
    </AbsoluteFill>
  );
}
