import { AbsoluteFill, Img, staticFile } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import { CroppedImage } from "../../Components/CroppedImage";
import { CoverTemplateProps } from "../types";

const fontFamily = "Anton Regular";

export default function MeeFacebookTemplate({ data }: CoverTemplateProps) {
  const loadFont = useLoadFonts([
    {
      family: fontFamily,
      url: staticFile("fonts/AntonRegular.ttf"),
    },
  ]);

  if (!loadFont) {
    return null;
  }
  
  const fontSize =data.fontSize ?? 120

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
        <Img src={staticFile("Covers/mee/mee_facebook/md5-1.png")} />

        <div
          style={{
            position: "absolute",
            top: 840,
            left:"50%", //daha iyi pls kalsin :P
            transform:"translateX(-50%)",
            width: "80%",
            textAlign: "center",
          }}
        >
          <div
            className="text-[#f9ad17] first-line:text-white"
            style={{
              fontFamily,
              fontSize,
              lineHeight: 1.1,
              textTransform: "uppercase",
            }}
          >
            {data.text_fields.text}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
