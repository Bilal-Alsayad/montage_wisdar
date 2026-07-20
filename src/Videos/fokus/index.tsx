/* eslint-disable @remotion/from-0 */
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  staticFile,
  Loop,
  useVideoConfig,
} from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import Video from "../../Components/Video";
import Captions from "../../Components/Captions";
import { TemplateProps } from "../types";
import AudioClips from "../../Components/AudioClips";
import Cover from "../../Components/Cover";
import TitleAnimation, { TITLE_ANIMATION_DURATION } from "./TitleAnimation";
import SpeakerAnimation, { SPEAKER_ANIMATION_DURATION } from "./SpeakerAnimation";

const QUIET_SANS_SEMIBOLD = "QuietSansSemiBold"

export default function FokusTemplate({
  data,
  outroDurationInFrames = 0,
  outroStartFrame,
}: TemplateProps) {
  const { fps } = useVideoConfig();
  
  const { durationInFrames } = useVideoConfig();

  const fontsLoaded = useLoadFonts([
    {
      family: QUIET_SANS_SEMIBOLD,
      url: staticFile("fokus/fonts/QuietSansSemiBold.otf"),
    },
  ]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AbsoluteFill>
      <Video
        sequences={data.sequences}
        scaleToFit={data.scale_to_fit}
        backgroundUrl={data.background_img_url}
      />

      {/* Cover */}
      {data.cover_src && <Cover coverSrc={data.cover_src} />}

      {/* Audio Clips */}
      {data.audio_clips && <AudioClips audioClips={data.audio_clips} />}

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
              fontFamily={QUIET_SANS_SEMIBOLD}
            />
          </Sequence>
        ))}
        
      {data.captions.src && (
        <Captions
          src={data.captions.src}
          containerStyle={{
            top: 1300,
            backgroundColor: "#000000",
            padding: "8PX",
          }}
          textStyle={{
            color: "#ffffff",
            fontFamily: QUIET_SANS_SEMIBOLD,
            fontSize: 60,
          }}
        />
      )}
      <Sequence from={0} durationInFrames={TITLE_ANIMATION_DURATION}>
        <TitleAnimation
          text={data.title.text}
          fontFamily={QUIET_SANS_SEMIBOLD}
        />
      </Sequence>
      <Loop durationInFrames={3600}>
        <Sequence
          from={0}
          durationInFrames={durationInFrames}
        >
          <OffthreadVideo
            src={staticFile("fokus/elements/logo.webm")}
            transparent
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Sequence>
      </Loop>

      <Sequence from={outroStartFrame} durationInFrames={outroDurationInFrames}>
        <OffthreadVideo
          src={staticFile("fokus/elements/outro.mp4")}
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
