import { AbsoluteFill, Img, staticFile } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import { CroppedImage } from "../../Components/CroppedImage";
import { CoverTemplateProps } from "../types";

const fontFamily = "SudanPlusBold";

export default function SudanFacebook3Template({ data }: CoverTemplateProps) {
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
        <Img src={staticFile("Covers/sudan/facebook_3/md5-1.png")} />
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 980,
          left: "50%",
          transform: "translateX(-50%)",
          width:910,
          height:256,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          textAlign: "right",
          color: "#fff",
          fontFamily,
          fontSize: 63,
        }}
      >
        {data.text_fields.text}
      </div>
    </AbsoluteFill>
  );
}
