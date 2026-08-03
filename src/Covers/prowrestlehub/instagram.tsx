import {AbsoluteFill, Img, staticFile} from "remotion";
import {useLoadFonts} from "../../hooks/useLoadFonts";
import {CroppedImage} from "../../Components/CroppedImage";
import {splitTitle} from "../../utils/textUtils";
import {CoverTemplateProps} from "../types";

const fontFamily = "DroidArabicKufiBold";

export default function ProWrestleHubInstagramTemplate({data}: CoverTemplateProps) {
  const fontsLoaded = useLoadFonts([
    {family: fontFamily, url: staticFile("font_/DroidArabicKufiBold.TTF")},
  ]);
  const {text1, text2} = splitTitle(data.text_fields.text);

  if (!fontsLoaded) return null;

  return (
    <AbsoluteFill>
      <CroppedImage src={data.imageSrc} crop={data.crop} style={{width: "100%", height: "100%"}} />
      <AbsoluteFill><Img src={staticFile("Covers/prowrestlehub/insta/md5-1.png")} /></AbsoluteFill>
      {text1 ? <div style={{position: "absolute", top: 1013, left: 72, width: 955, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, fontFamily, textAlign: "center", direction: "rtl", whiteSpace: "nowrap"}}>
        <div style={{width: "fit-content", padding: "18px 34px", backgroundColor: "rgba(152 ,53, 60 ,0.82)", color: "#FFFFFF", borderRadius: 22, fontSize: 66, lineHeight: 1.1, position: "relative"}}>{text1}</div>
        {text2 ? <div style={{width: "fit-content", padding: "18px 34px", backgroundColor: "rgba(10, 10, 10, 0.78)", color: "#FFFFFF", borderRadius: 22, fontSize: 60, lineHeight: 1.1}}>{text2}</div> : null}
      </div> : null}
    </AbsoluteFill>
  );
}
