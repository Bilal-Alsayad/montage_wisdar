import { AbsoluteFill, Img, staticFile } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import { CroppedImage } from "../../Components/CroppedImage";
import { CoverTemplateProps } from "../types";

const fontFamily = "NotoKufiArabic";

export default function CampPostInstagramTemplate({ data }: CoverTemplateProps) {
  const loadFont = useLoadFonts([
    {
      family: fontFamily,
      url: staticFile("fonts/NotoKufiArabic.ttf"),
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
        <Img src={staticFile("Covers/camppost/md5-1.png")} />
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          top: 323,
          left: "50%",
          transform: "translateX(-50%)",
          width: 605,
          height: 170,
          textAlign: "center",
          fontFamily: "Noto Kufi Arabic",
          fontSize: 62,
          color: "#FFFFFF",
        }}
      >
        {data.text_fields.text}
      </div>
    </AbsoluteFill>
  );
}