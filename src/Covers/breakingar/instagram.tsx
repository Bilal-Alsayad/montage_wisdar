import {AbsoluteFill, Img, staticFile} from "remotion";
import {useLoadFonts} from "../../hooks/useLoadFonts";
import {CroppedImage} from "../../Components/CroppedImage";
import {splitTitle} from "../../utils/textUtils";
import {CoverTemplateProps} from "../types";

const fontFamily = "AlJazeeraBold";

export default function BreakingArInstagramTemplate({data}: CoverTemplateProps) {
  const fontsLoaded = useLoadFonts([
    {family: fontFamily, url: staticFile("font_/AlJazeeraBold.TTF")},
  ]);
  const {text1, text2} = splitTitle(data.text_fields.text);

  if (!fontsLoaded) return null;

  return (
    <AbsoluteFill>
      <CroppedImage
        src={data.imageSrc}
        crop={data.crop}
        style={{ width: "100%", height: "100%" }}
      />
      <AbsoluteFill>
        <Img src={staticFile("Covers/breakingar/insta/md5-1.png")} />
      </AbsoluteFill>
      {text1 ? (
        <div
          style={{
            position: "absolute",
            top: 1013,
            left: 72,
            width: 955,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#F2F2F2",
            fontFamily,
            textAlign: "center",
            direction: "rtl",
          }}
        >
          <div
            style={{
              width: "fit-content",
              padding: "14px 24px 16px",
              backgroundColor: "rgba(0,0,0,0.5)",
              borderBottom: "5px solid rgba(154, 18, 23, 0.65)",
              fontSize: 60,
              lineHeight: 1.1,
            }}
          >
            {text1}
          </div>
          {text2 ? (
            <div
              style={{
                width: "fit-content",
                backgroundColor: "rgba(0,0,0,0.5)",
                padding: "14px 24px",
                fontSize: 60,
                lineHeight: 1.1,
              }}
            >
              {text2}
            </div>
          ) : null}
        </div>
      ) : null}
    </AbsoluteFill>
  );
}
