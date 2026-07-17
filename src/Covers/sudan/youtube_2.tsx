import { AbsoluteFill, Img, staticFile } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import { CroppedImage } from "../../Components/CroppedImage";
import { CoverTemplateProps } from "../types";

const fontFamily = "SudanPlusBold";
// const fontFamily = "SudanPlusLight";

export default function SudanYoutube2Template({ data }: CoverTemplateProps) {
  const loadFont = useLoadFonts([
    {
      family: fontFamily,
      url: staticFile("fonts/SudanPlusBold.otf"),
    },
    // {
    //   family: fontFamily,
    //   url: staticFile("fonts/SudanPlusLight.otf"),
    // },
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
        <Img src={staticFile("Covers/sudan/youtube_2/md5-1.png")} />
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 678,
          right: 60,
          width: 220,
          height: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          textAlign: "right",
          color: "#ffffff",
          fontFamily,
          fontSize: 27,
        }}
      >
        {data.text_fields.source}
      </div>
      <div
        style={{
          position: "absolute",
          top: 637,
          right: 60,
          textAlign: "right",
          width: 80  ,
          height: 30,
          direction: "rtl",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily,
          fontSize: 25,
        }}
      >
        {data.text_fields.location}
      </div>
    </AbsoluteFill>
  );
}
