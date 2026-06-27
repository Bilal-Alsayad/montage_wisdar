import { Img, Sequence } from "remotion";

export default function Cover({ coverSrc }: { coverSrc: string }) {
  return (
    <Sequence from={0} durationInFrames={1}>
      <Img
        src={coverSrc}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 100,
        }}
      />
    </Sequence>
  );
}