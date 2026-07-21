import { AbsoluteFill, Sequence, staticFile, OffthreadVideo, useVideoConfig } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import { TemplateProps } from "../types";
import Video from "../../Components/Video";
import AudioClips from "../../Components/AudioClips";
import Cover from "../../Components/Cover";
import LogoAnimation from "./LogoAnimation";
import Captions from "../../Components/Captions";
import TitleAnimation, { TITLE_ANIMATION_DURATION } from "./TitleAnimation";
import TagsAnimation, { TAGS_ANIMATION_DURATION } from "./TagsAnimation";
import SpeakerAnimation, { SPEAKER_ANIMATION_DURATION } from "./SpeakerAnimation";

const MONTSERRAT_BOLD = "MontserratBold";
const HELVETICA = "HelveticaNeueBold";

export default function TventTemplate({
  data,
  outroDurationInFrames = 0,
  outroStartFrame,
  mainVideoDurationInFrames,
}: TemplateProps) {
  const { fps } = useVideoConfig();
  const fontsLoaded = useLoadFonts([
    {
      family: MONTSERRAT_BOLD,
      url: staticFile("tvnet/fonts/MontserratBold.ttf"),
    },
    {
      family: HELVETICA,
      url: staticFile("tvnet/fonts/HelveticaNeueBold.ttf"),
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

      {data.cover_src && <Cover coverSrc={data.cover_src} />}

      {data.audio_clips && <AudioClips audioClips={data.audio_clips} />}

      <Sequence from={0} durationInFrames={mainVideoDurationInFrames}>
        <LogoAnimation />
      </Sequence>

      <Sequence from={0} durationInFrames={TITLE_ANIMATION_DURATION}>
        <TitleAnimation text={data.title.text} fontFamily={MONTSERRAT_BOLD} />
      </Sequence>

      <Sequence from={0} durationInFrames={TAGS_ANIMATION_DURATION}>
        <TagsAnimation
          source={data.tags.source}
          location={data.tags.location}
          date={data.tags.date}
          fontFamily={MONTSERRAT_BOLD}
        />
      </Sequence>

      {data.speakers.length > 0 &&
        data.speakers.map((speaker, index) => (
          <Sequence
            key={index}
            from={speaker.start * fps}
            durationInFrames={SPEAKER_ANIMATION_DURATION}
          >
            <SpeakerAnimation
              fontFamily={MONTSERRAT_BOLD}
              name={speaker.name}
              description={speaker.description}
            />
          </Sequence>
        ))}

      {data.captions.src && (
        <Captions
          src={data.captions.src}
          containerStyle={{
            position: "absolute",
            backgroundColor: "#000000",
            padding: "16px",
            bottom: 140,
          }}
          textStyle={{
            fontSize: 50,
            color: "#ffffff",
            fontFamily: HELVETICA,
          }}
        />
      )}

      <Sequence from={outroStartFrame} durationInFrames={outroDurationInFrames}>
        <OffthreadVideo
          src={staticFile("tvnet/elements/outro.mp4")}
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