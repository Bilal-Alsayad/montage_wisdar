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

const TEMPLATE_FONT = "MontserratArabicBold";
const PRIMARY_COLOR = "#e90e10";

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const TITLE_STYLES: TitleAnimationStyles = {
  container: {
    position: "absolute",
    top: 1013,
    left: 72,
    width: 955,
    padding: "48px 54px",
    boxSizing: "border-box",
    overflow: "hidden",

    backgroundColor: "rgba(245, 245, 243, 0.94)",
    color: "#0A0A0A",

    borderLeft: "18px solid #A6A6A3",
    borderTopLeftRadius: 42,
    borderBottomLeftRadius: 42,

    fontFamily: TEMPLATE_FONT,
    fontSize: 65,
    textAlign: "left",
    direction: "ltr",
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
    color: "#ffffff",
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
  descriptionBackgroundColors: [PRIMARY_COLOR, "#FFFFFF"],
};

// --- TAGS_STYLES: location / date / source çok benziyor, ortak taban + fark eden icon değerleri ---

const tagsTextBox = {
  position: "absolute" as const,
  top: 298,
  right: 157,
  height: 55,
  padding: "0 30.75px",
  display: "inline-flex" as const,
  alignItems: "center" as const,
  fontFamily: TEMPLATE_FONT,
  fontSize: 30,
  whiteSpace: "nowrap" as const,
};

const tagsIconBox = {
  position: "absolute" as const,
  top: 298,
  right: 102,
  width: 55,
  height: 55,
  transformOrigin: "right center",
};

const tagsCommon: Omit<TagsAnimationStyles["location"], "icon"> = {
  textBox: tagsTextBox,
  text: { position: "relative" },
  iconBox: tagsIconBox,
  textBackgroundColors: [PRIMARY_COLOR, "#FFFFFF"],
  textColors: ["#DEDEDE", "#FFFFFF", PRIMARY_COLOR],
  iconBackgroundColors: ["#FFFFFF", "#171717", PRIMARY_COLOR],
};

const TAGS_STYLES: TagsAnimationStyles = {
  location: {
    ...tagsCommon,
    icon: {
      position: "absolute",
      top: 301.5,
      right: 112.85,
      width: 32.3,
      height: 45,
    },
  },
  date: {
    ...tagsCommon,
    icon: {
      position: "absolute",
      top: 304.34,
      right: 112.2,
      width: 33.6,
      height: 37.32,
    },
  },
  source: {
    ...tagsCommon,
    icon: {
      position: "absolute",
      top: 306.83,
      right: 111.85,
      width: 34.3,
      height: 34.35,
    },
  },
};

export default function TurkHaber247TikbumTemplate({ data }: TemplateProps) {
  const fontsLoaded = useLoadFonts([
    {
      family: TEMPLATE_FONT,
      url: staticFile(
        "short/turkhaber247tikbum/fonts/MontserratArabicBold.TTF",
      ),
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
        src={staticFile("short/turkhaber247tikbum/images/logo.png")}
        style={{ position: "absolute", top: 110, left: 70, width: 420 }}
      />

      {data.captions.src && (
        <Captions
          src={data.captions.src}
          containerStyle={{
            top: 1350,
            backgroundColor: hexToRgba(PRIMARY_COLOR, 0.54),
            textShadow: "0 0 50px 11.3px rgba(0, 0, 0, 0.52)",
            padding: "10px",
          }}
          textStyle={{
            color: "#bcbcbc",
            fontFamily: TEMPLATE_FONT,
            fontSize: 50,
          }}
        />
      )}
    </AbsoluteFill>
  );
}
