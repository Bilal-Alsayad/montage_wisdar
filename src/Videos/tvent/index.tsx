import { AbsoluteFill, Sequence, staticFile, OffthreadVideo } from "remotion";
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
const HELVETICA = "HelveticaNeueBold" 
export default function IrsalTemplate({
  data,
  outroDurationInFrames = 0,
  outroStartFrame,
}: TemplateProps) {
  const fontsLoaded = useLoadFonts([
    {
      family: MONTSERRAT_BOLD,
      url: staticFile("tvent/fonts/MontserratBold.ttf"),
    },
    {
      family: HELVETICA,
      url: staticFile("tvent/fonts/HelveticaNeueBold.ttf"),
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

      <Sequence>
        <LogoAnimation />
      </Sequence>

      <Sequence durationInFrames={TITLE_ANIMATION_DURATION}>
        <TitleAnimation text={data.title.text} fontFamily={MONTSERRAT_BOLD} />
      </Sequence>

      <Sequence durationInFrames={TAGS_ANIMATION_DURATION}>
        <TagsAnimation
          source={data.tags.source}
          location={data.tags.location}
          date={data.tags.date}
          fontFamily={MONTSERRAT_BOLD}
        />
      </Sequence>

      {data.speakers && data.speakers.length > 0 && (
        <Sequence from={142} durationInFrames={SPEAKER_ANIMATION_DURATION}>
          <SpeakerAnimation
            name={data.speakers[0].name}
            description={data.speakers[0].description}
            fontFamily={MONTSERRAT_BOLD}
          />
        </Sequence>
      )}

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
          src={staticFile("tvent/elements/outro.mp4")}
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