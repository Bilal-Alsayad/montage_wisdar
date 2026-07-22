/* eslint-disable @remotion/from-0 */
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  staticFile,
  useVideoConfig,
  Loop,
} from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import Video from "../../Components/Video";
import Captions from "../../Components/Captions";
import { TemplateProps } from "../types";
import AudioClips from "../../Components/AudioClips";
import Cover from "../../Components/Cover";
import SpeakerAnimation, { SPEAKER_ANIMATION_DURATION } from "./SpeakerAnimation";
import TagsAnimation, { TAGS_ANIMATION_DURATION } from "./TagsAnimation";
import TitleAnimation, { TITLE_ANIMATION_DURATION } from "./TitleAnimation";

const ALMARAI_BOLD = "Almarai-Bold"
const ALMARAI_EXTRA_BOLD = "Almarai_ExtraBold";

export default function TurkpressTemplate({
  data,
  outroDurationInFrames = 0,
  outroStartFrame,
}: TemplateProps) {
  const { durationInFrames } = useVideoConfig();

  const fontsLoaded = useLoadFonts([
    {
      family: ALMARAI_BOLD,
      url: staticFile("turkpress/fonts/Almarai-Bold.ttf"),
    },
    {
      family: ALMARAI_EXTRA_BOLD,
      url: staticFile("turkpress/fonts/Almarai-ExtraBold.ttf"),
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

      <Loop durationInFrames={3600}>
        <Sequence from={0} durationInFrames={durationInFrames}>
          <OffthreadVideo
            src={staticFile("turkpress/elements/logo.webm")}
            transparent
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Sequence>
      </Loop>
      {data.speakers.length > 0 &&
        data.speakers.map((speaker, index) => (
          <Sequence
            from={144}
            key={index}
            durationInFrames={SPEAKER_ANIMATION_DURATION}
          >
            <SpeakerAnimation
              name={speaker.name}
              description={speaker.description}
              fontFamily={ALMARAI_EXTRA_BOLD}
            />
          </Sequence>
        ))}

      <Sequence from={144} durationInFrames={TAGS_ANIMATION_DURATION}>
        <TagsAnimation
          location={data.tags.location ?? ""}
          date={data.tags.date ?? ""}
          source={data.tags.source ?? ""}
          fontFamily={ALMARAI_EXTRA_BOLD}
        />
      </Sequence>
      <Sequence from={0} durationInFrames={TITLE_ANIMATION_DURATION}>
        <TitleAnimation
          text={data.title.text}
          fontFamily={ALMARAI_BOLD}
        />
      </Sequence>
      {data.captions.src && (
        <Captions
          src={data.captions.src}
          containerStyle={{
            top: 1350,
            backgroundColor: "#FAE6D7",
            padding: "10px",
          }}
          textStyle={{
            color: "#AD202B",
            fontFamily: ALMARAI_BOLD,

            fontSize: 35,
          }}
        />
      )}

      <Sequence from={outroStartFrame} durationInFrames={outroDurationInFrames}>
        <OffthreadVideo
          src={staticFile("turkpress/elements/outro.webm")}
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
