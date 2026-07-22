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
    <>
      <Img
        src={staticFile("alqastal/images/source.png")}
        style={{
          position: "absolute",
          top: 515,
          left: 95,
          opacity:"50%",
          width: 55,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 575,
          left: 160,
          opacity:"50%",
          transform: "rotate(90deg)",
          transformOrigin: "top left",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            color: "#141414",
            fontFamily,
            padding: "7px",
            borderRadius: "4px",
            fontSize: 23,
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </div>
      </div>
    </>
  );
}