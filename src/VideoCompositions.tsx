import { Composition } from "remotion";
import { createCalculateVideoMetadata } from "./utils/calculateVideoMetadata";
import { VIDEO_TEMPLATES } from "./Videos/config";
import { VideoTemplateSchema } from "./utils/schemas";

export const VideoCompositions: React.FC = () => {
  return (
    <>
      {VIDEO_TEMPLATES.map((template) => (
        <Composition
          schema={VideoTemplateSchema}
          key={template.id}
          id={template.id}
          component={template.component}
          durationInFrames={300}
          fps={30}
          width={template.width}
          height={template.height}
          defaultProps={{
            data: template.defaultData,
            ...(template.outroOverlapFrames
              ? { outroOverlapFrames: template.outroOverlapFrames }
              : {}),
          }}
          calculateMetadata={
            createCalculateVideoMetadata(
              template.outroUrl,
              template.width,
              template.height,
            ) as any
          }
        />
      ))}
    </>
  );
};
