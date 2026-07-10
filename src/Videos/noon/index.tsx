import {
  AbsoluteFill,
  Freeze,
  Sequence,
  Img,
  OffthreadVideo,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import { TitleAnimation, TITLE_ANIMATION_DURATION } from "./TitleAnimation";
import {
  SpeakerAnimation,
  SPEAKER_ANIMATION_DURATION,
} from "./SpeakerAnimation";
import Tag from "../../Components/Tag";
import { Audio } from "@remotion/media";
import Captions from "../../Components/Captions";
import { TemplateProps } from "../types";
import { splitTitle } from "../../utils/textUtils";
import Video from "../../Components/Video";
import Cover from "../../Components/Cover";
import AudioClips from "../../Components/AudioClips";

const omniaBold = "itf Omnia Naskh";
const omniaMedium = "itf Omnia Naskh Med";
const plexBold = "IBM Plex Sans Arabic Bold";
const plexSemiBold = "IBM Plex Sans Arabic SemiBold";

const TAGS_ANIMATION_DURATION = 180;

export default function NoonTemplate({
  outroStartFrame = 0,
  outroDurationInFrames,
  data,
  mainVideoDurationInFrames = 1
}: TemplateProps) {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // Calculate total video duration from sequences
  const totalVideoDuration = Math.round(
    data.sequences.reduce(
      (acc: number, seq: { start: number; end: number }) =>
        acc + (seq.end - seq.start) * fps,
      0,
    ),
  );
  const isVideoEnded = frame >= mainVideoDurationInFrames;
  const freezeFrame = totalVideoDuration - 1;
  
  const { text1, text2 } = splitTitle(data.title.text);
  const fontsLoaded = useLoadFonts([
    {
      family: omniaBold,
      url: staticFile("noon/fonts/itfOmniaNaskhBold.otf"),
    },
    {
      family: omniaMedium,
      url: staticFile("noon/fonts/itfOmniaNaskhMedium.otf"),
    },
    {
      family: plexSemiBold,
      url: staticFile("noon/fonts/IBMPlexSansArabicSemiBold.ttf"),
    },
    {
      family: plexBold,
      url: staticFile("noon/fonts/IBMPlexSansArabicBold.ttf"),
    },
  ]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AbsoluteFill>
      <Freeze frame={freezeFrame} active={isVideoEnded}>
        <Video
          sequences={data.sequences}
          scaleToFit={data.scale_to_fit}
          backgroundUrl={data.background_img_url}
        />
      </Freeze>

      {data.cover_src && <Cover coverSrc={data.cover_src} />}

      {/* Audio Clips */}
      {data.audio_clips && <AudioClips audioClips={data.audio_clips} />}

      {data.captions.src && (
        <Captions
          src={data.captions.src}
          containerStyle={{
            top: 1320,
            padding: "14px",
            backgroundColor: "rgba(17, 46, 62, 0.7)",
            borderRadius: 12,
          }}
          textStyle={{
            fontSize: 50,
            fontFamily: plexBold,
            color: "#FFFFFF",
            lineHeight: 1.4,
          }}
        />
      )}

      <Sequence from={outroStartFrame} durationInFrames={outroDurationInFrames}>
        <OffthreadVideo
          src={staticFile("noon/elements/outro.webm")}
          style={{ zIndex: 100 }}
          transparent
        />
      </Sequence>

      <Sequence from={0} durationInFrames={TITLE_ANIMATION_DURATION}>
        <TitleAnimation fontFamily={omniaBold} text1={text1} text2={text2} />
      </Sequence>

      {(data.tags.location || data.tags.date) && (
        <Sequence
          from={TITLE_ANIMATION_DURATION}
          durationInFrames={TAGS_ANIMATION_DURATION}
          style={{ zIndex: 100 }}
        >
          {data.tags.location && (
            <Tag
              text={data.tags.location}
              startFrame={0}
              x={972}
              y={285}
              iconSrc={staticFile("noon/icons/location.png")}
              backgroundColor="#FFD146"
              textColor="#0E2B39"
              fontSize={19}
              fontFamily={plexSemiBold}
            />
          )}
          {data.tags.date && (
            <Tag
              text={data.tags.date}
              startFrame={0}
              x={972}
              y={335}
              iconSrc={staticFile("noon/icons/calendar.png")}
              backgroundColor="#FFD146"
              textColor="#0E2B39"
              fontSize={19}
              fontFamily={plexSemiBold}
            />
          )}
          <Audio src={staticFile("noon/sounds/glitch_small.mp3")} />
        </Sequence>
      )}
      {data.tags.source && (
        <Sequence
          from={2 * TITLE_ANIMATION_DURATION}
          durationInFrames={TAGS_ANIMATION_DURATION}
        >
          <Tag
            text={data.tags.source}
            startFrame={0}
            x={972}
            y={285}
            iconSrc={staticFile("noon/icons/video.png")}
            iconWidth={29}
            iconHeight={21}
            backgroundColor="#FFD146"
            textColor="#0E2B39"
            fontSize={19}
            fontFamily={plexSemiBold}
          />
          <Audio src={staticFile("noon/sounds/glitch_small.mp3")} />
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
              fontBoldFamily={omniaBold}
              fontMediumFamily={omniaMedium}
              nameText={speaker.name}
              descriptionText={speaker.description}
            />
          </Sequence>
        ))}

      <Img
        src={staticFile("noon/elements/Fade.png")}
        style={{ position: "absolute" }}
      />

      <Img
        src={staticFile("noon/elements/noon_logo2.png")}
        width={150}
        height={150}
        style={{ position: "absolute", top: 268, left: 99 }}
      />

      <Img src={staticFile("noon/elements/BG.png")} />
    </AbsoluteFill>
  );
}
