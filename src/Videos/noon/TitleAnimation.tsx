import React, { useRef, useState, useEffect } from "react";
import {
  AbsoluteFill,
  staticFile,
  delayRender,
  continueRender,
  Sequence,
} from "remotion";
import { Audio } from "@remotion/media";
import { Lottie } from "@remotion/lottie";
import TextBoxWithShadow from "../../Components/TextBoxWithShadow";

// Import the JSON data directly
import animationData from "../../../public/noon/title/data.json";

// Duration of this animation at 30fps
export const TITLE_ANIMATION_DURATION = 217;

interface TitleAnimationProps {
  fontFamily: string;
  text1: string;
  text2: string;
}

export const TitleAnimation: React.FC<TitleAnimationProps> = ({
  fontFamily,
  text1,
  text2,
}) => {
  // Only patch the image path, keep everything else as-is
  const patchedAnimationData = {
    ...animationData,
    assets: animationData.assets.map((asset: Record<string, unknown>) => {
      // Only patch image assets (those with 'u' property)
      if (
        asset.u &&
        typeof asset.u === "string" &&
        !asset.u.startsWith("http")
      ) {
        return { ...asset, u: staticFile("noon/title/images/") };
      }
      return asset;
    }),
  };

  // Config
  const fontSize = 85;
  const paddingX = 40;
  const box1CenterY = 1062;

  // Timing (at 30fps)
  const TOTAL_DURATION_FRAMES = TITLE_ANIMATION_DURATION;
  const SEQ_DELAY = 0;

  // In Timings (converted from 25fps to 30fps: multiply by 1.2)
  const box1InStart = 1;
  const box1InEnd = 18; // 15 * 1.2
  const box2InStart = 10; // 8 * 1.2
  const box2InEnd = 28; // 23 * 1.2

  // Exit Timings (mirrors entrance at 30fps)
  const exitDuration = 18; // 15 * 1.2
  const box1ExitStart = 166; // 138 * 1.2
  const box2ExitStart = 172; // 143 * 1.2

  // Measurement
  const textRef = useRef<HTMLDivElement>(null);
  const [textWidth, setTextWidth] = useState(0);
  const [handle] = useState(() => delayRender("Measuring TitleAnimation text"));

  useEffect(() => {
    const measureCheck = async () => {
      try {
        await document.fonts.ready;
      } catch (e) {
        console.error("Font loading error", e);
      }
      let retries = 0;
      const maxRetries = 20;
      const checkWidth = () => {
        if (textRef.current && textRef.current.offsetWidth > 10) {
          setTextWidth(textRef.current.offsetWidth);
          continueRender(handle);
        } else if (retries < maxRetries) {
          retries++;
          setTimeout(checkWidth, 100);
        } else {
          if (textRef.current) setTextWidth(textRef.current.offsetWidth);
          continueRender(handle);
        }
      };
      checkWidth();
    };
    measureCheck();
  }, [handle]);

  // Alignment calculation for Lottie
  const box1CenterX = 540;
  const box1Width = textWidth > 0 ? textWidth + paddingX * 2 : 400;
  const box1RightEdge = box1CenterX + box1Width / 2;
  const targetX = box1RightEdge - 100;
  const lottieEndX = 792.5;
  const shiftX = targetX - lottieEndX;

  return (
    <AbsoluteFill style={{ direction: "rtl" }}>
      <Sequence>
        <Audio src={staticFile("noon/sounds/1.mp3")} />
      </Sequence>
      <Sequence from={30}>
        <Audio src={staticFile("noon/sounds/2.mp3")} />
      </Sequence>
      <Sequence from={148}>
        <Audio src={staticFile("noon/sounds/2.mp3")} />
      </Sequence>
      <Sequence from={160}>
        <Audio src={staticFile("noon/sounds/3.mp3")} />
      </Sequence>

      {/* Hidden text measurer */}
      <div
        ref={textRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          fontFamily: fontFamily,
          fontSize,
          fontWeight: "bold",
          whiteSpace: "nowrap",
        }}
      >
        {text1}
      </div>

      <Sequence from={SEQ_DELAY} durationInFrames={TOTAL_DURATION_FRAMES}>
        {/* Text Box 1: White */}
        <TextBoxWithShadow
          text={text1}
          boxColor="#FFFFFF"
          textColor="#0D2B39"
          y={box1CenterY}
          startFrame={box1InStart}
          opacityEndFrame={box1InEnd}
          positionStartFrame={box1InStart}
          positionEndFrame={box1InEnd}
          exitStartFrame={box1ExitStart}
          exitDuration={exitDuration}
          startY={1203}
          endY={box1CenterY}
          fontSize={fontSize}
          fontFamily={fontFamily}
          opacity={100}
        />

        {/* Text Box 2: Red */}
        <TextBoxWithShadow
          text={text2}
          boxColor="#EF5258"
          textColor="#FFFFFF"
          y={1214}
          startFrame={box2InStart}
          opacityEndFrame={box2InEnd}
          positionStartFrame={box2InStart}
          positionEndFrame={box2InEnd}
          exitStartFrame={box2ExitStart}
          exitDuration={exitDuration}
          startY={1355}
          endY={1214}
          fontSize={fontSize}
          fontFamily={fontFamily}
          opacity={100}
        />

        {/* Lottie Animation - ON TOP */}
        <div
          style={{
            position: "absolute",
            width: 1080,
            height: 1920,
            transform: `translate(${shiftX}px, -200px)`,
          }}
        >
          <Lottie
            animationData={patchedAnimationData}
            playbackRate={25 / 30} // Slow down: Lottie is 25fps, Remotion is 30fps
            style={{
              width: 1080,
              height: 1920,
            }}
          />
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
