import { AbsoluteFill, Img, staticFile } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import { CroppedImage } from "../../Components/CroppedImage";
import { CoverTemplateProps } from "../types";

const fontFamily = "SudanPlusBold";

export default function SudanYoutube1Template({ data }: CoverTemplateProps) {
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
        <Img src={staticFile("Covers/sudan/youtube_1/md5-1.png")} />
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 525,
          left: 32,
          width: 998 ,
          height: 140 ,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          textAlign: "right",
          color: "#ffffff",
          fontFamily,
          fontSize: 50,
        }}
      >
        {data.text_fields.text}
      </div>
    </AbsoluteFill>
  );
}
