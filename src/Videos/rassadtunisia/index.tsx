import {
  AbsoluteFill,
  Img,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import Video from "../../Components/Video";
import { TemplateProps } from "../types";
import Cover from "../../Components/Cover";
import AudioClips from "../../Components/AudioClips";
import Captions from "../../Components/Captions";
import TagsAnimation, { TAGS_ANIMATION_DURATION } from "./TagsAnimation";
import { SourceAnimation } from "./SourceAnimation";
import SpeakerAnimation from "./SpeakerAnimation";
import TitleAnimation from "./TitleAnimation";

const itfGhroobSSExtraBold = "itfGhroobSSExtraBold";
const AlJazeeraArabicRegular = "AlJazeeraArabicRegular";

export default function RassadTunisiaTemplate({ data }: TemplateProps) {
  const { fps } = useVideoConfig();
  const fontFamily = useLoadFonts([
    {
      family: itfGhroobSSExtraBold,
      url: staticFile("rassadtunisia/fonts/itfGhroobSSExtraBold.otf"),
    },
    {
      family: AlJazeeraArabicRegular,
      url: staticFile("rassadtunisia/fonts/AlJazeeraArabicRegular.ttf"),
    },
  ]);

  if (!fontFamily) return null;

  return (
    <AbsoluteFill>
      {/* Video */}
      <Video
        sequences={data.sequences}
        scaleToFit={data.scale_to_fit}
        backgroundUrl={data.background_img_url}
      />

      {/* Cover */}
      {data.cover_src && <Cover coverSrc={data.cover_src} />}

      {/* Audio Clips */}
      {data.audio_clips && <AudioClips audioClips={data.audio_clips} />}

      {/* Gradient Fill */}
      <Img
        src={staticFile("rassadtunisia/elements/gradientfill.png")}
        style={{
          position: "absolute",
          bottom: 0,
        }}
      />

      {/* Logos */}
      <Img
        src={staticFile("rassadtunisia/elements/logo.png")}
        style={{
          position: "absolute",
          top: 130,
          left: 75,
        }}
      />
      <Img
        src={staticFile("rassadtunisia/elements/aalogo.png")}
        style={{
          position: "absolute",
          bottom: 70,
          left: 75,
        }}
      />

      {/* Captions */}
      {data.captions.src && (
        <AbsoluteFill>
          <Captions
            src={data.captions.src}
            containerStyle={{
              top: 700,
              direction: "ltr",
              background:
                "linear-gradient(180deg, #e61f30 11.5%, #b31925 88.5%)",
              padding: 5,
              maxWidth: "75%",
            }}
            textStyle={{
              fontSize: 40,
              fontFamily: itfGhroobSSExtraBold,
              color: "#FFFFFF",
            }}
          />
        </AbsoluteFill>
      )}

      {/* Tags */}
      <Sequence from={0} durationInFrames={TAGS_ANIMATION_DURATION}>
        <TagsAnimation
          location={data.tags.location}
          date={data.tags.date}
          fontFamily={itfGhroobSSExtraBold}
        />
      </Sequence>

      {/* Source */}
      <Sequence
        from={TAGS_ANIMATION_DURATION}
        durationInFrames={TAGS_ANIMATION_DURATION}
      >
        <SourceAnimation
          source={data.tags.source}
          fontFamily={itfGhroobSSExtraBold}
        />
      </Sequence>

      {/* Speakers */}
      {data.speakers.length > 0 &&
        data.speakers.map((speaker, index) => (
          <Sequence
            from={speaker.start * fps}
            key={index}
            durationInFrames={250}
          >
            <SpeakerAnimation
              name={speaker.name}
              description={speaker.description}
              nameFontFamily={itfGhroobSSExtraBold}
              descriptionFontFamily={itfGhroobSSExtraBold}
            />
          </Sequence>
        ))}

      <Sequence from={0} durationInFrames={160}>
        <TitleAnimation text={data.title.text} fontFamily={itfGhroobSSExtraBold}/>
      </Sequence>
    </AbsoluteFill>
  );
}
