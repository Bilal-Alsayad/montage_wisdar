import { AbsoluteFill, Img, staticFile } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import { CroppedImage } from "../../Components/CroppedImage";
import { splitTitle } from "../../utils/textUtils";
import { CoverTemplateProps } from "../types";

const fontFamily = "SwissraCondensedHeavy";

export default function TurkpressYoutubeTemplate({
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
        <Img src={staticFile("Covers/turkpress/youtube/md5-1.png")} />
      </AbsoluteFill>


      {text1 ? (
        <div
          style={{
            position: "absolute",
            top:643,
            left:833,
            width:984,
            height:129,

            display: "flex",
            alignItems: "center",
            justifyContent: "right",

            fontFamily,
            fontSize: 65,
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
            top:812,
            left:833,
            width:984,
            height:129,

            display: "flex",
            alignItems: "center",
            justifyContent: "right",

            fontFamily,
            fontSize: 65,
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