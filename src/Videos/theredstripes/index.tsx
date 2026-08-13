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


const QUIET_SANS_SEMIBOLD = "QuietSansSemiBold";

export default function TheredstripesTemplate({
  data,
}: TemplateProps) {

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

      <Img
        src={staticFile("theredstripes/images/logo.png")}
        style={{ position: "absolute", top: 220, left: 855,width: 100}}
      />

      {/* Captions */}
      {data.captions.src && (
        <Captions
          src={data.captions.src}
          containerStyle={{
            top: 900,
            backgroundColor: "rgba(255, 0, 0, 0.83)",
            borderRadius: 3,
            padding: "8PX",
            
          }}
          textStyle={{
            color: "#ffffff",
            textShadow: "8.5px 8.5px 6px rgba(0, 0, 0, 1)",
            fontFamily: QUIET_SANS_SEMIBOLD,
            fontSize: 60,
          }}
        />
      )}

      {/* Title */}
      <Sequence from={0} durationInFrames={TITLE_ANIMATION_DURATION}>
        <TitleAnimation
          text={data.title.text}
          fontFamily={QUIET_SANS_SEMIBOLD}
        />
      </Sequence>

      {/* Logo */}
      <Sequence from={0} durationInFrames={164}>
        <OffthreadVideo
          src={staticFile("theredstripes/elements/banner.webm")}
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
