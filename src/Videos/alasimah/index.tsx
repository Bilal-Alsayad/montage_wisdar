/* eslint-disable @remotion/from-0 */
import {
  AbsoluteFill,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import { TemplateProps } from "../types";
import Video from "../../Components/Video";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import Cover from "../../Components/Cover";
import AudioClips from "../../Components/AudioClips";
import TitleAnimation, {
  TITLE_ANIMATION_DURATION,
} from "./TitleAnimation";
import TimelineAnimation from "./TimelineAnimation";
import LogoAnimation, {
} from "./LogoAnimation";

const itfHuwiyaArabicBold = "ITF Huwiya Arabic Bold";

export default function AlasimahTemplate({
  data,
}: TemplateProps) {
  const { durationInFrames } = useVideoConfig();

  const fontsLoaded = useLoadFonts([
    {
      family: itfHuwiyaArabicBold,
      url: staticFile(
        "alasimah/fonts/ITFHuwiyaArabicBold.otf",
      ),
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

      <Sequence from={0} durationInFrames={TITLE_ANIMATION_DURATION}>
        <TitleAnimation
          text={data.title.text}
          fontFamily={itfHuwiyaArabicBold}
        />
      </Sequence>

      <Sequence from={0} durationInFrames={durationInFrames}>
        <LogoAnimation />
      </Sequence>

      <Sequence from={0} durationInFrames={durationInFrames}>
        <TimelineAnimation />
      </Sequence>
    </AbsoluteFill>
  );
}