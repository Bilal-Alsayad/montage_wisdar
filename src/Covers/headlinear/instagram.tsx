import {AbsoluteFill, Img, staticFile} from "remotion";
import {useLoadFonts} from "../../hooks/useLoadFonts";
import {CroppedImage} from "../../Components/CroppedImage";
import {CoverTemplateProps} from "../types";

const fontFamily = "BigVestaArabicRegular";

export default function HeadlineArInstagramTemplate({data}: CoverTemplateProps) {
  const fontsLoaded = useLoadFonts([
    {family: fontFamily, url: staticFile("font_/BigVestaArabicRegular.ttf")},
  ]);

  if (!fontsLoaded) return null;

  return (
    <AbsoluteFill>
      <CroppedImage src={data.imageSrc} crop={data.crop} style={{width: "100%", height: "100%"}} />
      <AbsoluteFill><Img src={staticFile("Covers/headlinear/insta/md5-1.png")} /></AbsoluteFill>
      {data.text_fields.text ? <div style={{position: "absolute", top: 1013, left: 72, width: 955, padding: "28px 34px", boxSizing: "border-box", overflow: "hidden", backgroundColor: "#F3F3F1", color: "#111111", borderRadius: 28, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, boxShadow: "14px 0 0 #6c6c6c", fontFamily, fontSize: 60, fontWeight: 700, lineHeight: 1.35, textAlign: "right", direction: "rtl"}}>{data.text_fields.text}</div> : null}
    </AbsoluteFill>
  );
}
