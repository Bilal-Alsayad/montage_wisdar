import { AbsoluteFill, Img, staticFile } from "remotion";
import { useLoadFonts } from "../../../hooks/useLoadFonts";
import { CroppedImage } from "../../../Components/CroppedImage";
import { CoverTemplateProps } from "../../types";
import { splitTitle } from "../../../utils/textUtils";

const fontFamily = "BahijTheSansArabicBold";

export default function SubsBeigeAukInstagramTemplate({ data }: CoverTemplateProps) {
  const loadFont = useLoadFonts([
    {
      family: fontFamily,
      url: staticFile("fonts/BahijTheSansArabicBold.ttf"),
    },
  ]);
  const { text1, text2 } = splitTitle(data.text_fields.text);

  if (!loadFont) {
    return null;
  }

  return (
    <AbsoluteFill>
      <AbsoluteFill>
        <CroppedImage
          src={data.imageSrc}
          crop={data.crop}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill>
        <Img src={staticFile("Covers/auk/subs_beige/instagram/md5-1.png")} />
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 1290,
          left: 80,
          width: 925,
          height: 130,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          textAlign: "center",
          color: "#dec8b5",
          fontFamily,
          fontSize: 65,
        }}
      >
        {text1}
      </div>
      {text2 && (
        <div
          style={{
            position: "absolute",
            top: 1455,
            left: 80,
            width: 925,
            height: 160,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            textAlign: "center",
            color: "#192a40",
            fontFamily,
            fontSize: 65,
          }}
        >
          {text2}
        </div>
      )}
    </AbsoluteFill>
  );
}
