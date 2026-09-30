import {AbsoluteFill, Img, Sequence, staticFile} from "remotion";
import {useLoadFonts} from "../../hooks/useLoadFonts";
import Video from "../../Components/Video";
import Captions from "../../Components/Captions";
import AudioClips from "../../Components/AudioClips";
import Cover from "../../Components/Cover";
import {TemplateProps} from "../types";
import TitleAnimation, {TITLE_ANIMATION_DURATION} from "./TitleAnimation";
import TagsAnimation, {TAGS_ANIMATION_DURATION} from "./TagsAnimation";

const LATO_BOLD = "LatoBold";

export default function SahaTemplate({data}: TemplateProps) {
  const fontsLoaded = useLoadFonts([
    {
      family: LATO_BOLD,
      url: staticFile("saha/fonts/LatoBold.ttf"),
    },
  ]);

  if (!fontsLoaded) return null;

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
        src={staticFile("saha/images/gradient.png")}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: 1080,
        }}
      />

      <Img
        src={staticFile("saha/images/logo.png")}
        style={{
          position: "absolute",
          top: 160,
          right: 100,
          width: 160,
        }}
      />

      <Sequence durationInFrames={TITLE_ANIMATION_DURATION}>
        <TitleAnimation
          text={data.title.text}
          fontFamily={LATO_BOLD}
        />
      </Sequence>

      <Sequence durationInFrames={TAGS_ANIMATION_DURATION}>
        <TagsAnimation
          location={data.tags?.location}
          date={data.tags?.date}
          source={data.tags?.source}
          fontFamily={LATO_BOLD}
        />
      </Sequence>

      {data.captions.src && (
        <Captions
          src={data.captions.src}
          containerStyle={{
            top: 1320,
            backgroundColor: "rgba(146, 88, 66, 0.97)",
            padding: "18px",
            borderRadius: 0,
          }}
          textStyle={{
            color: "#FFFFFF",
            fontFamily: LATO_BOLD,
            fontSize: 48,
            textAlign: "center",
          }}
        />
      )}
    </AbsoluteFill>
  );
}
