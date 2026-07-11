import { Img, staticFile } from "remotion";

interface SpeakerAnimationProps {
  name: string;
  description: string;
  fontFamily: string;
}

export default function SpeakerAnimation({
  name,
  description,
  fontFamily,
}: SpeakerAnimationProps) {
  return (
    <div>
      <Img
        src={staticFile("harmony/images/speaker.png")}
        style={{
          position: "absolute",
          left: 169.8,
          top: 418,
          scale:"15%",
          transform: "translate(-70.5px, -58.5px) scale(0.75, 0.76)",
          transformOrigin: "70.5px 58.5px",
        }}
      />

      <div>{name}</div>

      <div
        style={{
          position: "absolute",
          left: 150,
          top: 897,
          color: "white",
          fontFamily,
          fontSize: 40,
          textAlign: "left",
          whiteSpace: "nowrap",
        }}
      >
        {description}
      </div>
    </div>
  );
}