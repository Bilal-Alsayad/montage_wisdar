import {
  AbsoluteFill,
  Sequence,
  staticFile,
  Img,
  OffthreadVideo,
  Loop,
} from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import Captions from "../../Components/Captions";
import { TemplateProps } from "../types";
import Video from "../../Components/Video";
import AudioClips from "../../Components/AudioClips";
import Cover from "../../Components/Cover";
import TagsAnimation from "./TagsAnimation";
import TitleAnimation, { TITLE_ANIMATION_DURATION } from "./TitleAnimation";

const LATO_BOLD = "Lato-Bold";
const LATO_MEDIUM = "Lato-Medium";

export default function QudsTemplate({
  data,
  outroDurationInFrames = 0,
  outroStartFrame,
}: TemplateProps) {
  const fontsLoaded = useLoadFonts([
    {
      family: LATO_BOLD,
      url: staticFile("quds/fonts/LatoBold.ttf"),
    },
    {
      family: LATO_MEDIUM,
      url: staticFile("quds/fonts/LatoMedium.ttf"),
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

      <Img
        src={staticFile("quds/elements/logo.png")}
        style={{
          position: "absolute",
          left: 800,
          top: 185,
        }}
      />

      <Img
        src={staticFile("quds/elements/texture.png")}
        style={{
          position: "absolute",
          bottom: 0,
        }}
      />

      <Loop durationInFrames={914}>
        <OffthreadVideo
          src={staticFile("quds/elements/texture.webm")}
          muted
          transparent
          style={{
            position: "absolute",
            bottom: 0,
          }}
        />
      </Loop>

      <Sequence from={0} durationInFrames={TITLE_ANIMATION_DURATION}>
        <TitleAnimation text={data.title.text} fontFamily={LATO_BOLD} />
      </Sequence>

      <Sequence from={152}>
        {data.tags?.source && (
          <TagsAnimation text={data.tags.source} fontFamily={LATO_BOLD} />
        )}
      </Sequence>

      {data.captions.src && (
        <Captions
          src={data.captions.src}
          containerStyle={{
            position: "absolute",
            top: 1200,
            maxWidth: "85%",
          }}
          textStyle={{
            fontSize: 48,
            color: "#FFFFFF",
            fontFamily: LATO_MEDIUM,
          }}
        />
      )}

      <Sequence from={outroStartFrame} durationInFrames={outroDurationInFrames}>
        <OffthreadVideo
          src={staticFile("quds/elements/outro.webm")}
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
