import { AbsoluteFill, Img, staticFile } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import { CroppedImage } from "../../Components/CroppedImage";
import { CoverTemplateProps } from "../types";

const fontFamily = "SudanPlusBold";

export default function SudanInstagram1Template({ data }: CoverTemplateProps) {
  const loadFont = useLoadFonts([
    {
      family: fontFamily,
      url: staticFile("fonts/SudanPlusBold.otf"),
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
        <Img src={staticFile("Covers/sudan/instagram_1/md5-1.png")} />
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 1200,
          left: "50%",
          transform: "translateX(-50%)",
          width:920,
          height:445,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          textAlign: "center",
          color: "#fff",
          fontFamily,
          fontSize: 56,
        }}
      >
        {data.text_fields.text}
      </div>
    </AbsoluteFill>
  );
}
