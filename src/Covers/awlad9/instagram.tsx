import {AbsoluteFill, Img, staticFile} from "remotion";
import {useLoadFonts} from "../../hooks/useLoadFonts";
import {CroppedImage} from "../../Components/CroppedImage";
import {CoverTemplateProps} from "../types";

const fontFamily = "Awlad9HandelGothicArabicHeavy";

export default function Awlad9InstagramTemplate({data}: CoverTemplateProps) {
  const fontsLoaded = useLoadFonts([{family: fontFamily, url: staticFile("font_/HandelGothicArabicHeavy.ttf")}]);
  if (!fontsLoaded) return null;

  return <AbsoluteFill>
    <CroppedImage src={data.imageSrc} crop={data.crop} style={{width: "100%", height: "100%"}} />
    <AbsoluteFill><Img src={staticFile("Covers/awlad9/insta/md5-1.png")} /></AbsoluteFill>
    {data.text_fields.text ? <div style={{position: "absolute", top: 1013, left: 72, width: 955, padding: "20px 30px", overflow: "hidden", color: "#FFFFFF", borderRight: "8px solid #9b0707", display: "flex", alignItems: "center", justifyContent: "center", fontFamily, fontSize: 65, lineHeight: 1.15, textAlign: "right", direction: "rtl", textShadow: "0 3px 4px rgba(0, 0, 0, 0.65)"}}>{data.text_fields.text}</div> : null}
  </AbsoluteFill>;
}
