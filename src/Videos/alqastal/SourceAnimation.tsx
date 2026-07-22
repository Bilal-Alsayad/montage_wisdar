import {Img, staticFile} from "remotion";

interface SourceAnimationProps {
  text?: string;
  fontFamily: string;
}

export default function SourceAnimation({
  text,
  fontFamily,
}: SourceAnimationProps) {
  if (!text) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        top: 515,
        left: 95,
        width: 55,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: 0.5,
      }}
    >
      <Img
        src={staticFile("alqastal/images/source.png")}
        style={{
          width: 55,
        }}
      />

      <div
        dir="rtl"
        style={{
          marginTop: 28,
          writingMode: "vertical-rl",
          textOrientation: "sideways",
          backgroundColor: "#fff",
          color: "#141414",
          fontFamily,
          padding: 7,
          borderRadius: 4,
          fontSize: 23,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </div>
    </div>
  );
}