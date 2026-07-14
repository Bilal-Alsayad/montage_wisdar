import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  Sequence,
  staticFile,
} from "remotion";
import { TemplateProps } from "../types";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import Video from "../../Components/Video";
import Cover from "../../Components/Cover";
import AudioClips from "../../Components/AudioClips";
import Captions from "../../Components/Captions";
import TitleAnimation, { TITLE_ANIMATION_DURATION } from "./TitleAnimation";
import TagsAnimation, { TAGS_ANIMATION_DURATION } from "./TagsAnimation";

const MontserratArabicSemiBold = "MontserratArabicSemiBold";
const MontserratArabicBold = "MontserratArabicBold";
const MontserratArabicRegular = "MontserratArabicRegular";

export default function DiasporaPulseTemplate({
  outroStartFrame,
  outroDurationInFrames,
  data,
}: TemplateProps) {
  const fontsLoaded = useLoadFonts([
    {
      family: MontserratArabicSemiBold,
      url: staticFile("diasporapulse/fonts/MontserratArabicSemiBold.otf"),
    },
    {
      family: MontserratArabicBold,
      url: staticFile("diasporapulse/fonts/MontserratArabicBold.otf"),
    },
    {
      family: MontserratArabicRegular,
      url: staticFile("diasporapulse/fonts/MontserratArabicRegular.otf"),
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

      {data.captions.src && (
        <Captions
          src={data.captions.src}
          containerStyle={{
            top: 900,
            padding: 14,
            borderRadius: 4,
            backgroundColor: "#313030",
          }}
          textStyle={{
            fontSize: 44,
            fontFamily: MontserratArabicSemiBold,
            color: "#FFFFFF",
            direction: "rtl",
          }}
        />
      )}

      {/* Title */}
      <Sequence from={0} durationInFrames={TITLE_ANIMATION_DURATION}>
        <TitleAnimation
          text={data.title.text}
          fontFamily={MontserratArabicBold}
        />
      </Sequence>

      {/* TAGS */}
      <Sequence from={0} durationInFrames={TAGS_ANIMATION_DURATION}>
        <TagsAnimation
          location={data.tags.location}
          date={data.tags.date}
          source={data.tags.source}
          fontFamily={MontserratArabicRegular}
        />
      </Sequence>

      {/* Outro */}
      <Sequence from={outroStartFrame} durationInFrames={outroDurationInFrames}>
        <OffthreadVideo
          src={`${staticFile("diasporapulse/elements/outro.webm")}`}
          style={{ zIndex: 100, objectFit: "cover" }}
          transparent
        />
      </Sequence>
      {/* Logo */}
      <Img
        src={staticFile("diasporapulse/elements/logo.png")}
        style={{
          position: "absolute",
          top: "50%",
          transform: `translateY(-50%)`,
        }}
      />
    </AbsoluteFill>
  );
}
