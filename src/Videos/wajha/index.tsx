/* eslint-disable @remotion/from-0 */
import {
  AbsoluteFill,
  Loop,
  OffthreadVideo,
  Sequence,
  staticFile,
} from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import Video from "../../Components/Video";
import { TemplateProps } from "../types";
import AudioClips from "../../Components/AudioClips";
import Cover from "../../Components/Cover";
import TitleAnimation from "./TitleAnimation";
import TagsAnimation, { TAGS_ANIMATION_DURATION } from "./TagsAnimation";
import SpeakerAnimation, { SPEAKER_ANIMATION_DURATION } from "./SpeakerAnimation";
import Captions from "../../Components/Captions";

const MorabbaSemiBold = "MorabbaSemiBold"
const itfHuwiyaArabicBold = "ITF Huwiya Arabic Bold";
export default function WajhaTemplate({
  data, outroDurationInFrames ,outroStartFrame
}: TemplateProps) {

  const fontsLoaded = useLoadFonts([
    {
      family: MorabbaSemiBold,
      url: staticFile("wajha/fonts/MorabbaSemiBold.ttf"),
    },
    {
      family: itfHuwiyaArabicBold,
      url: staticFile("wajha/fonts/itfHuwiyaArabicBold.otf"),
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

      {/* Captions */}
      {data.captions.src && (
        <Captions
          src={data.captions.src}
          containerStyle={{
            top: 1000,
            maxWidth: "100%",
            whiteSpace: "nowrap",
          }}
          textStyle={{
            fontSize: 50,
            fontFamily: itfHuwiyaArabicBold,
            color: "#FFFFFF",
            lineHeight: 1.4,
            textShadow: "2.1px 2.1px 12px rgba(0, 0, 0, 0.71)",
            direction: "rtl",
          }}
          wordByWord
        />
      )}

      <Sequence from={0} durationInFrames={165}>
        <TitleAnimation
          text={data.title.text}
          source={data.tags.source ?? ""}
          fontFamily={MorabbaSemiBold}
        />
      </Sequence>

      <Sequence from={165} durationInFrames={TAGS_ANIMATION_DURATION}>
        <TagsAnimation
          location={data.tags.location ?? ""}
          date={data.tags.date ?? ""}
          fontFamily={MorabbaSemiBold}
        />
      </Sequence>
      {data.speakers.length > 0 &&
        data.speakers.map((speaker, index) => (
          <Sequence
            // from={speaker.start * fps}
            from={200}
            durationInFrames={SPEAKER_ANIMATION_DURATION}
            key={index}
          >
            <SpeakerAnimation
              nameText={speaker.name}
              descriptionText={speaker.description}
              fontBoldFamily={MorabbaSemiBold}
              fontRegularFamily={MorabbaSemiBold}
            />
          </Sequence>
        ))}
      <Loop durationInFrames={451}>
          <OffthreadVideo
            src={staticFile("wajha/elements/logo.webm")}
            transparent
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
      </Loop>

      <Sequence from={outroStartFrame} durationInFrames={outroDurationInFrames}>
        <OffthreadVideo
          src={staticFile("wajha/elements/outro.webm")}
          transparent
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Sequence>

    </AbsoluteFill>
  );
}
