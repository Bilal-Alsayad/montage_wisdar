import { AbsoluteFill, Img, staticFile } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import { CroppedImage } from "../../Components/CroppedImage";
import { CoverTemplateProps } from "../types";

const fontFamily = "BahijTheSansArabicBold";

export default function AukFacebook4Template({ data }: CoverTemplateProps) {
  const loadFont = useLoadFonts([
    {
      family: fontFamily,
      url: staticFile("fonts/BahijTheSansArabicBold.ttf"),
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
        <Img src={staticFile("Covers/auk/facebook_4/md5-1.png")} />
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 1050,
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "right",
          width: "80%",
          direction: "rtl",
          color: "#ffffff",
          fontFamily,
          fontSize: 80,
        }}
      >
        {data.text_fields.text}
      </div>

      <div
        style={{
          position: "absolute",
          top: 890,
          left: 700,
          textAlign: "center",
          width: "85%",
          direction: "rtl",
          color: "#ffffff",
          fontFamily,
          fontSize: 75,
        }}
      >
        {data.text_fields.location}
        {"صين"}
      </div>
    </AbsoluteFill>
  );
}
