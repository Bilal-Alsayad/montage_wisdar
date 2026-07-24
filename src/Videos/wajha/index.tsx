/* eslint-disable @remotion/from-0 */
import {
  AbsoluteFill,
  Loop,
  OffthreadVideo,
  Sequence,
  staticFile,
  useVideoConfig
} from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import Video from "../../Components/Video";
import { TemplateProps } from "../types";
import AudioClips from "../../Components/AudioClips";
import Cover from "../../Components/Cover";
import TitleAnimation from "./TitleAnimation";
import TagsAnimation, { TAGS_ANIMATION_DURATION } from "./TagsAnimation";
import SpeakerAnimation, { SPEAKER_ANIMATION_DURATION } from "./SpeakerAnimation";
// import Captions from "../../Components/Captions";

const MorabbaSemiBold = "MorabbaSemiBold"

export default function WajhaTemplate({
  data, outroDurationInFrames ,outroStartFrame
}: TemplateProps) {
  const { durationInFrames } = useVideoConfig();

  const fontsLoaded = useLoadFonts([
    {
      family: MorabbaSemiBold,
      url: staticFile("wajha/fonts/MorabbaSemiBold.ttf"),
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
      <Loop durationInFrames={390}>
        <Sequence from={0} durationInFrames={durationInFrames}>
          <OffthreadVideo
            src={staticFile("wajha/elements/logo.webm")}
            transparent
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Sequence>
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
