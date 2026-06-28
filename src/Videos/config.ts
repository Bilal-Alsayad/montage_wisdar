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
  baseDurationInFrames?: number;
}

export const VIDEO_TEMPLATES: VideoTemplateConfig[] = [
  {
    id: "harmony",
    component: HarmonyTemplate,
    width: 1080,
    height: 1920,
    outroUrl: staticFile("harmony/elements/outro.webm"),
    defaultVideoSrc: "",
    outroOverlapFrames: 120,
    baseDurationInFrames: 485,
    defaultData: {
      sequences: [
        {
          start: 0,
          end: 485 / 30,
          crop: {
            top_left: [0, 0],
            bottom_right: [0, 0],
          },
          volume: 0,
          videoSrc: staticFile("harmony/elements/background.mp4"),
          blur: [],
        },
      ],
      title: { text: "" },
      captions: {
        src: staticFile("harmony/elements/subtitle_translated_4361.srt"),
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
];
