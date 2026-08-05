import { AbsoluteFill, Img, staticFile } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import { CroppedImage } from "../../Components/CroppedImage";
import { CoverTemplateProps } from "../types";

const fontFamily = "MontserratArabicBold";

export default function TurkHaber247TikbumInstagramTemplate({
  data,
}: CoverTemplateProps) {
  const fontsLoaded = useLoadFonts([
    { family: fontFamily, url: staticFile("font_/MontserratArabicBold.TTF") },
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
        <Img src={staticFile("Covers/turkhaber247tikbum/insta/md5-1.png")} />
      </AbsoluteFill>
      {data.text_fields.text ? (
        <div
          style={{
            position: "absolute",
            top: 1263,
            left: 102,
            width: 855,
            padding: "48px 54px",
            boxSizing: "border-box",
            overflow: "hidden",
            backgroundColor: "rgba(245, 245, 243, 0.94)",
            color: "#0A0A0A",
            borderLeft: "18px solid #A6A6A3",
            borderTopLeftRadius: 42,
            borderBottomLeftRadius: 42,
            fontFamily,
            fontSize: 40,
            textAlign: "left",
            direction: "ltr",
          }}
        >
          {data.text_fields.text}
        </div>
      ) : null}
    </AbsoluteFill>
  );
}
