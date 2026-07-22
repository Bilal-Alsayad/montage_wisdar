/* eslint-disable @remotion/from-0 */
import {
  AbsoluteFill,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import Video from "../../Components/Video";
import { TemplateProps } from "../types";
import AudioClips from "../../Components/AudioClips";
import Cover from "../../Components/Cover";
import { TITLE_ANIMATION_DURATION, TitleAnimation } from "./TitleAnimation";
import Captions from "../../Components/Captions";

const LYON_ARABIC_DISPLAY_BOLD = "lyonarabicdisplaybold"

export default function JomarkTemplate({
  data,
}: TemplateProps) {
  const frame = useCurrentFrame();
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

      {data.captions.src && (
        <Captions
          src={data.captions.src}
          containerStyle={{
            bottom: frame < TITLE_ANIMATION_DURATION ? 700 : 400,
            backgroundColor: "rgba(6, 6, 6, 0.54)",
            textShadow: "0 0 50px 11.3px rgba(0, 0, 0, 0.52)",
            padding: "10px",
          }}
          textStyle={{
            color: "#fff",
            fontFamily: LYON_ARABIC_DISPLAY_BOLD,

            fontSize: 45,
          }}
        />
      )}
    </AbsoluteFill>
  );
}
