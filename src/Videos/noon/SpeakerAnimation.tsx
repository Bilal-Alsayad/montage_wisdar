import React, { useRef, useState, useEffect } from "react";
import {
  AbsoluteFill,
  staticFile,
  delayRender,
  continueRender,
  Sequence,
} from "remotion";
import { Lottie } from "@remotion/lottie";
import { Audio } from "@remotion/media";
import TextBoxWithShadow from "../../Components/TextBoxWithShadow";

// Import the JSON data directly
import animationData from "../../../public/noon/speaker/data.json";

// Duration of this animation at 30fps (150 frames @ 25fps * 1.2)
export const SPEAKER_ANIMATION_DURATION = 180;

interface SpeakerAnimationProps {
  fontBoldFamily: string;
  fontMediumFamily: string;
  nameText: string;
  descriptionText: string;
}

export const SpeakerAnimation: React.FC<SpeakerAnimationProps> = ({
  fontBoldFamily,
  fontMediumFamily,
  nameText,
  descriptionText,
}) => {
  // Patch image paths in Lottie
  const patchedAnimationData = {
    ...animationData,
    assets: animationData.assets.map((asset: Record<string, unknown>) => {
      if (
        asset.u &&
        typeof asset.u === "string" &&
        !asset.u.startsWith("http")
      ) {
        return { ...asset, u: staticFile("noon/speaker/images/") };
      }
      return asset;
    }),
  };

  // Config (from original Lottie)
  const nameFontSize = 56;
  const descFontSize = 35;
  const nameY = 1132;
  const descY = 1205;

  // Timing (at 30fps)
  // Entrance
  const box1InStart = 0;
  const box1InEnd = 21;
  const box2InStart = 10;
  const box2InEnd = 37;

  // Exit (reverse of entrance - box2 exits first, then box1)
  const exitDuration = 21; // Same as entrance duration
  const box2ExitStart = 130; // ~108 @ 25fps - when hero starts exiting
  const box1ExitStart = box2ExitStart + 10; // Same delay as entrance (reversed)

  // Text measurement
  const textRef = useRef<HTMLDivElement>(null);
  const [_, setTextWidth] = useState(0);
  const [handle] = useState(() =>
    delayRender("Measuring SpeakerAnimation text"),
  );

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

  return (
    <AbsoluteFill>
      <Sequence>
        <Audio src={staticFile("noon/sounds/speaker.mp3")} />
      </Sequence>
      <Sequence from={158}>
        <Audio src={staticFile("noon/sounds/speaker.mp3")} />
      </Sequence>
      {/* Hidden text measurer */}
      <div
        ref={textRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          fontFamily: fontBoldFamily,
          fontSize: nameFontSize,
          fontWeight: "bold",
          whiteSpace: "nowrap",
        }}
      >
        {nameText}
      </div>

      <Sequence from={0} durationInFrames={SPEAKER_ANIMATION_DURATION}>
        {/* Text Box 1: White (Name) */}
        <TextBoxWithShadow
          text={nameText}
          boxColor="#FFFFFF"
          textColor="#0E2B39"
          x={160}
          y={nameY}
          startFrame={box1InStart}
          opacityEndFrame={box1InEnd}
          positionStartFrame={box1InStart}
          positionEndFrame={box1InEnd}
          exitStartFrame={box1ExitStart}
          exitDuration={exitDuration}
          startY={nameY - 50}
          endY={nameY}
          fontSize={nameFontSize}
          fontFamily={fontBoldFamily}
          paddingX={40}
          paddingY={14}
          borderRadius={14}
          opacity={100}
          align="right"
        />

        {/* Text Box 2: Yellow (Description) */}
        <TextBoxWithShadow
          text={descriptionText}
          boxColor="#FFD350"
          textColor="#0E2B39"
          x={160}
          y={descY}
          startFrame={box2InStart}
          opacityEndFrame={box2InEnd}
          positionStartFrame={box2InStart}
          positionEndFrame={box2InEnd}
          exitStartFrame={box2ExitStart}
          exitDuration={exitDuration}
          startY={descY - 40}
          endY={descY}
          fontSize={descFontSize}
          fontFamily={fontMediumFamily}
          paddingX={40}
          paddingY={10}
          borderRadius={12}
          opacity={100}
          align="right"
        />

        {/* Hero Object from Lottie */}
        <Lottie
          animationData={patchedAnimationData}
          playbackRate={25 / 30}
          style={{
            width: 1080,
            height: 1920,
            transform: "translateY(-100px)",
          }}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
