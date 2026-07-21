import { AbsoluteFill, Img, Sequence, staticFile } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import Captions from "../../Components/Captions";
import { TemplateProps } from "../types";
import Video from "../../Components/Video";
import AudioClips from "../../Components/AudioClips";
import Cover from "../../Components/Cover";
import TagsAnimation, { TAGS_ANIMATION_DURATION } from "./Tagsanimation";
import TitleAnimation, { TITLE_ANIMATION_DURATION } from "./Titleanimation";

const SOURCE_SANS_BOLD = "SourceSansProBold";
const SOURCE_SANS_SEMIBOLD = "SourceSansProSemiBold";

export default function MemoTemplate({ data }: TemplateProps) {
  const fontsLoaded = useLoadFonts([
    {
      family: SOURCE_SANS_BOLD,
      url: staticFile("memo/fonts/SourceSansProBold.ttf"),
    },
    {
      family: SOURCE_SANS_SEMIBOLD,
      url: staticFile("memo/fonts/SourceSansProSemiBold.ttf"),
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
        src={staticFile("memo/images/gradiant.png")}
        style={{ position: "absolute", bottom: 0 }}
      />

      <Img
        src={staticFile("memo/images/logo.png")}
        style={{
          position: "absolute",
          left: 820,
          top: 470,
          width: 160,
          height: 40,
        }}
      />

      <Sequence durationInFrames={TAGS_ANIMATION_DURATION}>
        <TagsAnimation
          location={data.tags.location}
          date={data.tags.date}
          fontFamily={SOURCE_SANS_BOLD}
        />
      </Sequence>

      <Sequence durationInFrames={TITLE_ANIMATION_DURATION}>
        <TitleAnimation text={data.title.text} fontFamily={SOURCE_SANS_BOLD} />
      </Sequence>

      {data.captions.src && (
        <Captions
          src={data.captions.src}
          containerStyle={{
            position: "absolute",
            top: 1515,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            padding: 20,
            maxWidth: "85%",
          }}
          textStyle={{
            fontSize: 48,
            color: "#FFFFFF",
            fontFamily: SOURCE_SANS_SEMIBOLD,
          }}
        />
      )}
    </AbsoluteFill>
  );
}