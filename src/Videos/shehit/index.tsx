/* eslint-disable @remotion/from-0 */
import {AbsoluteFill, Img, Sequence, staticFile} from "remotion";
import {useLoadFonts} from "../../hooks/useLoadFonts";
import AudioClips from "../../Components/AudioClips";
import Captions from "../../Components/Captions";
import Cover from "../../Components/Cover";
import Video from "../../Components/Video";
import {TemplateProps} from "../types";
import TagsAnimation, {TAGS_ANIMATION_DURATION} from "./TagsAnimation";
import TitleAnimation, {TITLE_ANIMATION_DURATION} from "./TitleAnimation";

const SHEHIT_FONT = "BahijTheSansArabicBold";

export default function ShehitTemplate({data}: TemplateProps) {
  const fontsLoaded = useLoadFonts([
    {
      family: SHEHIT_FONT,
      url: staticFile("shehit/fonts/BahijTheSansArabicBold.ttf"),
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
        src={staticFile("shehit/images/gradient.png")}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: 1080,
        }}
      />
      <Img
        src={staticFile("shehit/images/logo.png")}
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: 80,
          width: 160,
        }}
      />

      <Sequence from={0} durationInFrames={TITLE_ANIMATION_DURATION}>
        <TitleAnimation
          text={data.title?.text || ""}
          fontFamily={SHEHIT_FONT}
        />
      </Sequence>

      <Sequence
        from={TITLE_ANIMATION_DURATION}
        durationInFrames={TAGS_ANIMATION_DURATION}
      >
        <TagsAnimation
          source={data.tags?.source}
          location={data.tags?.location}
          date={data.tags?.date}
          fontFamily={SHEHIT_FONT}
        />
      </Sequence>

      {data.captions?.src && (
        <Captions
          src={data.captions.src}
          containerStyle={{
            top: 1400,
            backgroundColor: "rgba(57, 85, 142, 0.97)",
            padding: "18px",
          }}
          textStyle={{
            color: "#FFFFFF",
            fontFamily: SHEHIT_FONT,
            fontSize: 48,
            textAlign: "center",
          }}
        />
      )}
    </AbsoluteFill>
  );
}