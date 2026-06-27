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

  const adjustedSequences = data.sequences.map((seq) => {
    const cropW = seq.crop.bottom_right[0] - seq.crop.top_left[0];
    const cropH = seq.crop.bottom_right[1] - seq.crop.top_left[1];
    if (cropW <= 0 || cropH <= 0) return seq;

    const ratio = cropW / cropH;
    // Check if ratio is ~9:16 (0.5625)
    if (Math.abs(ratio - 9 / 16) < 0.01) {
      // Convert to 4:5 ratio by widening horizontally
      const newW = cropH * (4 / 5);
      const centerX = (seq.crop.top_left[0] + seq.crop.bottom_right[0]) / 2;
      let newLeft = centerX - newW / 2;
      let newRight = centerX + newW / 2;

      // Clamp: shift the whole crop if it goes out of bounds
      if (newLeft < 0) {
        newRight -= newLeft;
        newLeft = 0;
      }

      // Scale blur X coordinates proportionally from the crop center
      const scaleFactor = newW / cropW;
      const adjustedBlur = seq.blur.map((b) => ({
        ...b,
        top_left: [
          centerX + (b.top_left[0] - centerX) * scaleFactor,
          b.top_left[1],
        ] as [number, number],
        bottom_right: [
          centerX + (b.bottom_right[0] - centerX) * scaleFactor,
          b.bottom_right[1],
        ] as [number, number],
      }));

      return {
        ...seq,
        crop: {
          top_left: [newLeft, seq.crop.top_left[1]] as [number, number],
          bottom_right: [newRight, seq.crop.bottom_right[1]] as [
            number,
            number,
          ],
        },
        blur: adjustedBlur,
      };
    }
    return seq;
  });

  return (
    <AbsoluteFill>
      {/* Video */}
      <Video
        sequences={adjustedSequences}
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
