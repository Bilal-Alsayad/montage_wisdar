import { AbsoluteFill, Img, staticFile } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import { CroppedImage } from "../../Components/CroppedImage";
import { splitTitle } from "../../utils/textUtils";
import { CoverTemplateProps } from "../types";

const SWISSRA_CONDENSED_HEAVY = "SwissraCondensedHeavy";

export default function IrsalInstagramTemplate({
  data,
}: CoverTemplateProps) {
  const fontsLoaded = useLoadFonts([
    {
      family: SWISSRA_CONDENSED_HEAVY,
      url: staticFile("fonts/SwissraCondensedHeavy.otf"),
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

      <div
        style={{
          position: "absolute",
          left: 250,
          top: 532,
          transform: "scale(0.94)",
          transformOrigin: "top left",
        }}
      >
        <Img
          src={staticFile("Covers/irsal/logo.png")}
          style={{
            position: "absolute",
            left: -1350,
            top: 1060,
            maxWidth: "none",
          }}
        />
      </div>

{/* AI */}

      {text1 ? (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 1283.648,
            transform: "translate(-50%, -50%)",
            height: 110,
            padding: "0 37.5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#BFBFBF",
              transform: "skewX(20deg)",
            }}
          />

          <div
            style={{
              position: "relative",
              fontFamily: SWISSRA_CONDENSED_HEAVY,
              fontSize: 55,
              lineHeight: 1,
              color: "#000000",
              direction: "rtl",
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            {text1}
          </div>
        </div>
      ) : null}

      {text2 ? (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 1403.648,
            transform: "translate(-50%, -50%)",
            height: 110,
            padding: "0 37.5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#D29218",
              transform: "skewX(15deg)",
            }}
          />

          <div
            style={{
              position: "relative",
              fontFamily: SWISSRA_CONDENSED_HEAVY,
              fontSize: 55,
              lineHeight: 1,
              color: "#FFFFFF",
              direction: "rtl",
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            {text2}
          </div>
        </div>
      ) : null}
{/* AI */}
    </AbsoluteFill>
  );
}