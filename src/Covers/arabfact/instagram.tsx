import {AbsoluteFill, Img, staticFile} from "remotion";
import {useLoadFonts} from "../../hooks/useLoadFonts";
import {CroppedImage} from "../../Components/CroppedImage";
import {splitTitle} from "../../utils/textUtils";
import {CoverTemplateProps} from "../types";

const fontFamily = "ArabFactBold";

export default function ArabFactInstagramTemplate({data}: CoverTemplateProps) {
  const fontsLoaded = useLoadFonts([
    {family: fontFamily, url: staticFile("font_/ArabFactBold.TTF")},
  ]);
  const {text1, text2} = splitTitle(data.text_fields.text);

  if (!fontsLoaded) return null;

  return (
    <AbsoluteFill>
      <CroppedImage src={data.imageSrc} crop={data.crop} style={{width: "100%", height: "100%"}} />
      <AbsoluteFill><Img src={staticFile("Covers/arabfact/insta/md5-1.png")} /></AbsoluteFill>
      {text1 ? <div style={{position: "absolute", top: 1013, left: 72, width: 955, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "#FFFFFF", fontFamily, textAlign: "center", direction: "rtl", whiteSpace: "nowrap"}}>
        <div style={{width: "fit-content", padding: "20px 30px", backgroundColor: "rgba(184, 39, 29, 0.86)", borderRadius: 38, fontSize: 72, lineHeight: 1.15}}>{text1}</div>
        {text2 ? <div style={{width: "fit-content", padding: "22px 30px", backgroundColor: "rgba(91, 111, 193, 0.84)", borderRadius: 38, fontSize: 68, lineHeight: 1.15}}>{text2}</div> : null}
      </div> : null}
    </AbsoluteFill>
  );
}
