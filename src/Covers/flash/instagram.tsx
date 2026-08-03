import { AbsoluteFill, Img, staticFile } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import { CroppedImage } from "../../Components/CroppedImage";
import { CoverTemplateProps } from "../types";

const fontFamily = "29LTBukraBold";

export default function FlashInstagramTemplate({ data }: CoverTemplateProps) {
  const fontsLoaded = useLoadFonts([
    { family: fontFamily, url: staticFile("font_/29LTBukraBold.ttf") },
  ]);
  if (!fontsLoaded) return null;

  return (
    <AbsoluteFill>
      <CroppedImage
        src={data.imageSrc}
        crop={data.crop}
        style={{ width: "100%", height: "100%" }}
      />
      <Img
        src={staticFile("Covers/flash/insta/logo.png")}
        style={{position: "absolute", top: 250, left: 60, width: 200}}
      />
      {data.text_fields.text ? (
        <div
          style={{
            position: "absolute",
            top: 1013,
            left: 72,
            width: 955,
            padding: "35px 40px",
            boxSizing: "border-box",
            overflow: "hidden",
            backgroundColor: "#c02733",
            color: "#F2F1EC",
            fontFamily,
            borderRadius: 40,
            fontSize: 65,
            lineHeight: 1.2,
            textAlign: "center",
            direction: "rtl",
          }}
        >
          {data.text_fields.text}
        </div>
      ) : null}
    </AbsoluteFill>
  );
}
