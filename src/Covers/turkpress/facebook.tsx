import { AbsoluteFill, Img, staticFile } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import { CroppedImage } from "../../Components/CroppedImage";
import { splitTitle } from "../../utils/textUtils";
import { CoverTemplateProps } from "../types";
import { fitText } from "@remotion/layout-utils";

const fontFamily = "SwissraCondensedHeavy";

export default function TurkpressFacebookTemplate({
  data,
}: CoverTemplateProps) {
  const fontsLoaded = useLoadFonts([
    {
      family: fontFamily,
      url: staticFile("fonts/Almarai-ExtraBold.ttf"),
    },
  ]);

  if (!fontsLoaded) {
    return null;
  }

  const { text1, text2 } = splitTitle(data.text_fields.text);

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
        <Img src={staticFile("Covers/turkpress/facebook/md5-1.png")} />
      </AbsoluteFill>

      {text1 ? (
        <div
          style={{
            position: "absolute",
            top: 870,
            left: 330,
            width: 645,
            height: 91,

            display: "flex",
            alignItems: "center",
            justifyContent: "right",

            fontFamily,
            fontSize: Math.min(
              65,
              fitText({
                text: data.text_fields.location,
                withinWidth: 645,
                fontFamily,
              }).fontSize,
            ),
            lineHeight: 121,
            color: "#ffffff",
            direction: "rtl",
            textAlign: "right",
          }}
        >
          {text1}
        </div>
      ) : null}

      {text2 ? (
        <div
          style={{
            position: "absolute",
            top: 768,
            left: 330,
            width: 645,
            height: 85,

            display: "flex",
            alignItems: "center",
            justifyContent: "right",

            fontFamily,
            fontSize: Math.min(
              65,
              fitText({
                text: data.text_fields.location,
                withinWidth: 645,
                fontFamily,
              }).fontSize,
            ),
            lineHeight: 121,
            color: "#ffffff",
            direction: "rtl",
            textAlign: "right",
          }}
        >
          {text2}
        </div>
      ) : null}
    </AbsoluteFill>
  );
}