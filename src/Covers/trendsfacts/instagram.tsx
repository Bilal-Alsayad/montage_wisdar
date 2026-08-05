import { AbsoluteFill, Img, staticFile } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import { CroppedImage } from "../../Components/CroppedImage";
import { splitTitle } from "../../utils/textUtils";
import { CoverTemplateProps } from "../types";

const fontFamily = "AlJazeeraArabicRegular";

export default function TrendsFactsInstagramTemplate({
  data,
}: CoverTemplateProps) {
  const fontsLoaded = useLoadFonts([
    { family: fontFamily, url: staticFile("font_/AlJazeeraArabicRegular.ttf") },
  ]);
  const { text1, text2 } = splitTitle(data.text_fields.text);
  if (!fontsLoaded) return null;

  return (
    <AbsoluteFill>
      <CroppedImage
        src={data.imageSrc}
        crop={data.crop}
        style={{ width: "100%", height: "100%" }}
      />
      <AbsoluteFill>
        <Img src={staticFile("Covers/trendsfacts/insta/md5-1.png")} />
      </AbsoluteFill>
      {text1 ? (
        <div
          style={{
            position: "absolute",
            top: 1013,
            left: "50%",
            transform: "translateX(-50%)",
            width: 805,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            fontFamily,
            textAlign: "center",
            direction: "rtl",
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{
              width: "fit-content",
              padding: "18px 34px",
              backgroundColor: "#F7F7F7",
              color: "#00a451",
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
                padding: "17px 24px",
                backgroundColor: "#00a451",
                color: "#FFFFFF",
                fontSize: 65,
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
