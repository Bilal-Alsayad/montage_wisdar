import { AbsoluteFill, Sequence, staticFile, Img, OffthreadVideo, Loop } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import { TemplateProps } from "../types";
import Video from "../../Components/Video";
import AudioClips from "../../Components/AudioClips";
import Cover from "../../Components/Cover";
import Captions from "../../Components/Captions";
import TitleAnimation, { TITLE_ANIMATION_DURATION } from "./TitleAnimation";
import SourceAnimation, { SOURCE_ANIMATION_DURATION } from "./SourceAnimation";

const LATO_MEDIUM = "LatoMedium"; 
const LATO_BOLD = "LatoBold"; 

export default function ThetimesofpalestineTemplate({
  data,
  outroDurationInFrames = 0,
  outroStartFrame,
}: TemplateProps) {
  const fontsLoaded = useLoadFonts([
    {
      family: LATO_MEDIUM,
      url: staticFile("thetimesofpalestine/fonts/LatoMedium.ttf"),
    },
    {
      family: LATO_BOLD,
      url: staticFile("thetimesofpalestine/fonts/LatoBold.ttf"),
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
        src={staticFile("thetimesofpalestine/images/logo.png")}
        style={{
          position: "absolute",
          left: 360,
          top: -415,
        }}
      />

      <Sequence from={TITLE_ANIMATION_DURATION} durationInFrames={SOURCE_ANIMATION_DURATION}>
        <SourceAnimation text={data.tags.source} fontFamily={LATO_BOLD} />
      </Sequence>

      <Loop durationInFrames={914}>
        <OffthreadVideo
          src={staticFile("thetimesofpalestine/elements/texture.webm")}
          muted
          transparent
          style={{
            position: "absolute",
            bottom: 0,
          }}
        />
      </Loop>

      <Sequence durationInFrames={TITLE_ANIMATION_DURATION}>
        <TitleAnimation text={data.title.text} fontFamily={LATO_BOLD} />
      </Sequence>

      {data.captions.src && (
        <Captions
          src={data.captions.src}
          containerStyle={{
            position: "absolute",
            top: 1200,
          }}
          textStyle={{
            fontSize: 48,
            color: "#ffffff",
            fontFamily: LATO_MEDIUM,
          }}
        />
      )}

      <Sequence from={outroStartFrame} durationInFrames={outroDurationInFrames}>
        <OffthreadVideo
          src={staticFile("thetimesofpalestine/elements/outro.mp4")}
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