import { AbsoluteFill, Sequence, Img, staticFile, OffthreadVideo } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import { TemplateProps } from "../types";
import Video from "../../Components/Video";
import AudioClips from "../../Components/AudioClips";
import Cover from "../../Components/Cover";
import TitleAnimation from "./TitleAnimation";
import LogoAnimation from "./LogoAnimation";
// import Captions from "../../Components/Captions";

const SWISSRA_CONDENSED_HEAVY = "SwissraCondensedHeavy";

export default function IrsalTemplate({
  data,
  outroDurationInFrames = 0,
  outroStartFrame,
}: TemplateProps) {
  const fontsLoaded = useLoadFonts([
    {
      family: SWISSRA_CONDENSED_HEAVY,
      url: staticFile("irsal/fonts/SwissraCondensedHeavy.otf"),
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
        src={staticFile("irsal/images/gradiant.png")}
        style={{
          position: "absolute",
          bottom: 0,
        }}
      />

      <Sequence durationInFrames={150}>
        <TitleAnimation
          text={data.title.text}
          fontFamily={SWISSRA_CONDENSED_HEAVY}
        />
      </Sequence>

      <Sequence durationInFrames={300}>
        <LogoAnimation />
      </Sequence>

      {/* {data.captions.src && (
        <Captions
          src={data.captions.src}
          containerStyle={{
            position: "absolute",
            bottom:200,
          }}
          textStyle={{
            fontSize: 48,
            textShadow: "0px 3px 6px rgba(0, 0, 0, 0.17)",
            color: "#000000",
            fontFamily: SWISSRA_CONDENSED_HEAVY,
          }}
        />
      )} */}

      <Sequence from={outroStartFrame} durationInFrames={outroDurationInFrames}>
        <OffthreadVideo
          src={staticFile("irsal/elements/outro.mp4")}
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