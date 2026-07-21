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
import IrsalTemplate from "./irsal";
import TventTemplate from "./tvent";
import ThetimesofpalestineTemplate from "./thetimesofpalestine";
import DiasporaPulseTemplate from "./diasporaPulse";
import AlasimahTemplate from "./alasimah";
import FokusTemplate from "./fokus";
import AlarabyTemplate from "./alaraby";
import Arabi21LightTemplate from "./arabi21light";
import Arabi21AsdaaTemplate from "./arabi21asdaa";
import Arabi21SportTemplate from "./arabi21sport";

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
    id: "arab21sport",
    component: Arabi21SportTemplate,
    width: 1080,
    height: 1920,
    outroUrl: staticFile("arabi21sport/elements/outro.webm"),
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
      title: {
        text: "جوارديولا يواصل دفاعه العلني عن غزة والسودان",
      },
      captions: {
        src: staticFile("subtitle_translated_4360.srt"),
      },
      tags: {
        location: "مانشستر",
        date: "18-07-2026",
        source: "رويترز",
      },
      speakers: [],
      private_source: false,
      scale_to_fit: false,
      background_img_url: "",
    },
  },
  {
    id: "arab21light",
    component: Arabi21LightTemplate,
    width: 1080,
    height: 1920,
    outroUrl: staticFile("arabi21light/elements/outro.webm"),
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
      title: {
        text: "جوارديولا يواصل دفاعه العلني عن غزة والسودان",
      },
      captions: {
        src: staticFile("subtitle_translated_4360.srt"),
      },
      tags: {
        location: "مانشستر",
        date: "18-07-2026",
        source: "رويترز",
      },
      speakers: [],
      private_source: false,
      scale_to_fit: false,
      background_img_url: "",
    },
  },
  {
    id: "arab21asdaa",
    component: Arabi21AsdaaTemplate,
    width: 1080,
    height: 1920,
    outroUrl: staticFile("arabi21asdaa/elements/outro.webm"),
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
      title: {
        text: "جوارديولا يواصل دفاعه العلني عن غزة والسودان",
      },
      captions: {
        src: staticFile("subtitle_translated_4360.srt"),
      },
      tags: {
        location: "مانشستر",
        date: "18-07-2026",
        source: "رويترز",
      },
      speakers: [],
      private_source: false,
      scale_to_fit: false,
      background_img_url: "",
    },
  },
  {
    id: "alaraby",
    component: AlarabyTemplate,
    width: 1080,
    height: 1920,
    outroUrl: staticFile("alaraby/elements/outro.webm"),
    defaultVideoSrc: "",
    outroOverlapFrames: 0,
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
        text: "تصاعد التوتر بعد تصريحات جديدة حول الأزمة",
      },
      captions: {
        src: staticFile("subtitle_translated_4360.srt"),
      },
      tags: {
        location: "إسطنبول",
        date: "20-20-2000",
        source: "الجزيرة",
      },
      speakers: [
        {
          start: 6,
          name: "بيب غوارديولا",
          description: "مدرب مانشستر سيتي",
        },
      ],
      private_source: false,
      scale_to_fit: false,
      background_img_url: "",
    },
  },
  {
    id: "fokus",
    component: FokusTemplate,
    width: 1080,
    height: 1920,
    outroUrl: staticFile("fokus/elements/outro.mp4"),
    defaultVideoSrc: "",
    outroOverlapFrames: 0,
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
        text: "Daughter Blasts NM Daughter Blasts NM",
      },
      captions: {
        src: staticFile("subtitle_translated_4361.srt"),
      },
      tags: {
        location: "istanbul",
        date: "20-20-2000",
        source: "Maddie Block",
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
    id: "alasimah",
    component: AlasimahTemplate,
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
    id: "thetimesofpalestine",
    component: ThetimesofpalestineTemplate,
    width: 1080,
    height: 1920,
    outroUrl: staticFile("thetimesofpalestine/elements/outro.mp4"),
    defaultVideoSrc: "",
    outroOverlapFrames: 1,
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
        text: "Daughter Blasts NM Daughter Blasts NM",
      },
      captions: {
        src: staticFile("subtitle_translated_4361.srt"),
      },
      tags: {
        location: "istanbul",
        date: "20-20-2000",
        source: "Maddie Block",
      },
      speakers: [],
      private_source: false,
      scale_to_fit: false,
      background_img_url: "",
    },
  },
  {
    id: "tvent",
    component: TventTemplate,
    width: 1080,
    height: 1920,
    outroUrl: staticFile("tvent/elements/outro.mp4"),
    defaultVideoSrc: "",
    outroOverlapFrames: 1,
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
        text: "Daughter Blasts NM Daughter Blasts NM Daughter Blasts NM ",
      },
      captions: {
        src: staticFile("subtitle_translated_4361.srt"),
      },
      tags: {
        location: "istanbul",
        date: "20-20-2000",
        source: "Maddie Block",
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
    id: "irsal",
    component: IrsalTemplate,
    width: 1080,
    height: 1920,
    outroUrl: staticFile("irsal/elements/outro.mp4"),
    defaultVideoSrc: "",
    outroOverlapFrames: 20, //! buraya bak unutma
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
        text: "التي انطلقت لنصرة القدس والأقصى التي انطلقت لنصرة القدس والأقصى",
      },
      captions: {
        src: staticFile("subtitle_translated_4361.srt"),
      },
      tags: {},
      speakers: [],
      private_source: false,
      scale_to_fit: false,
      background_img_url: "",
    },
  },
  {
    id: "quds",
    component: QudsTemplate,
    width: 1080,
    height: 1920,
    outroUrl: staticFile("quds/elements/outro.webm"),
    outroOverlapFrames: 30,
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
      title: { text: "Daughter Blasts NM Daughter Blasts NM" },
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
