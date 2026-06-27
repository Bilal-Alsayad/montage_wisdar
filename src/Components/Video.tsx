import { Img, Sequence, useVideoConfig } from "remotion";
import { Video as RemotionVideo } from "@remotion/media";
import { parseMedia } from "@remotion/media-parser";
import { useState, useEffect } from "react";
import { delayRender, continueRender } from "remotion";

interface Blur {
  top_left: [number, number];
  bottom_right: [number, number];
  blur_gain: number;
  spread: number;
}

interface SequenceProps {
  start: number;
  end: number;
  crop: {
    top_left: [number, number];
    bottom_right: [number, number];
  };
  blur: Blur[];
  volume: number;
  videoSrc: string;
}

interface FitWidthVideoProps {
  sequence: SequenceProps;
  videoSrc: string;
  style: React.CSSProperties;
  srcW: number;
  srcH: number;
  backgroundUrl: string;
}

interface ScalledVideoProps {
  sequence: SequenceProps;
  videoSrc: string;
  style: React.CSSProperties;
  srcW: number;
  srcH: number;
}

function BlurOverlay({ blur }: { blur: Blur }) {
  const blurW = blur.bottom_right[0] - blur.top_left[0];
  const blurH = blur.bottom_right[1] - blur.top_left[1];
  if (blurW <= 0 || blurH <= 0) return null;
  const spread = blur.spread ?? 0;

  return (
    <div
      style={{
        position: "absolute",
        top: blur.top_left[1],
        left: blur.top_left[0],
        width: blurW,
        height: blurH,
        backdropFilter: `blur(${blur.blur_gain}px)`,
        WebkitBackdropFilter: `blur(${blur.blur_gain}px)`,
        ...(spread > 0 && {
          maskImage: `linear-gradient(to bottom, transparent, black ${spread}px, black calc(100% - ${spread}px), transparent),
                      linear-gradient(to right, transparent, black ${spread}px, black calc(100% - ${spread}px), transparent)`,
          maskComposite: "intersect",
          WebkitMaskImage: `linear-gradient(to bottom, transparent, black ${spread}px, black calc(100% - ${spread}px), transparent),
                           linear-gradient(to right, transparent, black ${spread}px, black calc(100% - ${spread}px), transparent)`,
          WebkitMaskComposite: "destination-in",
        }),
      }}
    />
  );
}

/**
 * FitWidthVideo: scale_to_fit = 0
 * Fills the composition WIDTH while maintaining aspect ratio, centered vertically.
 * No crop applied.
 */
function FitWidthVideo({
  sequence,
  videoSrc,
  style,
  srcW,
  srcH,
  backgroundUrl,
}: FitWidthVideoProps) {
  const { width: compWidth, height: compHeight, fps } = useVideoConfig();

  const trimProps = {
    trimBefore: Math.round(sequence.start * fps),
    trimAfter: Math.round(sequence.end * fps),
  };

  // Scale uniformly to fill the composition width
  const scale = compWidth / srcW;
  const scaledH = srcH * scale;

  // Center vertically
  const topOffset = (compHeight - scaledH) / 2;

  // Cover scale: fill entire composition while preserving aspect ratio
  const coverScale = Math.max(compWidth / srcW, compHeight / srcH);
  const coverW = srcW * coverScale;
  const coverH = srcH * coverScale;
  const coverLeft = (compWidth - coverW) / 2;
  const coverTop = (compHeight - coverH) / 2;

  return (
    <div style={{ ...style, position: "relative", overflow: "hidden" }}>
      {backgroundUrl ? (
        <Img
          src={backgroundUrl}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />
      ) : (
        <div
          style={{
            position: "absolute",
            top: coverTop,
            left: coverLeft,
            width: coverW,
            height: coverH,
            filter: "blur(24px)",
            transform: "scale(1.05)",
          }}
        >
          <RemotionVideo
            src={videoSrc}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "fill",
              display: "block",
              pointerEvents: "none",
            }}
            {...trimProps}
            volume={0}
            delayRenderTimeoutInMilliseconds={120000}
            delayRenderRetries={2}
          />
        </div>
      )}
      <div
        style={{
          position: "absolute",
          width: srcW,
          height: srcH,
          transformOrigin: "0 0",
          transform: `translate(0px, ${topOffset}px) scale(${scale})`,
        }}
      >
        <RemotionVideo
          src={videoSrc}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "fill",
            display: "block",
            pointerEvents: "none",
          }}
          {...trimProps}
          volume={sequence.volume}
          delayRenderTimeoutInMilliseconds={120000}
          delayRenderRetries={2}
        />
        {sequence.blur.length > 0 &&
          sequence.blur.map((blur, i) => <BlurOverlay key={i} blur={blur} />)}
      </div>
    </div>
  );
}

/**
 * ScalledVideo: scale_to_fit = 1 (default)
 * Cover scaling (no crop) or distort/stretch (with crop) to fill the entire composition.
 */
function ScalledVideo({
  sequence,
  videoSrc,
  style,
  srcW,
  srcH,
}: ScalledVideoProps) {
  const { width: compWidth, height: compHeight, fps } = useVideoConfig();

  const trimProps = {
    trimBefore: Math.round(sequence.start * fps),
    trimAfter: Math.round(sequence.end * fps),
  };

  const crop = sequence.crop;

  // Clamp crop region to source bounds
  const cropX = Math.max(0, crop.top_left[0]);
  const cropY = Math.max(0, crop.top_left[1]);
  const cropRight = Math.min(srcW, crop.bottom_right[0]);
  const cropBottom = Math.min(srcH, crop.bottom_right[1]);
  const cropW = cropRight - cropX;
  const cropH = cropBottom - cropY;

  const hasCrop = cropW > 0 && cropH > 0 && !(cropW == srcW && cropH == srcH);

  if (!hasCrop) {
    // Use uniform 'cover' scaling so blur coordinates in source space
    // scale together with the video.
    const scale = Math.max(compWidth / srcW, compHeight / srcH);
    const scaledW = srcW * scale;
    const scaledH = srcH * scale;
    const left = (compWidth - scaledW) / 2;
    const top = (compHeight - scaledH) / 2;

    return (
      <div style={{ ...style, position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            width: srcW,
            height: srcH,
            transformOrigin: "0 0",
            transform: `translate(${left}px, ${top}px) scale(${scale})`,
          }}
        >
          <RemotionVideo
            src={videoSrc}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "fill",
              display: "block",
              pointerEvents: "none",
            }}
            {...trimProps}
            volume={sequence.volume}
            delayRenderTimeoutInMilliseconds={120000}
            delayRenderRetries={2}
          />
          {sequence.blur.length > 0 &&
            sequence.blur.map((blur, i) => <BlurOverlay key={i} blur={blur} />)}
        </div>
      </div>
    );
  }

  // Calculate percentages for clipPath
  const topPct = (cropY / srcH) * 100;
  const rightPct = 100 - (cropRight / srcW) * 100;
  const bottomPct = 100 - (cropBottom / srcH) * 100;
  const leftPct = (cropX / srcW) * 100;

  const clipPathValue = `inset(${topPct}% ${rightPct}% ${bottomPct}% ${leftPct}%)`;

  // Apply independent stretching for X and Y to completely fill the composition (Distort/Stretch)
  const scaleX = compWidth / cropW;
  const scaleY = compHeight / cropH;

  // We want the center of the scaled crop region to be at the center of the composition
  const scaledCropCenterX = (cropX + cropW / 2) * scaleX;
  const scaledCropCenterY = (cropY + cropH / 2) * scaleY;

  const left = compWidth / 2 - scaledCropCenterX;
  const top = compHeight / 2 - scaledCropCenterY;

  return (
    <div
      style={{
        ...style,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: `${srcW}px`,
          height: `${srcH}px`,
          transformOrigin: "0 0",
          transform: `translate(${left}px, ${top}px) scale(${scaleX}, ${scaleY})`,
          clipPath: clipPathValue,
          WebkitClipPath: clipPathValue,
        }}
      >
        <RemotionVideo
          src={videoSrc}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "fill",
            display: "block",
            pointerEvents: "none",
          }}
          {...trimProps}
          volume={sequence.volume}
          delayRenderTimeoutInMilliseconds={120000}
          delayRenderRetries={2}
        />
        {sequence.blur.length > 0 &&
          sequence.blur.map((blur, i) => <BlurOverlay key={i} blur={blur} />)}
      </div>
    </div>
  );
}

/**
 * VideoSequenceItem: Reads video dimensions using parseMedia + delayRender,
 * then delegates to FitWidthVideo or ScalledVideo.
 */
function VideoSequenceItem({
  sequence,
  scaleToFit,
  backgroundUrl,
}: {
  sequence: SequenceProps;
  scaleToFit: boolean;
  backgroundUrl: string;
}) {
  const [handle] = useState(() => delayRender("Loading video dimensions"));
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    parseMedia({
      src: sequence.videoSrc,
      fields: { dimensions: true },
    })
      .then((result) => {
        setDimensions(
          result.dimensions ?? { width: 1920, height: 1080 },
        );
      })
      .catch(() => {
        setDimensions({ width: 1920, height: 1080 });
      })
      .finally(() => {
        continueRender(handle);
      });
  }, [sequence.videoSrc, handle]);

  if (!dimensions) return null;

  const style: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center center",
  };

  return scaleToFit ? (
    <FitWidthVideo
      sequence={sequence}
      videoSrc={sequence.videoSrc}
      srcW={dimensions.width}
      srcH={dimensions.height}
      backgroundUrl={backgroundUrl}
      style={style}
    />
  ) : (
    <ScalledVideo
      sequence={sequence}
      videoSrc={sequence.videoSrc}
      srcW={dimensions.width}
      srcH={dimensions.height}
      style={style}
    />
  );
}

interface VideoProps {
  sequences: SequenceProps[];
  scaleToFit: boolean;
  backgroundUrl: string;
}

export default function Video({
  sequences,
  scaleToFit,
  backgroundUrl,
}: VideoProps) {
  const { fps } = useVideoConfig();
  return (
    <>
      {sequences.map((sequence, i) => {
        // Calculate the accumulated starting frame position to play sequences sequentially
        const fromFrame = Math.round(sequences
          .slice(0, i)
          .reduce((acc, curr) => acc + (curr.end - curr.start) * fps, 0));
        const durationInFrames = Math.max(1, Math.round((sequence.end - sequence.start) * fps));

        return (
          <Sequence
            key={i}
            from={fromFrame}
            durationInFrames={durationInFrames}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <VideoSequenceItem
              sequence={sequence}
              scaleToFit={scaleToFit}
              backgroundUrl={backgroundUrl}
            />
          </Sequence>
        );
      })}
    </>
  );
}
