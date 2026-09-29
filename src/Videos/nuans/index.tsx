import {AbsoluteFill, Img, Sequence, staticFile} from "remotion";
import {useLoadFonts} from "../../hooks/useLoadFonts";
import Video from "../../Components/Video";
import Captions from "../../Components/Captions";
import AudioClips from "../../Components/AudioClips";
import Cover from "../../Components/Cover";
import {TemplateProps} from "../types";
import TitleAnimation, {TITLE_ANIMATION_DURATION} from "./TitleAnimation";
import SpeakerAnimation, {
  SPEAKER_ANIMATION_DURATION,
} from "./SpeakerAnimation";
import TagsAnimation, {TAGS_ANIMATION_DURATION} from "./TagsAnimation";

const NUANS_FONT = "NoirProRegular";

export default function NuansTemplate({data}: TemplateProps) {
  const fontsLoaded = useLoadFonts([
    {
      family: NUANS_FONT,
      url: staticFile("nuans/fonts/NoirProRegular.otf"),
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
        src={staticFile("nuans/images/gradient.png")}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: 1080,
          height: "auto",
        }}
      />

      <Img
        src={staticFile("nuans/images/logo.png")}
        style={{
          position: "absolute",
          top: 160,
          left: 220,
          width: 220,
        }}
      />

      <Sequence durationInFrames={TITLE_ANIMATION_DURATION}>
        <TitleAnimation
          text={data.title.text}
          fontFamily={NUANS_FONT}
        />
      </Sequence>

      {data.speakers?.map((speaker, index) => (
        <Sequence
          key={index}
          from={TITLE_ANIMATION_DURATION}
          durationInFrames={SPEAKER_ANIMATION_DURATION}
        >
          <SpeakerAnimation
            name={speaker.name}
            description={speaker.description}
            fontFamily={NUANS_FONT}
          />
        </Sequence>
      ))}

      <Sequence
        from={TITLE_ANIMATION_DURATION}
        durationInFrames={TAGS_ANIMATION_DURATION}
      >
        <TagsAnimation
          source={data.tags?.source}
          location={data.tags?.location}
          date={data.tags?.date}
          fontFamily={NUANS_FONT}
        />
      </Sequence>

      {data.captions.src && (
        <Captions
          src={data.captions.src}
          containerStyle={{
            top: 1300,
            backgroundColor: "rgba(50, 58, 66, 0.97)",
            padding: "18.3px",
            borderRadius: 0,
          }}
          textStyle={{
            color: "#FFFFFF",
            fontFamily: NUANS_FONT,
            fontSize: 48,
            textAlign: "center",
          }}
        />
      )}
    </AbsoluteFill>
  );
}
