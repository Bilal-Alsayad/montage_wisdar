import { AbsoluteFill, Img, staticFile } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import { CroppedImage } from "../../Components/CroppedImage";
import { splitTitle } from "../../utils/textUtils";
import { CoverTemplateProps } from "../types";

const fontFamily = "HacenTunisiaBold";

export default function NewsArInstagramTemplate({ data }: CoverTemplateProps) {
  const fontsLoaded = useLoadFonts([
    { family: fontFamily, url: staticFile("font_/HacenTunisiaBold.TTF") },
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
        <Img src={staticFile("Covers/newsar/insta/md5-1.png")} />
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
            gap: 14,
            fontFamily,
            textAlign: "center",
            direction: "rtl",
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{
              width: "fit-content",
              padding: "22px 30px",
              backgroundColor: "#F7F7F7",
              color: "#09232C",
              borderRadius: 5,
              fontSize: 64,
              lineHeight: 1.15,
            }}
          >
            {text1}
          </div>
          {text2 ? (
            <div
              style={{
                width: "fit-content",
                padding: "22px 30px",
                backgroundColor: "#050505",
                color: "#FFFFFF",
                borderRadius: 5,
                fontSize: 61,
                lineHeight: 1.15,
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
