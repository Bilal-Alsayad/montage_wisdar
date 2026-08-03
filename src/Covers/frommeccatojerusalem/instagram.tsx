import { AbsoluteFill, Img, staticFile } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import { CroppedImage } from "../../Components/CroppedImage";
import { CoverTemplateProps } from "../types";

const fontFamily = "AlJazeeraBold";

export default function FromMeccaToJerusalemInstagramTemplate({
  data,
}: CoverTemplateProps) {
  const fontsLoaded = useLoadFonts([
    { family: fontFamily, url: staticFile("font_/AlJazeeraBold.TTF") },
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
        src={staticFile("Covers/frommeccatojerusalem/insta/logo.png")}
        style={{ position: "absolute", top: 240, left: 70, width: 200 }}
      />
      {data.text_fields.text ? (
        <div
          style={{
            position: "absolute",
            top: 1013,
            left: 72,
            width: 955,
            padding: "40px 42px",
            backgroundColor: "#4d9776",
            color: "#F4F1EA",
            borderTop: "7px solid #F4F1EA",
            borderRight: "7px solid #F4F1EA",
            borderRadius: 28,
            fontFamily,
            fontSize: 68,
            lineHeight: 1.7,
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
