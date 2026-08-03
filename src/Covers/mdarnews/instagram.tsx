import {AbsoluteFill, Img, staticFile} from "remotion";
import {useLoadFonts} from "../../hooks/useLoadFonts";
import {CroppedImage} from "../../Components/CroppedImage";
import {CoverTemplateProps} from "../types";

const fontFamily = "AlJazeeraBold";

export default function MdarNewsInstagramTemplate({data}: CoverTemplateProps) {
  const fontsLoaded = useLoadFonts([{family: fontFamily, url: staticFile("font_/AlJazeeraBold.TTF")}]);
  if (!fontsLoaded) return null;

  return <AbsoluteFill>
    <CroppedImage src={data.imageSrc} crop={data.crop} style={{width: "100%", height: "100%"}} />
    <AbsoluteFill><Img src={staticFile("Covers/mdarnews/insta/md5-1.png")} /></AbsoluteFill>
    {data.text_fields.text ? <div style={{position: "absolute", top: 1013, left: 72, width: 955, padding: "35px 40px", boxSizing: "border-box", overflow: "hidden", backgroundColor: "#001743", color: "#F2F1EC", fontFamily, fontSize: 65, textAlign: "center", direction: "rtl"}}>{data.text_fields.text}</div> : null}
  </AbsoluteFill>;
}
