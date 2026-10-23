/* eslint-disable @remotion/from-0 */
import { AbsoluteFill, Img, Sequence, staticFile } from "remotion";
import { useLoadFonts } from "../../hooks/useLoadFonts";
import Video from "../../Components/Video";
import Captions from "../../Components/Captions";
import AudioClips from "../../Components/AudioClips";
import Cover from "../../Components/Cover";
import { TemplateProps } from "../types";

import TitleAnimation, {
  TITLE_ANIMATION_DURATION,
  type TitleAnimationStyles,
} from "./TitleAnimation";

import SpeakerAnimation, {
  SPEAKER_ANIMATION_DURATION,
  type SpeakerAnimationStyles,
} from "./SpeakerAnimation";

import TagsAnimation, {
  TAGS_ANIMATION_DURATION,
  type TagsAnimationStyles,
} from "./TagsAnimation";

const TEMPLATE_FONT = "TajawalBold";
const PRIMARY_COLOR = "#9F1117";

const TITLE_STYLES: TitleAnimationStyles = {
  container: {
    position: "absolute",
    top: 871,
    left: 155,
    width: 770,
    height: 450,
    transform: "scale(0.9)",

    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 12,
    padding: "74px 32px 0 0",
    boxSizing: "border-box",

    backgroundImage: [
      "linear-gradient(#D20A1D, #D20A1D)",
      "linear-gradient(#868686, #868686)",
      "linear-gradient(#868686, #868686)",
      "linear-gradient(#868686, #868686)",
      "linear-gradient(#868686, #868686)",
    ].join(", "),

    backgroundPosition: [
      "right 0 top 0",
      "left 14px top 46px",
      "left 14px top 46px",
      "left 14px top 400px",
      "left 14px top 376px",
    ].join(", "),

    backgroundSize: [
      "10px 450px",
      "30px 4px",
      "4px 28px",
      "30px 4px",
      "4px 28px",
    ].join(", "),

    backgroundRepeat: "no-repeat",
  },

  firstLine: {
    width: 668,
    height: 146,
    boxSizing: "border-box",
    padding: "0 48px 0 16px",

    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",

    backgroundColor: "#D20A1D",
    color: "#F2E7D4",

    fontFamily: "Amiri",
    fontSize: 76,
    fontWeight: 700,
    lineHeight: 1.25,
    textAlign: "right",
    direction: "rtl",
    whiteSpace: "nowrap",
  },

  secondLine: {
    width: 694,
    height: 144,
    boxSizing: "border-box",
    padding: "0 48px 0 16px",

    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",

    backgroundColor: "#111111",
    color: "#F2E7D4",

    fontFamily: "Amiri",
    fontSize: 76,
    fontWeight: 700,
    lineHeight: 1.25,
    textAlign: "right",
    direction: "rtl",
    whiteSpace: "nowrap",
  },
};

const SPEAKER_STYLES: SpeakerAnimationStyles = {
  nameContainer: {
    position: "absolute",
    top: 938.223,
    right: 100,
    height: 56.7,
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  nameText: {
    color: "#F2E7D4",
    fontFamily: TEMPLATE_FONT,
    fontSize: 50,
    lineHeight: "60px",
    whiteSpace: "nowrap",
    direction: "rtl",
  },
  descriptionContainer: {
    position: "absolute",
    top: 994.723,
    right: 100,
    height: 56.7,
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  descriptionText: {
    color: "#171717",
    fontFamily: TEMPLATE_FONT,
    fontSize: 35,
    lineHeight: "42px",
    whiteSpace: "nowrap",
    direction: "rtl",
  },
  nameBackgroundColors: ["#DEDEDE", PRIMARY_COLOR],
  descriptionBackgroundColors: [PRIMARY_COLOR, "#F2E7D4"],
};

const tagsCommon: Omit<TagsAnimationStyles["location"], "icon"> = {
  textBox: {
    position: "absolute",
    top: 298,
    left: 157,
    height: 55,
    padding: "0 30.75px",
    display: "inline-flex",
    alignItems: "center",
    fontFamily: TEMPLATE_FONT,
    fontSize: 30,
    whiteSpace: "nowrap",
  },
  text: { position: "relative" },
  alignment: "left",
  textBackgroundColors: ["#F2E7D4", "#F2E7D4"],
  textColors: ["#000000", "#000000", "#000000"],
  iconBox: {
    position: "absolute",
    top: 298,
    left: 102,
    width: 55,
    height: 55,
    transformOrigin: "left center",
  },
  iconBackgroundColors: [PRIMARY_COLOR, PRIMARY_COLOR, PRIMARY_COLOR],
};

const TAGS_STYLES: TagsAnimationStyles = {
  location: {
    ...tagsCommon,
    icon: {
      position: "absolute",
      top: 301.5,
      left: 112.85,
      width: 32.3,
      height: 45,
    },
  },
  date: {
    ...tagsCommon,
    icon: {
      position: "absolute",
      top: 304.34,
      left: 112.2,
      width: 33.6,
      height: 37.32,
    },
  },
  source: {
    ...tagsCommon,
    icon: {
      position: "absolute",
      top: 306.83,
      left: 111.85,
      width: 34.3,
      height: 34.35,
    },
  },
};

export default function TounesdhedinqilabTemplate({ data }: TemplateProps) {
  const fontsLoaded = useLoadFonts([
    {
      family: TEMPLATE_FONT,
      url: staticFile("short/tounesdhedinqilab/fonts/TajawalBold.TTF"),
    },
  ]);

  if (!fontsLoaded) return null;

  return (
    <AbsoluteFill>
      <Video
        sequences={data.sequences}
        scaleToFit={data.scale_to_fit}
        backgroundUrl={data.background_img_url}
      />

      {data.cover_src && <Cover coverSrc={data.cover_src} />}

      {data.audio_clips && <AudioClips audioClips={data.audio_clips} />}

      {data.speakers.map((speaker, index) => (
        <Sequence
          key={index}
          from={TITLE_ANIMATION_DURATION}
          durationInFrames={SPEAKER_ANIMATION_DURATION}
        >
          <SpeakerAnimation
            name={speaker.name}
            description={speaker.description}
            styles={SPEAKER_STYLES}
          />
        </Sequence>
      ))}

      <Sequence from={0} durationInFrames={TITLE_ANIMATION_DURATION}>
        <TitleAnimation text={data.title.text} styles={TITLE_STYLES} />
      </Sequence>

      <Sequence
        from={TITLE_ANIMATION_DURATION}
        durationInFrames={TAGS_ANIMATION_DURATION}
      >
        <TagsAnimation
          location={data.tags.location}
          date={data.tags.date}
          source={data.tags.source}
          styles={TAGS_STYLES}
        />
      </Sequence>

      <Img
        src={staticFile("short/tounesdhedinqilab/images/logo.png")}
        style={{ position: "absolute", top: 260, right: 102, width: 200 }}
      />

      {data.captions.src && (
        <Captions
          src={data.captions.src}
          containerStyle={{
            top: 1400,
            backgroundColor: "#00152B",
            padding: "5px 16px",
            width: "fit-content",
            textAlign: "center",
            clipPath:
              "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
          }}
          textStyle={{
            color: "#FFF4E8",
            fontFamily: "Amiri",
            fontSize: 55,
            fontWeight: 700,
            lineHeight: 1.2,
            direction: "rtl",
          }}
        />
      )}
    </AbsoluteFill>
  );
}
