import {AbsoluteFill, Img, staticFile} from "remotion";
import {useLoadFonts} from "../../hooks/useLoadFonts";
import {CroppedImage} from "../../Components/CroppedImage";
import {splitTitle} from "../../utils/textUtils";
import {CoverTemplateProps} from "../types";

const fontFamily = "TajawalBold";

export default function News247InstagramTemplate({data}: CoverTemplateProps) {
  const fontsLoaded = useLoadFonts([
    {family: fontFamily, url: staticFile("font_/TajawalBold.TTF")},
  ]);
  const {text1, text2} = splitTitle(data.text_fields.text);

  if (!fontsLoaded) return null;

  return (
    <AbsoluteFill>
      <CroppedImage src={data.imageSrc} crop={data.crop} style={{width: "100%", height: "100%"}} />
      <AbsoluteFill><Img src={staticFile("Covers/247news/insta/md5-1.png")} /></AbsoluteFill>
      {text1 ? <div style={{position: "absolute", top: 1013, left: 72, width: 955, display: "flex", flexDirection: "column", alignItems: "center", color: "#FFFFFF", fontFamily, fontSize: 65, lineHeight: 1.05, textAlign: "center", direction: "rtl"}}>
        <div style={{width: "fit-content", maxWidth: "100%", padding: "20px 42px", backgroundColor: "rgba(18, 36, 130, 0.92)", whiteSpace: "nowrap"}}>{text1}</div>
        {text2 ? <div style={{width: "fit-content", maxWidth: "100%", padding: "20px 42px", backgroundColor: "#2438A5", whiteSpace: "nowrap"}}>{text2}</div> : null}
      </div> : null}
    </AbsoluteFill>
  );
}
