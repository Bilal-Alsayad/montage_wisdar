/* eslint-disable @remotion/from-0 */
import {
  AbsoluteFill,
  Sequence,
  staticFile,
  Img
} from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import Video from "../../Components/Video";
import { TemplateProps } from "../types";
import AudioClips from "../../Components/AudioClips";
import Cover from "../../Components/Cover";
import TitleAnimation, { TITLE_ANIMATION_DURATION } from "./TitleAnimation";
import SourceAnimation from "./SourceAnimation";
import Captions from "../../Components/Captions";

const ARIAL_BOLD = "ArialBold"
const HEADLINE_BOLD ="HeadlineBold"
export default function AlqastalTemplate({
  data,
}: TemplateProps) {

  const fontsLoaded = useLoadFonts([
    {
      family:ARIAL_BOLD ,
      url: staticFile("alqastal/fonts/ArialBold.ttf"),
    },
        {
      family: HEADLINE_BOLD,
      url: staticFile("alqastal/fonts/Headline Bold.ttf"),
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
      <Img
        src={staticFile("alqastal/images/logo.png")}
        style={{
          position: "absolute",
          top: 545,
          left: 715,
          width: 300,
        }}
      />

      <Img
        src={staticFile("alqastal/images/gradiant.png")}
        style={{
          position: "absolute",
          bottom: 0,
        }}
      />
      <SourceAnimation text={data.tags.source} fontFamily={HEADLINE_BOLD} />

      <Sequence from={0} durationInFrames={TITLE_ANIMATION_DURATION}>
        <TitleAnimation text={data.title.text} fontFamily={HEADLINE_BOLD} />
      </Sequence>
      {data.captions.src && (
        <Captions
          src={data.captions.src}
          containerStyle={{
            top: 1380,
            backgroundColor: "rgba(6, 6, 6, 0.54)",
            textShadow: "0 0 50px 11.3px rgba(0, 0, 0, 0.52)",
            padding: "10px",
          }}
          textStyle={{
            color: "#fff",
            fontFamily: HEADLINE_BOLD,

            fontSize: 45,
          }}
        />
      )}
    </AbsoluteFill>
  );
}
