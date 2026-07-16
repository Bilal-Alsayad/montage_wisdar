import { AbsoluteFill, Img, staticFile } from "remotion";
import { useLoadFonts } from "../../../hooks/useLoadFonts";
import { CroppedImage } from "../../../Components/CroppedImage";
import { CoverTemplateProps } from "../../types";
import { splitTitle } from "../../../utils/textUtils";

const fontFamily = "BahijTheSansArabicBold";

export default function SubsBeigeAukYoutubeTemplate({ data }: CoverTemplateProps) {
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
        <Img src={staticFile("Covers/auk/subs_beige/youtube/md5-1.png")} />
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 640,
          left: "50%",
          transform: "translateX(-50%)",
          lineHeight: "150px",
          textAlign: "center",
          width: "50%",
          direction: "rtl",
          color: "#dec8b5",
          fontFamily,
          fontSize: 80,
        }}
      >
        {text1}
      </div>
      {text2 && (
        <div
          style={{
            position: "absolute",
            top: 790,
            left: "50%",
            transform: "translateX(-50%)",
            lineHeight: "150px",
            textAlign: "center",
            width: "50%",
            direction: "rtl",
            color: "#192a40",
            fontFamily,
            fontSize: 80,
          }}
        >
          {text2}
        </div>
      )}
    </AbsoluteFill>
  );
}
