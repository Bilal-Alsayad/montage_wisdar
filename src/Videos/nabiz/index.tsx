import {AbsoluteFill, Img, Sequence, staticFile} from "remotion";
import {useLoadFonts} from "../../hooks/useLoadFonts";
import Video from "../../Components/Video";
import Captions from "../../Components/Captions";
import AudioClips from "../../Components/AudioClips";
import Cover from "../../Components/Cover";
import {TemplateProps} from "../types";
import TitleAnimation, {TITLE_ANIMATION_DURATION} from "./TitleAnimation";
import LocationAnimation, {
  LOCATION_ANIMATION_DURATION,
} from "./LocationAnimation";
import DateAnimation, {DATE_ANIMATION_DURATION} from "./DateAnimation";
import SourceAnimation, {
  SOURCE_ANIMATION_DURATION,
} from "./SourceAnimation";

const TEMPLATE_FONT = "NoirPro-Regular";

export default function NabizTemplate({data}: TemplateProps) {
  const fontsLoaded = useLoadFonts([
    {
      family: TEMPLATE_FONT,
      url: staticFile("nabiz/fonts/noirproregular.otf"),
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
        src={staticFile("nabiz/images/gradient.png")}
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: "100%",
        }}
      />

      <Img
        src={staticFile("nabiz/images/logo.png")}
        style={{
          position: "absolute",
          top: 290,
          left: 190,
          width: 260,
        }}
      />

      <Sequence durationInFrames={TITLE_ANIMATION_DURATION}>
        <TitleAnimation text={data.title.text} fontFamily={TEMPLATE_FONT} />
      </Sequence>

      <Sequence
        from={TITLE_ANIMATION_DURATION}
        durationInFrames={LOCATION_ANIMATION_DURATION}
      >
        <LocationAnimation
          text={data.tags.location}
          fontFamily={TEMPLATE_FONT}
        />
      </Sequence>

      <Sequence
        from={TITLE_ANIMATION_DURATION}
        durationInFrames={DATE_ANIMATION_DURATION}
      >
        <DateAnimation text={data.tags.date} fontFamily={TEMPLATE_FONT} />
      </Sequence>

      <Sequence
        from={TITLE_ANIMATION_DURATION}
        durationInFrames={SOURCE_ANIMATION_DURATION}
      >
        <SourceAnimation text={data.tags.source} fontFamily={TEMPLATE_FONT} />
      </Sequence>

      {data.captions.src && (
        <Captions
          src={data.captions.src}
          containerStyle={{
            top: 1320,
            backgroundColor: "rgba(154, 21, 30, 0.97)",
            padding: "18.3px",
          }}
          textStyle={{
            color: "#FFFFFF",
            fontFamily: TEMPLATE_FONT,
            fontSize: 48,
            textAlign: "center",
            textShadow: "-2.12px 2.12px 6px rgba(0, 0, 0, 1)",
          }}
        />
      )}
    </AbsoluteFill>
  );
}
