import {AbsoluteFill, Img, staticFile} from "remotion";
import {useLoadFonts} from "../../hooks/useLoadFonts";
import {CroppedImage} from "../../Components/CroppedImage";
import {CoverTemplateProps} from "../types";

const fontFamily = "ITCHandelGothicArabicHeavy";

export default function Arabi21SportIbrahimInstagramTemplate({data}: CoverTemplateProps) {
  const fontsLoaded = useLoadFonts([
    {family: fontFamily, url: staticFile("font_/ITCHandelGothicArabicHeavy.ttf")},
  ]);

  if (!fontsLoaded) return null;

  return (
    <AbsoluteFill>
      <CroppedImage src={data.imageSrc} crop={data.crop} style={{width: "100%", height: "100%"}} />
      <Img src={staticFile("Covers/arabi21sportibrahim/insta/logo.png")} style={{position: "absolute", top: 180, left: 110, width: 160}} />
      {data.text_fields.text ? <div style={{position: "absolute", top: 1013, left: 72, width: 955, padding: "35px 40px", boxSizing: "border-box", overflow: "hidden", backgroundColor: "#84C57F", color: "#FFFFFF", borderTop: "8px solid #FFFFFF", borderRight: "8px solid #FFFFFF", borderRadius: 55, fontFamily, fontSize: 65, fontWeight: 700, lineHeight: 1.45, textAlign: "center", direction: "rtl"}}>{data.text_fields.text}</div> : null}
    </AbsoluteFill>
  );
}
