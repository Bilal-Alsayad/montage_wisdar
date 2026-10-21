// import { MONTAGE_FILES_URL } from "../utils/constants";
import { staticFile } from "remotion";
import React from "react";
import { TemplateProps } from "./types";
import SadaNewTemplate from "./sadanew";

// const S3_BASE = `${MONTAGE_FILES_URL}`;

export interface VideoTemplateConfig {
  id: string;
  component: React.ComponentType<TemplateProps>;
  width: number;
  height: number;
  outroUrl: string;
  defaultVideoSrc: string;
  defaultData: TemplateProps["data"];
  outroOverlapFrames?: number;
}
// TurkpressTemplate TheredstripesTemplate
export const VIDEO_TEMPLATES: VideoTemplateConfig[] = [
    {
    id: "sadanew",
    component: SadaNewTemplate,
    width: 1080,
    height: 1920,
    outroUrl: ``,
    defaultVideoSrc: "Sequence05_1.mp4",
    defaultData: {
      sequences: [
        {
          start: 0,
          end: 20,
          crop: {
            top_left: [0, 0],
            bottom_right: [0, 0],
          },
          volume: 1,
          videoSrc: staticFile("Sequence05_1.mp4"),
          blur: [],
        },
      ],
      title: {
        text: "جوارديولا يواصل دفاعه العلني عن غزة والسودان",
      },
      captions: { src: staticFile("subtitle_translated_4360.srt") },
      tags: {
        location: "بريطانيا",
        date: "2026-02-03",
        source: "يبسب",
      },
      speakers: [
        { start: 6, name: "بيب غوارديولا", description: "مدرب مانشستر سيتي" },
      ],
      private_source: true,
      scale_to_fit: false,
      background_img_url: "",
    },
  },
];
