import {AbsoluteFill, Img, staticFile} from "remotion";
import {useLoadFonts} from "../../hooks/useLoadFonts";
import {CroppedImage} from "../../Components/CroppedImage";
import {CoverTemplateProps} from "../types";

const fontFamily = "Tounes2020AlmaraiExtraBold";

export default function Tounes2020InstagramTemplate({data}: CoverTemplateProps) {
  const fontsLoaded = useLoadFonts([{family: fontFamily, url: staticFile("font_/Tounes2020AlmaraiExtraBold.ttf")}]);
  if (!fontsLoaded) return null;

  return <AbsoluteFill>
    <CroppedImage src={data.imageSrc} crop={data.crop} style={{width: "100%", height: "100%"}} />
    <AbsoluteFill><Img src={staticFile("Covers/tounes2020/insta/md5-1.png")} /></AbsoluteFill>
    {data.text_fields.text ? <div style={{position: "absolute", top: 1013, left: 72, width: 955, padding: "35px 40px", boxSizing: "border-box", overflow: "hidden", backgroundColor: "#FFFFFF", color: "#8F0000", borderTop: "12px solid #970B12", borderRight: "12px solid #970B12", borderRadius: 55, fontFamily, fontSize: 65, fontWeight: 700, lineHeight: 1.35, textAlign: "center", direction: "rtl"}}>{data.text_fields.text}</div> : null}
  </AbsoluteFill>;
}
