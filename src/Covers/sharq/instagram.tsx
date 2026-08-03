import { AbsoluteFill, Img, staticFile } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import { CroppedImage } from "../../Components/CroppedImage";
import { splitTitle } from "../../utils/textUtils";
import { CoverTemplateProps } from "../types";

const fontFamily = "DINNextArabicBold";

export default function SharqInstagramTemplate({ data }: CoverTemplateProps) {
  const fontsLoaded = useLoadFonts([
    {
      family: fontFamily,
      url: staticFile("font_/DINNextArabicBold.otf"),
    },
  ]);

  const { text1, text2 } = splitTitle(data.text_fields.text);

  if (!fontsLoaded) return null;

  return (
    <AbsoluteFill>
      <CroppedImage
        src={data.imageSrc}
        crop={data.crop}
        style={{
          width: "100%",
          height: "100%",
        }}
      />

      <AbsoluteFill>
        <Img
          src={staticFile("Covers/sharq/insta/md5-1.png")}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
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
            gap: 10,
            fontFamily,
            textAlign: "center",
            direction: "rtl",
          }}
        >
          <div
            style={{
              width: "fit-content",
              minHeight: 113,
              padding: "0 30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#ff9934",
              color: "#FFFFFF",
              borderRadius: 18,
              fontSize: 70,
            }}
          >
            <span
              style={{
                display: "block",
                transform: "translateY(-10px)",
              }}
            >
              {text1}
            </span>
          </div>

          {text2 ? (
            <div
              style={{
                width: "fit-content",
                minHeight: 103,
                padding: "0 28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#B3282D",
                color: "#FFFFFF",
                borderRadius: 18,
                fontSize: 59,
              }}
            >
              <span
                style={{
                  display: "block",
                  transform: "translateY(-10px)", //yazi tam ortaya gelmedigiicin bunu kullandigm sorun fonttan :P
                }}
              >
                {text2}
              </span>
            </div>
          ) : null}
        </div>
      ) : null}
    </AbsoluteFill>
  );
}
