import { Sequence, useVideoConfig } from "remotion";
import Video from "./Video";
import { z } from "zod";
import { VideoLayerSchema } from "../utils/schemas";

type VideoLayer = z.infer<typeof VideoLayerSchema>;

interface VideoLayersProps {
  layers?: VideoLayer[];
}

/**
 * Renders overlay videos on top of the main video.
 * Reads `video_layers` from the template data and positions each layer
 * according to its `placement`, `startTime`, `start`/`end` (trim), and `layer` (z-index).
 */
export default function VideoLayers({ layers }: VideoLayersProps) {
  const { fps } = useVideoConfig();

  if (!layers || layers.length === 0) return null;

  return (
    <>
      {layers.map((layer, index) => (
        <Sequence
          key={`video_layer-${index}`}
          from={Math.round(layer.startTime * fps)}
          durationInFrames={Math.round((layer.end - layer.start) * fps)}
          style={{
            position: "absolute",
            left: layer.placement.top_left[0],
            top: layer.placement.top_left[1],
            width: layer.placement.width,
            height: layer.placement.height,
            zIndex: layer.layer,
          }}
        >
          <Video
            sequences={[layer]}
            scaleToFit={false}
            backgroundUrl={""}
            boxW={layer.placement.width}
            boxH={layer.placement.height}
          />
        </Sequence>
      ))}
    </>
  );
}
