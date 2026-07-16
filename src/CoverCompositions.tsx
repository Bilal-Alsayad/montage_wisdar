import React from "react";
import { Still, staticFile } from "remotion";
import { COVER_TEMPLATES } from "./Covers/config";
import { CoverTemplateSchema } from "./utils/schemas";

export const CoverCompositions: React.FC = () => {
  return (
    <>
      {COVER_TEMPLATES.map((template) => (
        <Still
          schema={CoverTemplateSchema}
          key={template.id}
          id={template.id}
          component={template.component}
          width={template.width}
          height={template.height}
          defaultProps={{
            data: {
              text_fields: {
                text: template.defaultText || "عنوان تجريبي للصورة الثابتة",
                ...(template.defaultSpeaker ? { speaker: template.defaultSpeaker } : {}),
                ...(template.defaultAdj ? { adj: template.defaultAdj } : {}),
                ...(template.defaultTitle ? { title: template.defaultTitle } : {}),
                ...(template.defaultSource ? { source: template.defaultSource } : {}),
                ...(template.defaultLocation ? { location: template.defaultLocation } : {}),
              },
              imageSrc: staticFile("still/sample.png"),
              crop: {
                topLeft: { x: 0, y: 0 },
                bottomRight: { x: 0, y: 0 },
              },
            },
          }}
        />
      ))}
    </>
  );
};