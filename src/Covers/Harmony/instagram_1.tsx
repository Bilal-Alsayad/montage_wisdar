import { AbsoluteFill, Img, staticFile } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import { CroppedImage } from "../../Components/CroppedImage";
import { CoverTemplateProps } from "../types";

const firstLine = "Adriane Text Bold Italic";
const secondLine = "Fractul Bold";

export default function HarmonyInstagram1Template({
  data,
}: CoverTemplateProps) {
  const loadFont = useLoadFonts([
    {
      family: secondLine,
      url: staticFile("fonts/AdrianeTextBoldItalic.ttf"),
    },
    {
      family: firstLine,
      url: staticFile("fonts/FractulBold.ttf"),
    },
  ]);

  if (!loadFont) {
    return null;
  }

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
        <Img src={staticFile("Covers/harmony/insta_1/md5-1.png")} />

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
          <div
            className="first-line:font-['Adriane_Text_Bold_Italic'] 
                        first-line:text-[80px]"
            style={{
              fontFamily: secondLine,
              fontSize: 80,
              lineHeight: 1.1,
              textTransform: "uppercase",
              color: "#ffffff",
            }}
          >
            {data.text_fields.text}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}