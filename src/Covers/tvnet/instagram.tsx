import { AbsoluteFill, Img, staticFile } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import { CroppedImage } from "../../Components/CroppedImage";
import { CoverTemplateProps } from "../types";
import { splitTextIntoMultipleLines } from "../../utils/textUtils";

const FONT_FAMILY = "MontserratBold";

export default function TventInstagramTemplate({
  data,
}: CoverTemplateProps) {
  const loadFont = useLoadFonts([
    {
      family: FONT_FAMILY,
      url: staticFile("fonts/MontserratBold.ttf"),
    },
  ]);

  if (!loadFont) {
    return null;
  }

  const text = data.text_fields.text ?? "";

  const lines = splitTextIntoMultipleLines(
    text,
    3,
    25,
  ).filter((line) => line.trim());

  return (
    <AbsoluteFill>
      <CroppedImage
        src={data.imageSrc}
        crop={data.crop}
        style={{
          width: "100%",
          height: "100%",
        }}
      />

      <AbsoluteFill>
        <Img
          src={staticFile("Covers/tvnet/instagram/md5-1.png")}
          style={{
            width: "100%",
            height: "100%",
          }}
        />

        {lines.map((line, lineIndex) => (
          <div
            key={`text-${lineIndex}`}
            style={{
              position: "absolute",
              left: 95,
              top: 1130 + lineIndex * 85,
              width: 880,
              height: 75,
              color: "white",
              fontFamily: FONT_FAMILY,
              fontSize: data.fontSize ?? 65,
              lineHeight: "80px",
              letterSpacing: "-0.195px",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {line}
          </div>
        ))}

        {lines.slice(1).map((line, index) => {
          const lineIndex = index + 1;
          const lineWidth = 34.9 * line.length;

          return (
            <div
              key={`green-line-${lineIndex}`}
              style={{
                position: "absolute",
                left: 95.311,
                top: 1206 + lineIndex * 85,
                width: lineWidth,
                height: 14.4,
                overflow: "hidden",
              }}
            >
              <Img
                src={staticFile("Covers/tvnet/images/line.png")}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: lineWidth,
                  height: 14.4,
                }}
              />
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
}