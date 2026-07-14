// import { MONTAGE_FILES_URL } from "../utils/constants";
import { staticFile } from "remotion";
import React from "react";
import { TemplateProps } from "./types";
import SafaTemplate from "./safa";
import SudanTemplate from "./sudan";
import RassadTunisiaTemplate from "./rassadtunisia";
import SettelersTemplate from "./settelers";
import TrackingTemplate from "./tracking";
import HarmonyTemplate from "./harmony";
import PalTemplate from "./pal";
import MeeTemplate from "./mee";
import MemoTemplate from "./memo";
import QudsTemplate from "./quds";
import Auk1_1Template from "./auk/index1_1";
import Auk4_5Template from "./auk/index4_5";
import Auk16_9Template from "./auk/index16_9";
import NoonTemplate from "./noon";
import DiasporaPulseTemplate from "./diasporaPulse";

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

export const VIDEO_TEMPLATES: VideoTemplateConfig[] = [
  {
    id: "quds",
    component: QudsTemplate,
    width: 1080,
    height: 1920,
    outroUrl: staticFile("quds/elements/outro.webm"),
    defaultVideoSrc: "",
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
      title: { text: "Daughter Blasts NM" },
      captions: {
        src: staticFile("subtitle_translated_4361.srt"),
      },
      tags: {
        source: "Maddie Block",
      },
      speakers: [],
      private_source: false,
      scale_to_fit: false,
      background_img_url: "",
    },
  },
  {
    id: "mee",
    component: MeeTemplate,
    width: 1080,
    height: 1920,
    outroUrl: "",
    defaultVideoSrc: "",
    defaultData: {
      sequences: [
        {
          start: 0,
          end: 20,
          crop: {
            top_left: [0, 0] as [number, number],
            bottom_right: [0, 0] as [number, number],
          },
          volume: 1,
          videoSrc: staticFile("Sequence05_1.mp4"),
          blur: [],
        },
      ],
      title: {
        text: "title title ",
      },
      captions: { src: staticFile("subtitle_translated_4362.srt") },
      tags: {
        location: "Gaza Palestine",
        date: "11.03.2025",
        source: "MOTION GRAPHICS",
      },
      speakers: [
        {
          start: 6,
          name: "Pep Guardiola",
          description: "Manchester City Manager",
        },
      ],
      private_source: false,
      scale_to_fit: false,
      background_img_url: "",
    },
  },
  {
    id: "memo",
    component: MemoTemplate,
    width: 1080,
    height: 1920,
    outroUrl: "",
    defaultVideoSrc: "",
    defaultData: {
      sequences: [
        {
          start: 0,
          end: 20,
          crop: {
            top_left: [0, 0] as [number, number],
            bottom_right: [0, 0] as [number, number],
          },
          volume: 1,
          videoSrc: staticFile("Sequence05_1.mp4"),
          blur: [],
        },
      ],
      title: {
        text: "Civil Defence and journailsts Civil Defence and journailstsCivil Defence and journailsts",
      },
      captions: { src: staticFile("subtitle_translated_4362.srt") },
      tags: {
        location: "Gaza Palestine",
        date: "11.03.2025",
      },
      speakers: [],
      private_source: false,
      scale_to_fit: false,
      background_img_url: "",
    },
  },
  {
    id: "harmony",
    component: HarmonyTemplate,
    width: 1080,
    height: 1920,
    outroUrl: staticFile("harmony/elements/outro.webm"),
    defaultVideoSrc: "",
    outroOverlapFrames: 45,
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
          blur: [
            {
              top_left: [1000, 0],
              top_right: [2000, 50],
              bottom_left: [1000, 200],
              bottom_right: [1100, 300],
              blur_gain: 30,
              spread: 20,
              is_circle: true,
            },
          ],
        },
      ],
      title: { text: "" },
      captions: {
        src: staticFile("subtitle_translated_4361.srt"),
      },
      tags: {
        location: "",
        date: "",
        source: "MOTION GRAPHICS",
      },
      speakers: [
        {
          start: 305 / 30,
          name: "Ebru",
          description: "Güncel Haberler Editörü",
        },
      ],
      private_source: false,
      scale_to_fit: false,
      background_img_url: "",
    },
  },
  {
    id: "safa",
    component: SafaTemplate,
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
        text: "Guardiola continues to defend Gaza and Sudan in public opinion",
      },
      captions: { src: staticFile("subtitle_translated_4362.srt") },
      tags: {
        location: "Spain",
        date: "2026-02-03",
        source: "Safa TV",
      },
      speakers: [
        {
          start: 6,
          name: "Pep Guardiola",
          description: "Manchester City Manager",
        },
      ],
      private_source: false,
      scale_to_fit: false,
      background_img_url: "",
    },
  },
  {
    id: "sudan",
    component: SudanTemplate,
    width: 1080,
    height: 1350,
    outroUrl: ``,
    defaultVideoSrc: "Sequence05_1.mp4",
    defaultData: {
      sequences: [
        {
          start: 0,
          end: 20,
          crop: {
            top_left: [657, 0],
            bottom_right: [1265, 1080],
          },
          volume: 1,
          videoSrc: staticFile("Sequence05_1.mp4"),
          blur: [],
        },
      ],
      title: { text: "جوارديولا يواصل دفاعه العلني عن غزة والسودان" },
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
  {
    id: "rassadtunisia",
    component: RassadTunisiaTemplate,
    width: 1080,
    height: 1350,
    outroUrl: ``,
    defaultVideoSrc: "Sequence05_1.mp4",
    defaultData: {
      sequences: [
        {
          start: 0,
          end: 20,
          crop: {
            top_left: [657, 0],
            bottom_right: [1265, 1080],
          },
          volume: 1,
          videoSrc: staticFile("Sequence05_1.mp4"),
          blur: [],
        },
      ],
      title: { text: "جوارديولا يواصل دفاعه العلني عن غزة والسودان" },
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
  {
    id: "tracking",
    component: TrackingTemplate,
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
            top_left: [657, 0],
            bottom_right: [1265, 1080],
          },
          volume: 1,
          videoSrc: staticFile("Sequence05_1.mp4"),
          blur: [],
        },
      ],
      title: { text: "جوارديولا يواصل دفاعه العلني عن غزة والسودان" },
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
  {
    id: "settelers",
    component: SettelersTemplate,
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
            top_left: [657, 0],
            bottom_right: [1265, 1080],
          },
          volume: 1,
          videoSrc: staticFile("Sequence05_1.mp4"),
          blur: [],
        },
      ],
      title: {
        text: "Guardiola continues to defend Gaza and Sudan in public opinion",
      },
      captions: { src: staticFile("subtitle_translated_4362.srt") },
      tags: {
        location: "Spain",
        date: "2026-02-03",
        source: "Widsar",
      },
      speakers: [
        { start: 6, name: "بيب غوارديولا", description: "مدرب مانشستر سيتي" },
      ],
      private_source: true,
      scale_to_fit: false,
      background_img_url: "",
    },
  },
  {
    id: "pal",
    component: PalTemplate,
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
            top_left: [657, 0],
            bottom_right: [1265, 1080],
          },
          volume: 1,
          videoSrc: staticFile("Sequence05_1.mp4"),
          blur: [],
        },
      ],
      title: {
        text: "Guardiola continues to defend Gaza and Sudan in public opinion",
      },
      captions: { src: staticFile("subtitle_translated_4362.srt") },
      tags: {
        location: "Spain",
        date: "2026-02-03",
        source: "Widsar",
      },
      speakers: [
        {
          start: 6,
          name: "Pep Guardiola",
          description: "Manchester City Manager",
        },
      ],
      private_source: true,
      scale_to_fit: false,
      background_img_url: "",
    },
  },
  {
    id: "auk1-1",
    component: Auk1_1Template,
    width: 1080,
    height: 1920,
    outroUrl: `${staticFile("auk/elements/outro.webm")}`,
    outroOverlapFrames: 30,
    defaultVideoSrc: "Sequence05_1.mp4",
    defaultData: {
      sequences: [
        {
          start: 0,
          end: 20,
          crop: {
            top_left: [657, 0],
            bottom_right: [1265, 1080],
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
  {
    id: "auk4-5",
    component: Auk4_5Template,
    width: 1080,
    height: 1920,
    outroUrl: `${staticFile("auk/elements/outro.webm")}`,
    outroOverlapFrames: 30,
    defaultVideoSrc: "Sequence05_1.mp4",
    defaultData: {
      sequences: [
        {
          start: 0,
          end: 20,
          crop: {
            top_left: [657, 0],
            bottom_right: [1265, 1080],
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
  {
    id: "auk16-9",
    component: Auk16_9Template,
    width: 1080,
    height: 1920,
    outroUrl: `${staticFile("auk/elements/outro.webm")}`,
    outroOverlapFrames: 30,
    defaultVideoSrc: "Sequence05_1.mp4",
    defaultData: {
      sequences: [
        {
          start: 0,
          end: 20,
          crop: {
            top_left: [657, 0],
            bottom_right: [1265, 1080],
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
  {
    id: "noon",
    component: NoonTemplate,
    width: 1080,
    height: 1920,
    outroUrl: `${staticFile("auk/elements/outro.webm")}`,
    outroOverlapFrames: 50,
    defaultVideoSrc: "Sequence05_1.mp4",
    defaultData: {
      sequences: [
        {
          start: 0,
          end: 20,
          crop: {
            top_left: [657, 0],
            bottom_right: [1265, 1080],
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
      scale_to_fit: true,
      background_img_url: "",
    },
  },
  {
    id: "diasporaPulse",
    component: DiasporaPulseTemplate,
    width: 1080,
    height: 1920,
    outroUrl: `${staticFile("diasporaPulse/elements/outro.webm")}`,
    outroOverlapFrames: 10,
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
