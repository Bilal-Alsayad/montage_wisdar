import { AbsoluteFill, Img, staticFile } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import { CroppedImage } from "../../Components/CroppedImage";
import { splitTitle } from "../../utils/textUtils";
import { CoverTemplateProps } from "../types";

const LATO_BOLD = "LatoBold";

export default function ThetimesofpalestineInstagramTemplate({
  data,
}: CoverTemplateProps) {
  const loadFont = useLoadFonts([
    {
      family: LATO_BOLD,
      url: staticFile("thetimesofpalestine/fonts/LatoBold.ttf"),
    },
  ]);

  if (!loadFont) {
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
        <Img
          src={staticFile("Covers/thetimesofpalestine/instagram/md5-1.png")}
        />
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          top: 1140,
          left: "50%",
          transform: "translateX(-50%)",
          display: "grid",
          gridTemplateColumns: "max-content",
          gap: 16,
        }}
      >
        {text1.trim() && (
          <div
            style={{
              height: 104,
              padding: "0 20px",
              backgroundColor: "#FF0008",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              color: "#FFFFFF",
              fontFamily: LATO_BOLD,
              fontSize: 80,
              lineHeight: "100px",
            }}
          >
            {text1.trim()}
          </div>
        )}

        {text2.trim() && (
          <div
            style={{
              height: 104,
              padding: "0 20px",
              backgroundColor: "#000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              color: "#FFFFFF",
              fontFamily: LATO_BOLD,
              fontSize: 80,
              lineHeight: "100px",
            }}
          >
            {text2.trim()}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
}