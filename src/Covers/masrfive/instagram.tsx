import { AbsoluteFill, Img, staticFile } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import { CroppedImage } from "../../Components/CroppedImage";
import { CoverTemplateProps } from "../types";

const fontFamily = "KufyanArabicBlack";

export default function MasrFiveInstagramTemplate({
  data,
}: CoverTemplateProps) {
  const fontsLoaded = useLoadFonts([
    { family: fontFamily, url: staticFile("font_/KufyanArabicBlack.ttf") },
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
        src={staticFile("Covers/masrfive/insta/logo.png")}
        style={{ position: "absolute", top: 260, left: 110, width: 200 }}
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
            borderRadius: 30,
            overflow: "hidden",
            backgroundColor: "#0e7461",
            color: "#F2F1EC",
            fontFamily,
            fontSize: 75,
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
