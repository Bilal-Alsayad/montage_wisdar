/* eslint-disable @remotion/from-0 */
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  staticFile,
  Loop,
  useVideoConfig 
} from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import Video from "../../Components/Video";
import { TemplateProps } from "../types";
import AudioClips from "../../Components/AudioClips";
import Cover from "../../Components/Cover";
import TitleAnimation, { TITLE_ANIMATION_DURATION } from "./TitleAnimation";
import TagsAnimation from "./TagsAnimation";

const NOTOKUFI_ARABIC_EXTRA_BOLD = "NotoKufiArabic";

export default function CamppostTemplate({
  data,
  outroDurationInFrames = 0,
  outroStartFrame,
}: TemplateProps) {
  
  const { durationInFrames } = useVideoConfig();

  const fontsLoaded = useLoadFonts([
    {
      family: NOTOKUFI_ARABIC_EXTRA_BOLD,
      url: staticFile("camppost/fonts/NotoKufiArabic.ttf"),
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

      <Sequence
        from={0}
        durationInFrames={durationInFrames}
      >
        <TagsAnimation/>
      </Sequence>

      {/* Title */}
      <Sequence from={0} durationInFrames={TITLE_ANIMATION_DURATION}>
        <TitleAnimation
          text={data.title.text}
          fontFamily={NOTOKUFI_ARABIC_EXTRA_BOLD}
        />
      </Sequence>

      {/* Logo */}
      <Loop durationInFrames={3000}>
        <OffthreadVideo
          src={staticFile("camppost/elements/logo_stroke.webm")}
          style={{ 
            width: 600, 
            position: "absolute", 
            top: 30, 
            right: -90
        }}
        />
      </Loop>

      <Sequence from={outroStartFrame} durationInFrames={outroDurationInFrames}>
        <OffthreadVideo
          src={staticFile("camppost/elements/outro.webm")}
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
