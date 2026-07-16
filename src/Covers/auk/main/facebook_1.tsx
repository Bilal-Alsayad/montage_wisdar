import { AbsoluteFill, Img, staticFile } from "remotion";
import { useLoadFonts } from "../../../hooks/useLoadFonts";
import { CroppedImage } from "../../../Components/CroppedImage";
import { CoverTemplateProps } from "../../types";
import { splitTitle } from "../../../utils/textUtils";

const fontFamily = "BahijTheSansArabicBold";

export default function MainAukFacebook1Template({ data }: CoverTemplateProps) {
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
        <Img src={staticFile("Covers/auk/main/facebook_1/md5-1.png")} />
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 875,
          left: 80,
          width: 925,
          height: 130,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          textAlign: "center",
          color: "#3e58a6",
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
            top: 1040,
            left: 80,
            width: 925,
            height: 160,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            textAlign: "center",
            color: "#ffffff",
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
