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
import AlarabyfrTemplate from "./alarabyfr";
import JomarkTemplate from "./jomark";
import AlqastalTemplate from "./alqastal";
import TurkpressTemplate from "./turkpress";
import WajhaTemplate from "./wajha";
import News247Template from "./247news";
import ArabFactTemplate from "./arabfact";
import Arabi21SportIbrahimTemplate from "./arabi21sportibrahim";
import AlmaredaltounsiTemplate from "./almaredaltounsi";
import Awlad9Template from "./awlad9";
import InfoplusTemplate from "./infoplus";
import Intikhabat2019Template from "./intikhabat2019";
import Tounes2020Template from "./tounes2020";
import BreakingArTemplate from "./breakingar";
import DailyNews247Template from "./dailynews247";
import HeadlineGlobalTemplate from "./headlineglobal";
import HeadlineArTemplate from "./headlinear";
import NewsArTemplate from "./newsar";
import ProWrestleHubTemplate from "./prowrestlehub";
import TrendNewsTemplate from "./trendnews";
import TurkHaber247TikbumTemplate from "./turkhaber247tikbum";
import FlashTemplate from "./flash";
import SharqTemplate from "./sharq";
import TrendsFactsTemplate from "./trendsfacts";
import NowVoiceTemplate from "./nowvoice";
import Breaking24Template from "./breaking24";
import MdarNewsTemplate from "./mdarnews";
import MasrFiveTemplate from "./masrfive";
import FactsInSecondsTemplate from "./factsinseconds";
import FromMeccaToJerusalemTemplate from "./frommeccatojerusalem";
import ArabVarietyTemplate from "./arabvariety";
import LivePulseTemplate from "./livepulse";
import TurkeyPulseTemplate from "./turkeypulse";
import TurkHaber247Template from "./turkhaber247";
// import Arabi21LightTemplate from "./arabi21light";
// import Arabi21AsdaaTemplate from "./arabi21asdaa";
// import Arabi21SportTemplate from "./arabi21sport";

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
// TurkpressTemplate
export const VIDEO_TEMPLATES: VideoTemplateConfig[] = [
    {
    id: "almaredaltounsi",
    component: AlmaredaltounsiTemplate,
    width: 1080,
    height: 1920,
    outroUrl: "",
    defaultVideoSrc: "",
    defaultData: {
      sequences: [
        {
          start: 0,
          end: 20,
          crop: { top_left: [0, 0], bottom_right: [0, 0] },
          volume: 1,
          videoSrc: staticFile("Sequence05_1.mp4"),
          blur: [],
        },
      ],
      title: {
        text: "التي انطلقت لنصرة ال قدس ال قدس والأق صى",
      },
      captions: {
        src: staticFile("subtitle_translated_4360.srt"),
      },
      tags: {
        location: "إسطنبول",
        date: "20-20-2000",
        source: "مادي بلوك",
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
    id: "awlad9",
    component: Awlad9Template,
    width: 1080,
    height: 1920,
    outroUrl: "",
    defaultVideoSrc: "",
    defaultData: {
      sequences: [
        {
          start: 0,
          end: 20,
          crop: { top_left: [0, 0], bottom_right: [0, 0] },
          volume: 1,
          videoSrc: staticFile("Sequence05_1.mp4"),
          blur: [],
        },
      ],
      title: {
        text: "التي انطلقت لنصرة ال قدس ال قدس والأق صى",
      },
      captions: {
        src: staticFile("subtitle_translated_4360.srt"),
      },
      tags: {
        location: "إسطنبول",
        date: "20-20-2000",
        source: "مادي بلوك",
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
    id: "infoplus",
    component: InfoplusTemplate,
    width: 1080,
    height: 1920,
    outroUrl: "",
    defaultVideoSrc: "",
    defaultData: {
      sequences: [
        {
          start: 0,
          end: 20,
          crop: { top_left: [0, 0], bottom_right: [0, 0] },
          volume: 1,
          videoSrc: staticFile("Sequence05_1.mp4"),
          blur: [],
        },
      ],
      title: {
        text: "التي انطلقت لنصرة ال قدس ال قدس والأق صى",
      },
      captions: {
        src: staticFile("subtitle_translated_4360.srt"),
      },
      tags: {
        location: "إسطنبول",
        date: "20-20-2000",
        source: "مادي بلوك",
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
    id: "intikhabat2019",
    component: Intikhabat2019Template,
    width: 1080,
    height: 1920,
    outroUrl: "",
    defaultVideoSrc: "",
    defaultData: {
      sequences: [
        {
          start: 0,
          end: 20,
          crop: { top_left: [0, 0], bottom_right: [0, 0] },
          volume: 1,
          videoSrc: staticFile("Sequence05_1.mp4"),
          blur: [],
        },
      ],
      title: {
        text: "التي انطلقت لنصرة ال قدس ال قدس والأق صى",
      },
      captions: {
        src: staticFile("subtitle_translated_4360.srt"),
      },
      tags: {
        location: "إسطنبول",
        date: "20-20-2000",
        source: "مادي بلوك",
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
    id: "tounes2020",
    component: Tounes2020Template,
    width: 1080,
    height: 1920,
    outroUrl: "",
    defaultVideoSrc: "",
    defaultData: {
      sequences: [
        {
          start: 0,
          end: 20,
          crop: { top_left: [0, 0], bottom_right: [0, 0] },
          volume: 1,
          videoSrc: staticFile("Sequence05_1.mp4"),
          blur: [],
        },
      ],
      title: {
        text: "التي انطلقت لنصرة ال قدس ال قدس والأق صى",
      },
      captions: {
        src: staticFile("subtitle_translated_4360.srt"),
      },
      tags: {
        location: "إسطنبول",
        date: "20-20-2000",
        source: "مادي بلوك",
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
    id: "247news",
    component: News247Template,
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
            top_left: [0, 0],
            bottom_right: [0, 0],
          },
          volume: 1,
          videoSrc: staticFile("Sequence05_1.mp4"),
          blur: [],
        },
      ],
      title: {
        text: "التي انطلقت لنصرة ال قدس ال قدس والأق صى",
      },
      captions: {
        src: staticFile("subtitle_translated_4360.srt"),
      },
      tags: {
        location: "إسطنبول",
        date: "20-20-2000",
        source: "مادي بلوك",
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
    id: "arabfact",
    component: ArabFactTemplate,
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
            top_left: [0, 0],
            bottom_right: [0, 0],
          },
          volume: 1,
          videoSrc: staticFile("Sequence05_1.mp4"),
          blur: [],
        },
      ],
      title: {
        text: "التي انطلقت لنصرة ال قدس ال قدس والأق صى",
      },
      captions: {
        src: staticFile("subtitle_translated_4360.srt"),
      },
      tags: {
        location: "إسطنبول",
        date: "20-20-2000",
        source: "مادي بلوك",
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
    id: "arabi21sportibrahim",
    component: Arabi21SportIbrahimTemplate,
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
        src: staticFile("subtitle_translated_4360.srt"),
      },
      tags: {
        location: "إسطنبول",
        date: "20-20-2000",
        source: "مادي بلوك",
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
    id: "breakingar",
    component: BreakingArTemplate,
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
            top_left: [0, 0],
            bottom_right: [0, 0],
          },
          volume: 1,
          videoSrc: staticFile("Sequence05_1.mp4"),
          blur: [],
        },
      ],
      title: {
        text: "التي انطلقت لنصرة ال قدس ال قدس والأق صى",
      },
      captions: {
        src: staticFile("subtitle_translated_4360.srt"),
      },
      tags: {
        location: "إسطنبول",
        date: "20-20-2000",
        source: "مادي بلوك",
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
    id: "dailynews247",
    component: DailyNews247Template,
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
    id: "headlineglobal",
    component: HeadlineGlobalTemplate,
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
    id: "headlinear",
    component: HeadlineArTemplate,
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
        src: staticFile("subtitle_translated_4360.srt"),
      },
      tags: {
        location: "إسطنبول",
        date: "20-20-2000",
        source: "مادي بلوك",
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
    id: "newsar",
    component: NewsArTemplate,
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
            top_left: [0, 0],
            bottom_right: [0, 0],
          },
          volume: 1,
          videoSrc: staticFile("Sequence05_1.mp4"),
          blur: [],
        },
      ],
      title: {
        text: "التي انطلقت لنصرة ال قدس ال قدس والأق صى",
      },
      captions: {
        src: staticFile("subtitle_translated_4360.srt"),
      },
      tags: {
        location: "إسطنبول",
        date: "20-20-2000",
        source: "مادي بلوك",
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
    id: "prowrestlehub",
    component: ProWrestleHubTemplate,
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
            top_left: [0, 0],
            bottom_right: [0, 0],
          },
          volume: 1,
          videoSrc: staticFile("Sequence05_1.mp4"),
          blur: [],
        },
      ],
      title: {
        text: "التي انطلقت لنصرة ال قدس ال قدس والأق صى",
      },
      captions: {
        src: staticFile("subtitle_translated_4360.srt"),
      },
      tags: {
        location: "إسطنبول",
        date: "20-20-2000",
        source: "مادي بلوك",
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
    id: "trendnews",
    component: TrendNewsTemplate,
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
    id: "turkhaber247tikbum",
    component: TurkHaber247TikbumTemplate,
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
    id: "flash",
    component: FlashTemplate,
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
            top_left: [0, 0],
            bottom_right: [0, 0],
          },
          volume: 1,
          videoSrc: staticFile("Sequence05_1.mp4"),
          blur: [],
        },
      ],
      title: {
        text: "التي انطلقت لنصرة ال قدس ال قدس والأق صى",
      },
      captions: {
        src: staticFile("subtitle_translated_4360.srt"),
      },
      tags: {
        location: "إسطنبول",
        date: "20-20-2000",
        source: "مادي بلوك",
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
    id: "sharq",
    component: SharqTemplate,
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
            top_left: [0, 0],
            bottom_right: [0, 0],
          },
          volume: 1,
          videoSrc: staticFile("Sequence05_1.mp4"),
          blur: [],
        },
      ],
      title: {
        text: "التي انطلقت لنصرة ال قدس ال قدس والأق صى",
      },
      captions: {
        src: staticFile("subtitle_translated_4360.srt"),
      },
      tags: {
        location: "إسطنبول",
        date: "20-20-2000",
        source: "مادي بلوك",
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
    id: "trendsfacts",
    component: TrendsFactsTemplate,
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
            top_left: [0, 0],
            bottom_right: [0, 0],
          },
          volume: 1,
          videoSrc: staticFile("Sequence05_1.mp4"),
          blur: [],
        },
      ],
      title: {
        text: "التي انطلقت لنصرة ال قدس ال قدس والأق صى",
      },
      captions: {
        src: staticFile("subtitle_translated_4360.srt"),
      },
      tags: {
        location: "إسطنبول",
        date: "20-20-2000",
        source: "مادي بلوك",
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
    id: "nowvoice",
    component: NowVoiceTemplate,
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
            top_left: [0, 0],
            bottom_right: [0, 0],
          },
          volume: 1,
          videoSrc: staticFile("Sequence05_1.mp4"),
          blur: [],
        },
      ],
      title: {
        text: "التي انطلقت لنصرة ال قدس ال قدس والأق صى",
      },
      captions: {
        src: staticFile("subtitle_translated_4360.srt"),
      },
      tags: {
        location: "إسطنبول",
        date: "20-20-2000",
        source: "مادي بلوك",
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
    id: "breaking24",
    component: Breaking24Template,
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
    id: "mdarnews",
    component: MdarNewsTemplate,
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
            top_left: [0, 0],
            bottom_right: [0, 0],
          },
          volume: 1,
          videoSrc: staticFile("Sequence05_1.mp4"),
          blur: [],
        },
      ],
      title: {
        text: "التي انطلقت لنصرة ال قدس ال قدس والأق صى",
      },
      captions: {
        src: staticFile("subtitle_translated_4360.srt"),
      },
      tags: {
        location: "إسطنبول",
        date: "20-20-2000",
        source: "مادي بلوك",
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
    id: "masrfive",
    component: MasrFiveTemplate,
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
            top_left: [0, 0],
            bottom_right: [0, 0],
          },
          volume: 1,
          videoSrc: staticFile("Sequence05_1.mp4"),
          blur: [],
        },
      ],
      title: {
        text: "التي انطلقت لنصرة ال قدس ال قدس والأق صى",
      },
      captions: {
        src: staticFile("subtitle_translated_4360.srt"),
      },
      tags: {
        location: "إسطنبول",
        date: "20-20-2000",
        source: "مادي بلوك",
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
    id: "factsinseconds",
    component: FactsInSecondsTemplate,
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
            top_left: [0, 0],
            bottom_right: [0, 0],
          },
          volume: 1,
          videoSrc: staticFile("Sequence05_1.mp4"),
          blur: [],
        },
      ],
      title: {
        text: "التي انطلقت لنصرة ال قدس ال قدس والأق صى",
      },
      captions: {
        src: staticFile("subtitle_translated_4360.srt"),
      },
      tags: {
        location: "إسطنبول",
        date: "20-20-2000",
        source: "مادي بلوك",
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
    id: "frommeccatojerusalem",
    component: FromMeccaToJerusalemTemplate,
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
            top_left: [0, 0],
            bottom_right: [0, 0],
          },
          volume: 1,
          videoSrc: staticFile("Sequence05_1.mp4"),
          blur: [],
        },
      ],
      title: {
        text: "التي انطلقت لنصرة ال قدس ال قدس والأق صى",
      },
      captions: {
        src: staticFile("subtitle_translated_4360.srt"),
      },
      tags: {
        location: "إسطنبول",
        date: "20-20-2000",
        source: "مادي بلوك",
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
    id: "arabvariety",
    component: ArabVarietyTemplate,
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
            top_left: [0, 0],
            bottom_right: [0, 0],
          },
          volume: 1,
          videoSrc: staticFile("Sequence05_1.mp4"),
          blur: [],
        },
      ],
      title: {
        text: "التي انطلقت لنصرة ال قدس ال قدس والأق صى",
      },
      captions: {
        src: staticFile("subtitle_translated_4360.srt"),
      },
      tags: {
        location: "إسطنبول",
        date: "20-20-2000",
        source: "مادي بلوك",
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
    id: "livepulse",
    component: LivePulseTemplate,
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
            top_left: [0, 0],
            bottom_right: [0, 0],
          },
          volume: 1,
          videoSrc: staticFile("Sequence05_1.mp4"),
          blur: [],
        },
      ],
      title: {
        text: "التي انطلقت لنصرة ال قدس ال قدس والأق صى",
      },
      captions: {
        src: staticFile("subtitle_translated_4360.srt"),
      },
      tags: {
        location: "إسطنبول",
        date: "20-20-2000",
        source: "مادي بلوك",
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
    id: "turkeypulse",
    component: TurkeyPulseTemplate,
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
            top_left: [0, 0],
            bottom_right: [0, 0],
          },
          volume: 1,
          videoSrc: staticFile("Sequence05_1.mp4"),
          blur: [],
        },
      ],
      title: {
        text: "التي انطلقت لنصرة ال قدس ال قدس والأق صى",
      },
      captions: {
        src: staticFile("subtitle_translated_4360.srt"),
      },
      tags: {
        location: "إسطنبول",
        date: "20-20-2000",
        source: "مادي بلوك",
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
    id: "turkhaber247",
    component: TurkHaber247Template,
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
    id: "wajha",
    component: WajhaTemplate,
    width: 1080,
    height: 1920,
    outroUrl: staticFile("wajha/elements/outro.webm"),
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
    id: "turkpress",
    component: TurkpressTemplate,
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
    id: "alqastal",
    component: AlqastalTemplate,
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
            top_left: [0, 0],
            bottom_right: [0, 0],
          },
          volume: 1,
          videoSrc: staticFile("Sequence05_1.mp4"),
          blur: [],
        },
      ],
      title: {
        text: "التي انطلقت لنصرة القدس والأقصى التي انطلق والأقصى",
      },
      captions: {
        src: staticFile("subtitle_translated_4360.srt"),
      },
      tags: { source: "بلا بلا بلا" },
      speakers: [],
      private_source: false,
      scale_to_fit: false,
      background_img_url: "",
    },
  },
  {
    id: "jomark",
    component: JomarkTemplate,
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
        src: staticFile("subtitle_translated_4362.srt"),
      },
      tags: {},
      speakers: [],
      private_source: false,
      scale_to_fit: false,
      background_img_url: "",
    },
  },
  {
    id: "alarabyfr",
    component: AlarabyfrTemplate,
    width: 1080,
    height: 1920,
    outroUrl: staticFile("alarabyfr/elements/outro.webm"),
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
        src: staticFile("subtitle_translated_4362.srt"),
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
    outroUrl: staticFile("fokus/elements/outro.webm"),
    defaultVideoSrc: "",
    outroOverlapFrames: 15,
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
