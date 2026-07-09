import { COVERS_FILES_URL } from "../../utils/constants";
import {
  AbsoluteFill,
  Img,
  delayRender,
  continueRender,
  staticFile,
} from "remotion";
import { loadFont } from "@remotion/fonts";
import { useEffect, useState } from "react";
import { CoverTemplateProps } from "../types";
import { CroppedImage } from "../../Components/CroppedImage";

const fontFamily = "Neue Plak Condensed Bold";

export default function HarmonyYoutubeTemplate({ data }: CoverTemplateProps) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const handle = delayRender("Loading still-template fonts");

    Promise.all([
      loadFont({
        family: fontFamily,
        url: staticFile("fonts/Neue_Plak_Condensed_Bold.ttf"),
      }),
    ])
      .then(() => {
        setFontsLoaded(true);
        continueRender(handle);
      })
      .catch((err) => {
        console.error("Failed to load still fonts", err);
        continueRender(handle);
      });
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000",
      }}
    >
      {/* Background Image */}
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

      {/* Title text at bottom */}
      <AbsoluteFill>
        <Img
          src={`${COVERS_FILES_URL}/harmony_youtube/md5-1.png`}
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 110,
            left: 100,
            width: "60%",
            textAlign: "left",
          }}
        >
          <div
            style={{
              direction: "ltr",
              fontFamily,
              fontSize: "150px",
              lineHeight: 1,
              color: "#fff",
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
