import { Img, Sequence, useVideoConfig } from "remotion";
import { Video as RemotionVideo } from "@remotion/media";
import { parseMedia } from "@remotion/media-parser";
import { useState, useEffect } from "react";
import { delayRender, continueRender } from "remotion";

interface Blur {
  top_left: [number, number];
  top_right: [number, number];
  bottom_left: [number, number];
  bottom_right: [number, number];
  blur_gain: number;
  spread: number;
  is_circle: boolean;
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
  boxW?: number;
  boxH?: number;
}

function BlurOverlay({ blur }: { blur: Blur }) {
  // Compute the bounding box of all four polygon points (matching the frontend).
  const allX = [
    blur.top_left[0],
    blur.top_right[0],
    blur.bottom_left[0],
    blur.bottom_right[0],
  ];
  const allY = [
    blur.top_left[1],
    blur.top_right[1],
    blur.bottom_left[1],
    blur.bottom_right[1],
  ];
  const minX = Math.min(...allX);
  const minY = Math.min(...allY);
  const maxX = Math.max(...allX);
  const maxY = Math.max(...allY);
  let boxW = maxX - minX;
  let boxH = maxY - minY;

  if (boxW <= 0 || boxH <= 0) return null;

  // Clamp spread: 0 ≤ spread ≤ round(min(bboxWidth, bboxHeight) / 3)
  const maxSpread = Math.round(Math.min(boxW, boxH) / 3);
  const spread = Math.max(0, Math.min(blur.spread ?? 0, maxSpread));

  let clipPathValue = null;
  let pts: [number, number][] = [];
  if (!blur.is_circle) {
    // Polygon points relative to the bounding box
    pts = [
      [blur.top_left[0] - minX, blur.top_left[1] - minY],
      [blur.top_right[0] - minX, blur.top_right[1] - minY],
      [blur.bottom_right[0] - minX, blur.bottom_right[1] - minY],
      [blur.bottom_left[0] - minX, blur.bottom_left[1] - minY],
    ];
    clipPathValue = `polygon(${pts.map(([x, y]) => `${x}px ${y}px`).join(", ")})`;
  }

  if (spread <= 0) {
    // Hard-edged blur with clip-path only (no feathering).
    return (
      <div
        style={{
          position: "absolute",
          left: minX,
          top: minY,
          width: boxW,
          height: boxH,
          borderRadius: blur.is_circle ? "100%" : "none",
          backdropFilter: `blur(${blur.blur_gain}px)`,
          WebkitBackdropFilter: `blur(${blur.blur_gain}px)`,
          clipPath: clipPathValue ? clipPathValue : "none",
          WebkitClipPath: clipPathValue ? clipPathValue : "none",
        }}
      />
    );
  }

  // Expand the div by `spread` on each side to accommodate the fade.
  const fadeW = boxW + spread * 2;
  const fadeH = boxH + spread * 2;

  // Compute mask styles based on shape type.
  let maskStyle: React.CSSProperties = {};

  if (blur.is_circle) {
    // Circle: radial-gradient mask.
    const solidStopX = (boxW / fadeW) * 100;
    const solidStopY = (boxH / fadeH) * 100;
    const solidStop = Math.min(solidStopX, solidStopY);
    const gradient = `radial-gradient(${fadeW / 2}px ${fadeH / 2}px at center, black ${solidStop}%, transparent 100%)`;

    maskStyle = {
      maskImage: gradient,
      WebkitMaskImage: gradient,
    };
  } else {
    // Detect axis-aligned rectangle (all corners share edges).
    const isRect =
      blur.top_left[1] === blur.top_right[1] &&
      blur.bottom_left[1] === blur.bottom_right[1] &&
      blur.top_left[0] === blur.bottom_left[0] &&
      blur.top_right[0] === blur.bottom_right[0];

    if (isRect) {
      // Rectangle: intersecting linear-gradient masks.
      maskStyle = {
        maskImage: `linear-gradient(to bottom, transparent, black ${spread}px, black calc(100% - ${spread}px), transparent),
                    linear-gradient(to right, transparent, black ${spread}px, black calc(100% - ${spread}px), transparent)`,
        maskComposite: "intersect",
        WebkitMaskImage: `linear-gradient(to bottom, transparent, black ${spread}px, black calc(100% - ${spread}px), transparent),
                         linear-gradient(to right, transparent, black ${spread}px, black calc(100% - ${spread}px), transparent)`,
        WebkitMaskComposite: "destination-in",
      };
    } else {
      // Quadrilateral: one gradient per edge, perpendicular to each edge.
      const fadePts: [number, number][] = [
        [blur.top_left[0] - minX + spread, blur.top_left[1] - minY + spread],
        [blur.top_right[0] - minX + spread, blur.top_right[1] - minY + spread],
        [blur.bottom_right[0] - minX + spread, blur.bottom_right[1] - minY + spread],
        [blur.bottom_left[0] - minX + spread, blur.bottom_left[1] - minY + spread],
      ];

      const edgePairs: [[number, number], [number, number]][] = [
        [fadePts[0], fadePts[1]], // TL → TR
        [fadePts[1], fadePts[2]], // TR → BR
        [fadePts[2], fadePts[3]], // BR → BL
        [fadePts[3], fadePts[0]], // BL → TL
      ];

      const gradientValue = edgePairs
        .map(([a, b]) => {
          const ex = b[0] - a[0];
          const ey = b[1] - a[1];

          // Inward normal for clockwise winding (screen coords, y-down).
          const nx = -ey;
          const ny = ex;

          // CSS angle: 0deg = to top, 90deg = to right.
          const angleRad = Math.atan2(nx, -ny);
          const angleDeg = ((angleRad * 180) / Math.PI + 360) % 360;

          // Gradient line length for this angle in the element.
          const L =
            Math.abs(fadeW * Math.sin(angleRad)) +
            Math.abs(fadeH * Math.cos(angleRad));
          if (L === 0) return "linear-gradient(0deg, black, black)";

          // Project edge midpoint onto gradient line to find edge position.
          const mx = (a[0] + b[0]) / 2 - fadeW / 2;
          const my = (a[1] + b[1]) / 2 - fadeH / 2;
          const pEdge =
            (0.5 + (mx * Math.sin(angleRad) - my * Math.cos(angleRad)) / L) * L;

          return `linear-gradient(${angleDeg.toFixed(2)}deg, transparent ${pEdge.toFixed(1)}px, black ${(pEdge + spread).toFixed(1)}px)`;
        })
        .join(", ");

      maskStyle = {
        maskImage: gradientValue,
        WebkitMaskImage: gradientValue,
        maskComposite: "intersect",
        WebkitMaskComposite: "destination-in",
      };
    }
  }

  return (
    <div
      style={{
        position: "absolute",
        left: minX - spread,
        top: minY - spread,
        width: fadeW,
        height: fadeH,
        backdropFilter: `blur(${blur.blur_gain}px)`,
        WebkitBackdropFilter: `blur(${blur.blur_gain}px)`,
        ...maskStyle,
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
  boxW = 0,
  boxH = 0,
}: ScalledVideoProps) {
  const { width: defaultCompWidth, height: defaultCompHeight, fps } = useVideoConfig();

  const compWidth = boxW || defaultCompWidth;
  const compHeight = boxH || defaultCompHeight;

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
  let scaleX = compWidth / cropW;
  let scaleY = compHeight / cropH;

  if (compWidth / compHeight == 4 / 5) {
    scaleX = scaleY = Math.max(scaleX, scaleY);
  }

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
  boxW,
  boxH,
}: {
  sequence: SequenceProps;
  scaleToFit: boolean;
  backgroundUrl: string;
  boxW?: number;
  boxH?: number;
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
        setDimensions(result.dimensions ?? { width: 1920, height: 1080 });
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
      boxW={boxW}
      boxH={boxH}
    />
  );
}

interface VideoProps {
  sequences: SequenceProps[];
  scaleToFit: boolean;
  backgroundUrl: string;
  muted?: boolean;
  boxW?: number;
  boxH?: number;
}

export default function Video({
  sequences,
  scaleToFit,
  backgroundUrl,
  muted = false,
  boxW,
  boxH,
}: VideoProps) {
  const { fps } = useVideoConfig();
  return (
    <>
      {sequences.map((sequence, i) => {
        // Calculate the accumulated starting frame position to play sequences sequentially
        const fromFrame = Math.round(
          sequences
            .slice(0, i)
            .reduce((acc, curr) => acc + (curr.end - curr.start) * fps, 0),
        );
        const durationInFrames = Math.max(
          1,
          Math.round((sequence.end - sequence.start) * fps),
        );

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
              sequence={muted ? { ...sequence, volume: 0 } : sequence}
              scaleToFit={scaleToFit}
              backgroundUrl={backgroundUrl}
              boxW={boxW}
              boxH={boxH}
            />
          </Sequence>
        );
      })}
    </>
  );
}
