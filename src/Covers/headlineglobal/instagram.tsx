import { AbsoluteFill, Img, staticFile } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import { CroppedImage } from "../../Components/CroppedImage";
import { CoverTemplateProps } from "../types";

const fontFamily = "TwCenMTBold";

export default function HeadlineGlobalInstagramTemplate({
  data,
}: CoverTemplateProps) {
  const fontsLoaded = useLoadFonts([
    { family: fontFamily, url: staticFile("font_/TwCenMTBold.TTF") },
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
        <Img src={staticFile("Covers/headlineglobal/insta/md5-1.png")} />
      </AbsoluteFill>
      {data.text_fields.text ? (
        <div
          style={{
            position: "absolute",
            top: 1013,
            left: 72,
            width: 955,
            padding: "34px 40px 28px",
            boxSizing: "border-box",
            overflow: "hidden",
            backgroundColor: "rgba(20, 52, 116, 0.88)",
            color: "#FFFFFF",
            borderBottom: "4px solid #FFFFFF",
            borderTopLeftRadius: 44,
            borderTopRightRadius: 44,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            fontFamily,
            fontSize: 85,
            fontWeight: 700,
            lineHeight: 1.22,
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
