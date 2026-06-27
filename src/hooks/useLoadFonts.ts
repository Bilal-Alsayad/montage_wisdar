import { useState, useEffect } from "react";
import { delayRender, continueRender } from "remotion";
import { loadFont } from "@remotion/fonts";

export type FontConfig = {
  family: string;
  url: string;
  weight?: string;
  style?: "normal" | "italic" | "oblique";
};

export const useLoadFonts = (fonts: FontConfig[]) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (fonts.length === 0) {
      setFontsLoaded(true);
      return;
    }
    
    const handle = delayRender("Loading fonts");

    Promise.all(fonts.map((font) => loadFont(font)))
      .then(() => {
        setFontsLoaded(true);
        continueRender(handle);
      })
      .catch((err) => {
        console.error("Failed to load fonts", err);
        continueRender(handle);
      });
  }, []);

  return fontsLoaded;
};
