import {AbsoluteFill, Img, staticFile} from "remotion";
import {useLoadFonts} from "../../hooks/useLoadFonts";
import {CroppedImage} from "../../Components/CroppedImage";
import {CoverTemplateProps} from "../types";

const fontFamily = "InfoplusHacenTunisiaBold";

export default function InfoplusInstagramTemplate({data}: CoverTemplateProps) {
  const fontsLoaded = useLoadFonts([{family: fontFamily, url: staticFile("font_/infoplus-HacenTunisiaBold.ttf")}]);
  if (!fontsLoaded) return null;

  return <AbsoluteFill>
    <CroppedImage src={data.imageSrc} crop={data.crop} style={{width: "100%", height: "100%"}} />
    <AbsoluteFill><Img src={staticFile("Covers/infoplus/insta/md5-1.png")} /></AbsoluteFill>
    {data.text_fields.text ? <div style={{position: "absolute", top: 1013, left: 72, width: 955, padding: "28px 35px 32px", overflow: "hidden", backgroundColor: "#db0006", color: "#FFFFFF", borderBottomRightRadius: 110, borderTopLeftRadius: 110, display: "flex", alignItems: "center", justifyContent: "center", fontFamily, fontSize: 65, lineHeight: 1.3, textAlign: "center", direction: "rtl"}}>{data.text_fields.text}</div> : null}
  </AbsoluteFill>;
}
