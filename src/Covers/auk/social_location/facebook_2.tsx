import { fitText } from "@remotion/layout-utils";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { useLoadFonts } from "../../../hooks/useLoadFonts";
import { CroppedImage } from "../../../Components/CroppedImage";
import { CoverTemplateProps } from "../../types";

const fontFamily = "BahijTheSansArabicBold";

export default function SocialLocationAukFacebook2Template({ data }: CoverTemplateProps) {
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
        <Img src={staticFile("Covers/auk/social_location/facebook_1/md5-1.png")} />
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          top: 680,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "85%",
          textAlign: "right",
          direction: "rtl",
          color: "#ffffff",
          fontFamily,
          fontSize: 65,
        }}
      >
        {data.text_fields.text}
      </div>

      <div
        style={{
          position: "absolute",
          top: 618,
          left: 840,
          textAlign: "center",
          width: 138,
          height: 40,
          direction: "rtl",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          fontFamily,
          fontSize: Math.min(
            35,
            fitText({
              text: data.text_fields.location,
              withinWidth: 140,
              fontFamily,
            }).fontSize,
          ),
        }}
      >
        {data.text_fields.location}
      </div>
    </AbsoluteFill>
  );
}
