import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { TitleAnimation } from "./TitleAnimation";
import { LogoAnimation } from "./LogoAnimation";
import { TemplateProps } from "../types";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import Video from "../../Components/Video";
import Captions from "../../Components/Captions";
import AudioClips from "../../Components/AudioClips";
import Cover from "../../Components/Cover";

const FrutigerLTArabic75Black = "FrutigerLTArabic75Black";

export default function TrackingTemplate({
  data,
  mainVideoDurationInFrames,
}: TemplateProps) {
  const fontsLoaded = useLoadFonts([
    {
      family: FrutigerLTArabic75Black,
      url: `${staticFile("tracking/fonts/frutigerltarabic75black.ttf")}`,
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

      {/* Captions */}
      {data.captions.src && (
        <AbsoluteFill>
          <Captions
            src={data.captions.src}
            containerStyle={{
              top: 1100,
              direction: "ltr",
              maxWidth: "80%",
            }}
            textStyle={{
              fontSize: 40,
              fontFamily: FrutigerLTArabic75Black,
              color: "#FFFFFF",
            }}
          />
        </AbsoluteFill>
      )}

      {/* Logo + Shadow */}
      <LogoAnimation />

      {/* Title */}
      <Sequence from={0} durationInFrames={mainVideoDurationInFrames}>
        <TitleAnimation
          text={data.title.text}
          fontFamily={FrutigerLTArabic75Black}
        />
      </Sequence>
    </AbsoluteFill>
  );
}
