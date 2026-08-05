import { AbsoluteFill, Img, staticFile } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import { CroppedImage } from "../../Components/CroppedImage";
import { CoverTemplateProps } from "../types";

const fontFamily = "OmniaNaskhBold";

export default function ArabVarietyInstagramTemplate({
  data,
}: CoverTemplateProps) {
  const fontsLoaded = useLoadFonts([
    { family: fontFamily, url: staticFile("font_/OmniaNaskhBold.otf") },
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
        <Img src={staticFile("Covers/arabvariety/insta/md5-1.png")} />
      </AbsoluteFill>
      {data.text_fields.text ? (
        <div
          style={{
            position: "absolute",
            top: 1013,
            left: 72,
            width: 955,
            padding: "30px 42px",
            backgroundColor: "#F8F1E8",
            color: "#7C2F1F",
            border: "15px solid #7C2F1F",
            borderRadius: 54,
            fontFamily,
            fontSize: 66,
            lineHeight: 1.42,
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
