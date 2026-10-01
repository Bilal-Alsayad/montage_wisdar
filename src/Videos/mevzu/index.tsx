import { AbsoluteFill, Img, Sequence, staticFile } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import Video from "../../Components/Video";
import Captions from "../../Components/Captions";
import AudioClips from "../../Components/AudioClips";
import Cover from "../../Components/Cover";
import { TemplateProps } from "../types";
import TagsAnimation, { TAGS_ANIMATION_DURATION } from "./TagsAnimation";
import SourceAnimation, { SOURCE_ANIMATION_DURATION } from "./SourceAnimation";
import TitleAnimation, { TITLE_ANIMATION_DURATION } from "./TitleAnimation";

const MONTSERRAT_BOLD = "Montserrat-Bold";
const MONTSERRAT_REGULAR = "Montserrat-Regular";
const HELVETICA_NEUE = "HelveticaNeue";

export default function MevzuTemplate({ data }: TemplateProps) {
  const fontsLoaded = useLoadFonts([
    {
      family: MONTSERRAT_BOLD,
      url: staticFile("mevzu/fonts/MontserratBold.ttf"),
    },
    {
      family: MONTSERRAT_REGULAR,
      url: staticFile("mevzu/fonts/MontserratRegular.ttf"),
    },
    {
      family: HELVETICA_NEUE,
      url: staticFile("mevzu/fonts/HelveticaNeueBold.ttf"),
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
        src={staticFile("mevzu/images/gradient.png")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />

      <Img
        src={staticFile("mevzu/images/logo.png")}
        style={{
          position: "absolute",
          top: 200,
          width: 240,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      <Sequence durationInFrames={TITLE_ANIMATION_DURATION}>
        <TitleAnimation text={data.title.text} fontFamily={MONTSERRAT_BOLD} />
      </Sequence>

      <Sequence
        from={TITLE_ANIMATION_DURATION}
        durationInFrames={TAGS_ANIMATION_DURATION}
      >
        <TagsAnimation
          location={data.tags.location}
          date={data.tags.date}
          locationFontFamily={MONTSERRAT_BOLD}
          dateFontFamily={MONTSERRAT_REGULAR}
        />
      </Sequence>

      <Sequence
        from={TITLE_ANIMATION_DURATION}
        durationInFrames={SOURCE_ANIMATION_DURATION}
      >
        <SourceAnimation
          text={data.tags.source}
          fontFamily={MONTSERRAT_REGULAR}
        />
      </Sequence>

      {data.captions.src && (
        <Captions
          src={data.captions.src}
          containerStyle={{
            top: 1320,
            backgroundColor: "rgba(255, 255, 255, 0.97)",
            padding: "18.3px",
            borderRadius: 0,
          }}
          textStyle={{
            color: "#000000",
            fontFamily: HELVETICA_NEUE,
            fontSize: 48,
            textAlign: "center",
          }}
        />
      )}
    </AbsoluteFill>
  );
}
