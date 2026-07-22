import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import Captions from "../../Components/Captions";
import { TemplateProps } from "../types";
import Video from "../../Components/Video";
import AudioClips from "../../Components/AudioClips";
import Cover from "../../Components/Cover";
import LogoAnimation from "./LogoAnimation";
import TitleAnimation, { TITLE_ANIMATION_DURATION } from "./TitleAnimation";
import SpeakerAnimation, {
  SPEAKER_ANIMATION_DURATION,
} from "./SpeakerAnimation";
import TagsAnimation, { TAGS_AND_SOURCE_DURATION } from "./TagsAnimation";

const DINNEXTLTPRO_BOLD = "DINNextLTPro-Bold";
const DINNEXTLTPRO_REGULAR = "DINNextLTPro-Regular";
const DINNEXTLTPRO_MEDIUM = "DINNextLTPro-Medium";

export default function MemoTemplate({ data }: TemplateProps) {
  const fontsLoaded = useLoadFonts([
    {
      family: DINNEXTLTPRO_BOLD,
      url: staticFile("mee/fonts/DINNextLTProBold.ttf"),
    },
    {
      family: DINNEXTLTPRO_REGULAR,
      url: staticFile("mee/fonts/DINNextLTProRegular.ttf"),
    },
    {
      family: DINNEXTLTPRO_MEDIUM,
      url: staticFile("mee/fonts/DINNextLTProMedium.ttf"),
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

      {data.speakers && data.speakers.length > 0 && (
        <Sequence from={450} durationInFrames={SPEAKER_ANIMATION_DURATION}>
          <SpeakerAnimation
            name={data.speakers[0].name}
            description={data.speakers[0].description}
            fontFamily={DINNEXTLTPRO_REGULAR}
          />
        </Sequence>
      )}

      <Sequence from={90} durationInFrames={TAGS_AND_SOURCE_DURATION}>
        <TagsAnimation
          location={data.tags?.location}
          date={data.tags?.date}
          source={data.tags?.source}
          fontFamily={DINNEXTLTPRO_BOLD}
        />
      </Sequence>

      <LogoAnimation privateSource={data.private_source} />

      <Sequence durationInFrames={TITLE_ANIMATION_DURATION}>
        <TitleAnimation
          text={data.title.text}
          fontFamily={DINNEXTLTPRO_MEDIUM}
        />
      </Sequence>

      {data.captions.src && (
        <Captions
          src={data.captions.src}
          containerStyle={{
            position: "absolute",
            top: 1150,
          }}
          textStyle={{
            fontSize: 67,
            textShadow: "0px 3px 6px rgba(0, 0, 0, 0.17)",
            color: "#FFFFFF",
            fontFamily: DINNEXTLTPRO_REGULAR,
            lineHeight: "1",
          }}
        />
      )}
    </AbsoluteFill>
  );
}
