import { AbsoluteFill, Img, staticFile } from "remotion";
import { useLoadFonts } from "../../../hooks/useLoadFonts";
import { CroppedImage } from "../../../Components/CroppedImage";
import { CoverTemplateProps } from "../../types";

const fontFamily = "BahijTheSansArabicBold";

export default function UrgentAukFacebook2Template({ data }: CoverTemplateProps) {
  const loadFont = useLoadFonts([
    {
      family: fontFamily,
      url: staticFile("fonts/BahijTheSansArabicBold.ttf"),
    },
  ]);

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
        <Img src={staticFile("Covers/auk/urgent/facebook_1/md5-1.png")} />
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 695,
          left: 52,
          width: 985,
          height: 245,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          textAlign: "center",
          color: "#ffffff",
          fontFamily,
          fontSize: 65,
        }}
      >
        {data.text_fields.text}
      </div>
    </AbsoluteFill>
  );
}
