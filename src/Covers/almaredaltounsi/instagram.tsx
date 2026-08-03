import { AbsoluteFill, Img, staticFile } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import { CroppedImage } from "../../Components/CroppedImage";
import { CoverTemplateProps } from "../types";

const fontFamily = "AlmaredaltounsiGESSSTwoMedium";

export default function AlmaredaltounsiInstagramTemplate({
  data,
}: CoverTemplateProps) {
  const fontsLoaded = useLoadFonts([
    { family: fontFamily, url: staticFile("font_/GE_SS_Two_Medium.otf") },
  ]);
  if (!fontsLoaded) return null;

  return (
    <AbsoluteFill>
      <CroppedImage
        src={data.imageSrc}
        crop={data.crop}
        style={{ width: "100%", height: "100%" }}
      />
      <AbsoluteFill>
        <Img src={staticFile("Covers/almaredaltounsi/insta/md5-1.png")} />
      </AbsoluteFill>
      {data.text_fields.text ? (
        <div
          style={{
            position: "absolute",
            top: 1013,
            left: 72,
            width: 955,
            padding: "35px 30px",
            boxSizing: "border-box",
            overflow: "hidden",
            background:
              "radial-gradient(circle at 50% 45%, #a20f0b 0%, #8f0c08 55%, #720906 100%)",
            color: "#FFFFFF",
            border: "8px solid #D5A45A",
            borderRadius: 0,
            boxShadow:
              "inset 0 0 0 4px #6B2E1E, inset 0 0 0 7px #B77A39, 0 0 0 2px #71331F",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily,
            fontSize: 65,
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
