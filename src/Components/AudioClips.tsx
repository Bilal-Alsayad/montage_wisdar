import { Audio } from "@remotion/media";
import {
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

interface AudioClip {
  src: string;
  gain: number;
  fadeIn: number;
  fadeOut: number;
  startTime: number;
  duration: number;
}

function AudioClip({ audioClip }: { audioClip: AudioClip }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const durationInFrames = audioClip.duration * fps;
  const fadeInFrames = audioClip.fadeIn * fps;
  const fadeOutFrames = audioClip.fadeOut * fps;


  const volume = interpolate(
    frame,
    [0, fadeInFrames, durationInFrames - fadeOutFrames, durationInFrames],
    [0, audioClip.gain, audioClip.gain, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.ease),
    },
  );

  return <Audio src={audioClip.src} volume={volume} />;
}

export default function AudioClips({
  audioClips,
}: {
  audioClips: AudioClip[];
}) {
  const { fps } = useVideoConfig();

  return (
    <>
      {audioClips.map((audioClip, index) => (
        <Sequence
          key={index}
          from={audioClip.startTime * fps}
          durationInFrames={audioClip.duration * fps}
        >
          <AudioClip audioClip={audioClip} />
        </Sequence>
      ))}
    </>
  );
}
