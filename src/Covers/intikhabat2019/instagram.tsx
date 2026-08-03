import { AbsoluteFill, Img, staticFile } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import { CroppedImage } from "../../Components/CroppedImage";
import { splitTitle } from "../../utils/textUtils";
import { CoverTemplateProps } from "../types";

const fontFamily = "Intikhabat2019HelveticaNeueLT";

export default function Intikhabat2019InstagramTemplate({
  data,
}: CoverTemplateProps) {
  const fontsLoaded = useLoadFonts([
    {
      family: fontFamily,
      url: staticFile("font_/HelveticaNeueLT.otf"),
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
          src={staticFile("Covers/intikhabat2019/insta/md5-1.png")}
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
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{
              width: "fit-content",
              minHeight: 110,
              padding: "0 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FFFFFF",
              color: "#111111",
              borderRadius: 18,
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            <span
              style={{
                display: "block",
                transform: "translateY(-15px)",
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
                backgroundColor: "#e10f02",
                color: "#FFFFFF",
                borderRadius: 18,
                fontSize: 58,
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              <span
                style={{
                  display: "block",
                  transform: "translateY(-10px)",
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