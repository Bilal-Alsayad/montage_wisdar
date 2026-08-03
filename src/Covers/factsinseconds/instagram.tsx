import {AbsoluteFill, Img, staticFile} from "remotion";
import {useLoadFonts} from "../../hooks/useLoadFonts";
import {CroppedImage} from "../../Components/CroppedImage";
import {CoverTemplateProps} from "../types";

const fontFamily = "FrutigerLTArabicBlack";

export default function FactsInSecondsInstagramTemplate({data}: CoverTemplateProps) {
  const fontsLoaded = useLoadFonts([{family: fontFamily, url: staticFile("font_/FrutigerLTArabicBlack.ttf")}]);
  if (!fontsLoaded) return null;

  return <AbsoluteFill>
    <CroppedImage src={data.imageSrc} crop={data.crop} style={{width: "100%", height: "100%"}} />
    <Img src={staticFile("Covers/factsinseconds/insta/logo.png")} style={{position: "absolute", top: 280, left: 110, width: 200}} />
    {data.text_fields.text ? <div style={{position: "absolute", top: 913, left: 72, width: 955, padding: "35px 40px", boxSizing: "border-box", overflow: "hidden", border: "5px solid #55C7EA", borderRadius: 42, backgroundColor: "#F2F1EC", color: "#082f59", fontFamily, fontSize: 75, lineHeight: 1.2, textAlign: "center", direction: "rtl"}}>{data.text_fields.text}</div> : null}
  </AbsoluteFill>;
}
