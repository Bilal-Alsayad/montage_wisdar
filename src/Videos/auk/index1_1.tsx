import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import { TemplateProps } from "../types";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import Video from "../../Components/Video";
import Captions from "../../Components/Captions";
import AudioClips from "../../Components/AudioClips";
import Cover from "../../Components/Cover";
import TitleAnimation from "./TitleAnimation";

const Bahij_TheSansArabicExtraBold = "Bahij_TheSansArabicExtraBold";

export default function Auk1_1Template({
  data,
  outroStartFrame = 100,
  outroDurationInFrames,
}: TemplateProps) {
  const { durationInFrames: durationInFramesFromConfig } = useVideoConfig();
  const fontsLoaded = useLoadFonts([
    {
      family: Bahij_TheSansArabicExtraBold,
      url: `${staticFile("auk/fonts/Bahij_TheSansArabicExtraBold.ttf")}`,
    },
  ]);
  if (!fontsLoaded) {
    return null;
  }

  return (
    <AbsoluteFill>
      {/* Background */}
      <Sequence from={0} durationInFrames={durationInFramesFromConfig}>
        <OffthreadVideo
          src={staticFile("auk/elements/shadow.mp4")}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            filter: "grayscale(100%)",
            mixBlendMode: "soft-light",
            opacity: 0.4,
          }}
        />
        <Img src={staticFile("auk/elements/1_1.png")} />
      </Sequence>

      {/* Video */}
      <div
        style={{
          position: "absolute",
          top: 573,
          left: 34,
          width: 1010,
          height: 1010,
          overflow: "hidden",
        }}
      >
        <Video
          sequences={data.sequences}
          scaleToFit={data.scale_to_fit}
          backgroundUrl={data.background_img_url}
          boxH={1010}
          boxW={1010}
        />
      </div>

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
              top: 1433,
              left: 33,
              minWidth: 1012,
              maxWidth: 1012,
              height: 150,
              direction: "ltr",
              backgroundColor: "#3C659D",
              padding: "0 10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            textStyle={{
              fontSize: 40,
              fontFamily: Bahij_TheSansArabicExtraBold,
              color: "#FFFFFF",
            }}
          />
        </AbsoluteFill>
      )}

      {/* Logo */}
      <Img
        src={staticFile("auk/elements/logo.png")}
        style={{
          position: "absolute",
          top: 610,
          right: 75,
        }}
      />

      {/* Title */}
      <Sequence from={0} durationInFrames={durationInFramesFromConfig}>
        <TitleAnimation
          text={data.title.text}
          fontFamily={Bahij_TheSansArabicExtraBold}
          bottom={1420}
        />
      </Sequence>

      <Sequence from={outroStartFrame} durationInFrames={outroDurationInFrames}>
        <OffthreadVideo
          src={`${staticFile("auk/elements/outro.webm")}`}
          style={{ zIndex: 100 }}
          transparent
        />
      </Sequence>
    </AbsoluteFill>
  );
}
