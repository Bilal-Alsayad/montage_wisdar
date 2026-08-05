import { AbsoluteFill, Img, staticFile } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import { CroppedImage } from "../../Components/CroppedImage";
import { CoverTemplateProps } from "../types";

const fontFamily = "AlarabyTelevisionBold";

export default function Breaking24InstagramTemplate({
  data,
}: CoverTemplateProps) {
  const fontsLoaded = useLoadFonts([
    { family: fontFamily, url: staticFile("font_/AlarabyTelevisionBold.ttf") },
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
        src={staticFile("Covers/breaking24/insta/logo.png")}
        style={{ position: "absolute", top: 200, left: 110, width: 230 }}
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
            backgroundColor: "#d5210b",
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
