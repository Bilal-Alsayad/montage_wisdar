/* eslint-disable @remotion/from-0 */
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  staticFile,
  Img,
} from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import Video from "../../Components/Video";
import Captions from "../../Components/Captions";
import { TemplateProps } from "../types";
import AudioClips from "../../Components/AudioClips";
import Cover from "../../Components/Cover";
import TitleAnimation, { TITLE_ANIMATION_DURATION } from "./TitleAnimation";
import TagsAnimation, { TAGS_ANIMATION_DURATION } from "./TagsAnimation";
import SourceAnimation, { SOURCE_ANIMATION_DURATION } from "./SourceAnimation";
import SpeakerAnimation, { SPEAKER_ANIMATION_DURATION } from "./SpeakerAnimation";

const ALARABY_TELEVISION_BOLD = "AlarabyTelevisionBold"

export default function AlarabyfrTemplate({
  data,
  outroDurationInFrames = 0,
  outroStartFrame,
}: TemplateProps) {
  // const { fps } = useVideoConfig();

  const fontsLoaded = useLoadFonts([
    {
      family: ALARABY_TELEVISION_BOLD,
      url: staticFile("alarabyfr/fonts/AlarabyTelevisionBold.ttf"),
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
      {/* <Img
        src={staticFile("alaraby/images/gradient.png")}
        style={{
          position: "absolute",
          bottom: 0,
        }}
      /> */}
      {data.speakers.length > 0 &&
        data.speakers.map((speaker, index) => (
          <Sequence
            from={SOURCE_ANIMATION_DURATION + TITLE_ANIMATION_DURATION}
            key={index}
            durationInFrames={SPEAKER_ANIMATION_DURATION}
          >
            <SpeakerAnimation
              name={speaker.name}
              description={speaker.description}
              fontFamily={ALARABY_TELEVISION_BOLD}
            />
          </Sequence>
        ))}

      <Sequence from={0} durationInFrames={TITLE_ANIMATION_DURATION}>
        <TitleAnimation
          text={data.title.text}
          fontFamily={ALARABY_TELEVISION_BOLD}
        />
      </Sequence>

      <Sequence
        from={TITLE_ANIMATION_DURATION}
        durationInFrames={TAGS_ANIMATION_DURATION}
      >
        <TagsAnimation
          location={data.tags.location ?? ""}
          date={data.tags.date ?? ""}
          fontFamily={ALARABY_TELEVISION_BOLD}
        />
      </Sequence>

      <Sequence
        from={TITLE_ANIMATION_DURATION}
        durationInFrames={SOURCE_ANIMATION_DURATION}
      >
        <SourceAnimation
          text={data.tags.source ?? ""}
          fontFamily={ALARABY_TELEVISION_BOLD}
        />
      </Sequence>

      <Img
        src={staticFile("alarabyfr/images/logo.png")}
        style={{
          position: "absolute",
          top: 180,
          left: 810,
          width: 160,
        }}
      />

      {data.captions.src && (
        <Captions
          src={data.captions.src}
          containerStyle={{
            top: 1300,
            backgroundColor: "rgba(35,48,149,0.54)",
            textShadow: "0 0 50px 11.3px rgba(0, 0, 0, 0.52)",
            padding: "10px",
          }}
          textStyle={{
            color: "#bcbcbc",
            fontFamily: ALARABY_TELEVISION_BOLD,

            fontSize: 55,
          }}
        />
      )}

      <Sequence from={outroStartFrame} durationInFrames={outroDurationInFrames}>
        <OffthreadVideo
          src={staticFile("alarabyfr/elements/outro.webm")}
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
