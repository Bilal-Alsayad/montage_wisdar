import { AbsoluteFill, Img, staticFile } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import { CroppedImage } from "../../Components/CroppedImage";
import { CoverTemplateProps } from "../types";

const fontFamily = "BahijTheSansArabicBold";

export default function AukFacebook7Template({ data }: CoverTemplateProps) {
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
        <Img src={staticFile("Covers/auk/facebook_7/md5-1.png")} />
      </AbsoluteFill>
      <div
      className="text-[#192a40] first-line:text-[#dec8b5]"
        style={{
          position: "absolute",
          top: 1330,
          left: "50%",
          transform: "translateX(-50%)",
          lineHeight:"200px",
          textAlign: "center",
          width: "80%",
          direction: "rtl",
          fontFamily,
          fontSize: 120,
        }}
      >
        {data.text_fields.text}
      </div>
    </AbsoluteFill>
  );
}
