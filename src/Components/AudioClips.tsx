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
  trimStart?: number;
  trimEnd?: number;
}

function AudioClip({ audioClip }: { audioClip: AudioClip }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const durationInFrames = Math.floor(audioClip.duration * fps);
  const fadeInFrames = Math.floor(audioClip.fadeIn * fps);
  const fadeOutFrames = Math.floor(audioClip.fadeOut * fps);

  let trimStartFrames = 0;
  let trimEndFrames = 0;

  if (audioClip.trimStart) {
    trimStartFrames = Math.floor(audioClip.trimStart * fps);
  }
  if (audioClip.trimEnd) {
    trimEndFrames = Math.floor(audioClip.trimEnd * fps);
  }

  const hasFadeIn = fadeInFrames > 0;
  const hasFadeOut = fadeOutFrames > 0;

  let inputRange: number[];
  let outputRange: number[];

  if (hasFadeIn && hasFadeOut) {
    inputRange = [0, fadeInFrames, durationInFrames - fadeOutFrames, durationInFrames];
    outputRange = [0, audioClip.gain, audioClip.gain, 0];
  } else if (hasFadeIn) {
    inputRange = [0, fadeInFrames];
    outputRange = [0, audioClip.gain];
  } else if (hasFadeOut) {
    inputRange = [durationInFrames - fadeOutFrames, durationInFrames];
    outputRange = [audioClip.gain, 0];
  } else {
    inputRange = [0, durationInFrames];
    outputRange = [audioClip.gain, audioClip.gain];
  }

  const volume = interpolate(frame, inputRange, outputRange, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.ease),
  });

  return (
    <Audio
      src={audioClip.src}
      volume={volume}
      trimBefore={audioClip.trimStart !== undefined ? trimStartFrames : undefined}
      trimAfter={audioClip.trimEnd !== undefined ? trimEndFrames : undefined}
    />
  );
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
          from={Math.floor(audioClip.startTime * fps)}
          durationInFrames={Math.floor(audioClip.duration * fps)}
        >
          <AudioClip audioClip={audioClip} />
        </Sequence>
      ))}
    </>
  );
}
