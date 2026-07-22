/* eslint-disable @remotion/from-0 */
import {
  AbsoluteFill,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import Video from "../../Components/Video";
import { TemplateProps } from "../types";
import AudioClips from "../../Components/AudioClips";
import Cover from "../../Components/Cover";
import { TitleAnimation } from "./TitleAnimation";

const LYON_ARABIC_DISPLAY_BOLD = "lyonarabicdisplaybold"

export default function JomarkTemplate({
  data,
}: TemplateProps) {

  const { durationInFrames } = useVideoConfig();
  const fontsLoaded = useLoadFonts([
    {
      family: LYON_ARABIC_DISPLAY_BOLD,
      url: staticFile("jomark/fonts/lyonarabicdisplaybold.otf"),
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

      <Sequence from={0} durationInFrames={durationInFrames}>
        <TitleAnimation
          text={data.title.text}
          fontFamily={LYON_ARABIC_DISPLAY_BOLD}
        />
      </Sequence>

    </AbsoluteFill>
  );
}
