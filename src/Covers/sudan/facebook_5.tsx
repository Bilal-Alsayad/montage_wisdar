import { AbsoluteFill, Img, staticFile } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import { CroppedImage } from "../../Components/CroppedImage";
import { CoverTemplateProps } from "../types";
import { fitText } from "@remotion/layout-utils";

const fontFamily = "SudanPlusBold";

export default function SudanFacebook5Template({ data }: CoverTemplateProps) {
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
        <Img src={staticFile("Covers/sudan/facebook_5/md5-1.png")} />
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 780,
          left: "50%",
          transform: "translateX(-50%)",
          width: 1000,
          height: 500,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          textAlign: "right",
          color: "#000",
          fontFamily,
          fontSize: 82,
        }}
      >
        {data.text_fields.text}
      </div>
      <div
        style={{
          position: "absolute",
          top: 626 ,
          left:537 ,
          textAlign: "right",
          width: 509   ,
          height: 124  ,
          direction: "rtl",
          color: "#000000",
          fontFamily,
          fontSize: Math.min(
            41,
            fitText({
              text: data.text_fields.speaker,
              withinWidth: 460,
              fontFamily,
            }).fontSize,
          ),
        }}
      >
        {data.text_fields.speaker}
      </div>
    </AbsoluteFill>
  );
}
