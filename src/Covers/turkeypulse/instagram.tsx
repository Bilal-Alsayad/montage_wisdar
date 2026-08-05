import { AbsoluteFill, Img, staticFile } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import { CroppedImage } from "../../Components/CroppedImage";
import { splitTitle } from "../../utils/textUtils";
import { CoverTemplateProps } from "../types";

const fontFamily = "HuwiyaArabicBold";

export default function TurkeyPulseInstagramTemplate({
  data,
}: CoverTemplateProps) {
  const fontsLoaded = useLoadFonts([
    { family: fontFamily, url: staticFile("font_/HuwiyaArabicBold.otf") },
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
        <Img src={staticFile("Covers/turkeypulse/insta/md5-1.png")} />
      </AbsoluteFill>
      {text1 ? (
        <div
          style={{
            position: "absolute",
            top: 1013,
            left: 72,
            width: 955,
            display: "flex",
            justifyContent: "center",
            fontFamily,
            textAlign: "center",
            direction: "rtl",
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{
              width: "fit-content",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div
              style={{
                width: "100%",
                padding: "18px 30px",
                boxSizing: "border-box",
                backgroundColor: "#ffffff",
                color: "#020202",
                fontSize: 70,
                lineHeight: 1.1,
              }}
            >
              {text1}
            </div>
            {text2 ? (
              <div
                style={{
                  width: "100%",
                  padding: "18px 28px",
                  boxSizing: "border-box",
                  backgroundColor: "#ff0100",
                  color: "#FFFFFF",
                  fontSize: 59,
                  lineHeight: 1.1,
                }}
              >
                {text2}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </AbsoluteFill>
  );
}
