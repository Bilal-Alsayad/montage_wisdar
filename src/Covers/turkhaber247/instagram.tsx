import {AbsoluteFill, Img, staticFile} from "remotion";
import {useLoadFonts} from "../../hooks/useLoadFonts";
import {CroppedImage} from "../../Components/CroppedImage";
import {CoverTemplateProps} from "../types";

const fontFamily = "MONTSERRATARABICBOLD";

export default function TurkHaber247InstagramTemplate({data}: CoverTemplateProps) {
  const fontsLoaded = useLoadFonts([{family: fontFamily, url: staticFile("font_/MONTSERRATARABICBOLD.TTF")}]);
  if (!fontsLoaded) return null;

  return <AbsoluteFill>
    <CroppedImage src={data.imageSrc} crop={data.crop} style={{width: "100%", height: "100%"}} />
    <Img src={staticFile("Covers/turkhaber247/insta/logo.png")} style={{position: "absolute", top: 110, left: 70, width: 420}} />
    {data.text_fields.text ? <div style={{position: "absolute", top: 1013, left: 72, width: 955, padding: "48px 54px", boxSizing: "border-box", overflow: "hidden", backgroundColor: "rgba(245, 245, 243, 0.94)", color: "#0A0A0A", borderLeft: "18px solid #A6A6A3", borderTopLeftRadius: 42, borderBottomLeftRadius: 42, fontFamily, fontSize: 55, textAlign: "left", direction: "ltr"}}>{data.text_fields.text}</div> : null}
  </AbsoluteFill>;
}
