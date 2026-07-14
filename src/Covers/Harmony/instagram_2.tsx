import { AbsoluteFill, Img, staticFile } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import { CroppedImage } from "../../Components/CroppedImage";
import { CoverTemplateProps } from "../types";
import { splitTextIntoMultipleLines } from "../../utils/textUtils";

const firstLine = "Fractul Bold";
const lastLine = "Adriane Text Bold Italic";

export default function HarmonyInstagram2Template({
  data,
}: CoverTemplateProps) {
  const loadFont = useLoadFonts([
    {
      family: lastLine,
      url: staticFile("fonts/AdrianeTextBoldItalic.ttf"),
    },
    {
      family: firstLine,
      url: staticFile("fonts/FractulBold.ttf"),
    },
  ]);

  if (!loadFont) return null;
  
  return (
    <AbsoluteFill>
      <AbsoluteFill>
        <CroppedImage
          src={data.imageSrc}
          crop={data.crop}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill>
        <Img src={staticFile("Covers/harmony/insta_2/md5-1.png")} />

        <div
          style={{
            position: "absolute",
            top: 1320,
            left: "50%",
            transform: "translateX(-50%)",
            width: "75%",
            textAlign: "center",
          }}
        >
          {splitTextIntoMultipleLines(data.text_fields.text, 4, 15).map((line, index) => {
            const isLastLine = index === splitTextIntoMultipleLines(data.text_fields.text, 4, 15).length - 1;

            return (
              <div
                key={index}
                style={{
                  fontFamily: isLastLine ? lastLine : firstLine,
                  fontSize: isLastLine ? 95 : 80,
                  lineHeight: 1.1,
                  textTransform: isLastLine ? "none" : "uppercase",
                  color: "#ffffff",
                }}
              >
                {line}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}