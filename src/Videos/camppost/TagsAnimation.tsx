import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
} from "remotion";

export default function TagsAnimation() {
  return (
    <AbsoluteFill>
      <OffthreadVideo
        src={staticFile("camppost/elements/special.webm")}
        style={{
          position: "absolute",
          top: 100,
          left: 0,
        }}
      />
    </AbsoluteFill>
  );
}