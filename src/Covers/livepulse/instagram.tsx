import {AbsoluteFill, staticFile} from "remotion";
import {useLoadFonts} from "../../hooks/useLoadFonts";
import {CroppedImage} from "../../Components/CroppedImage";
import {splitTitle} from "../../utils/textUtils";
import {CoverTemplateProps} from "../types";

const fontFamily = "AlJazeeraBold";

export default function LivePulseInstagramTemplate({data}: CoverTemplateProps) {
  const fontsLoaded = useLoadFonts([{family: fontFamily, url: staticFile("font_/AlJazeeraBold.TTF")}]);
  const {text1, text2} = splitTitle(data.text_fields.text);
  if (!fontsLoaded) return null;

  return <AbsoluteFill>
    <CroppedImage src={data.imageSrc} crop={data.crop} style={{width: "100%", height: "100%"}} />
    {text1 ? <div style={{position: "absolute", top: 1013, left: 72, width: 955, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16, fontFamily, textAlign: "center", direction: "rtl", whiteSpace: "nowrap"}}>
      <div style={{width: "fit-content", padding: "16px 34px", backgroundColor: "#5f7c96", color: "#F4F1EA", fontSize: 64, lineHeight: 1.1, clipPath: "polygon(5% 0, 100% 0, 100% 100%, 0 100%)", borderRight: "12px solid #F2352F"}}>{text1}</div>
      {text2 ? <div style={{width: "fit-content", padding: "16px 34px", backgroundColor: "#F3F3F1", color: "#C93C2C", fontSize: 64, lineHeight: 1.1, clipPath: "polygon(5% 0, 100% 0, 100% 100%, 0 100%)", borderRight: "12px solid #F2352F"}}>{text2}</div> : null}
    </div> : null}
  </AbsoluteFill>;
}
