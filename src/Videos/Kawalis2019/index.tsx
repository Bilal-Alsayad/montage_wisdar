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

const TEMPLATE_FONT = "HelveticaNeueLT";
const TITLE_FONT = "CairoBold";

const TITLE_STYLES: TitleAnimationStyles = {
  container: {
    position: "absolute",
    top: 918,
    left: 31,
    width: 1017,
    height: 361,
  },

  firstLine: {
    position: "absolute",
    top: 27,
    right: 59,
    width: 846,
    height: 145,
    boxSizing: "border-box",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    padding: "0 35px",
    backgroundColor: "#E51B23",
    clipPath:
      "polygon(22px 0, 100% 0, 100% calc(100% - 22px), calc(100% - 22px) 100%, 0 100%, 0 22px)",

    color: "#FFFFFF",
    fontFamily: "Cairo",
    fontSize: 94,
    fontWeight: 800,
    lineHeight: 1.15,
    textAlign: "center",
    direction: "rtl",
    whiteSpace: "nowrap",
  },

  secondLine: {
    position: "absolute",
    top: 189,
    right: 59,
    width: 900,
    height: 145,
    boxSizing: "border-box",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    padding: "0 35px",
    backgroundColor: "#F2ECE3",
    clipPath:
      "polygon(22px 0, 100% 0, 100% calc(100% - 22px), calc(100% - 22px) 100%, 0 100%, 0 22px)",

    color: "#061525",
    fontFamily: "Cairo",
    fontSize: 94,
    fontWeight: 800,
    lineHeight: 1.15,
    textAlign: "center",
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
    color: "#FFFFFF",
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
    color: "#FFFFFF",
    fontFamily: TEMPLATE_FONT,
    fontSize: 35,
    lineHeight: "42px",
    whiteSpace: "nowrap",
    direction: "rtl",
  },
  nameBackgroundColors: ["#E51B23", "#E51B23"],
  descriptionBackgroundColors: ["#08223A", "#08223A"],
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
  textBackgroundColors: ["#08223A", "#08223A"],
  textColors: ["#F2ECE3", "#F2ECE3", "#F2ECE3"],
  iconBox: {
    position: "absolute",
    top: 298,
    left: 102,
    width: 55,
    height: 55,
    transformOrigin: "left center",
  },
  iconBackgroundColors: ["#E51B23", "#E51B23", "#E51B23"],
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

export default function Kawalis2019Template({ data }: TemplateProps) {
  const fontsLoaded = useLoadFonts([
    {
      family: TEMPLATE_FONT,
      url: staticFile("short/kawalis2019/fonts/HelveticaNeueLT.otf"),
    },
    {
      family: TITLE_FONT,
      url: staticFile("fonts/CairoBold.ttf"),
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
        src={staticFile("short/kawalis2019/images/logo.png")}
        style={{ position: "absolute", top: 260, right: 102, width: 200 }}
      />

      {data.captions.src && (
        <Captions
          src={data.captions.src}
          containerStyle={{
            top: 1400,
            maxWidth: "90%",
            padding: "16px 28px",
            boxSizing: "border-box",
            backgroundColor: "#EAE4DB",
          }}
          textStyle={{
            color: "#051424",
            fontFamily: TITLE_FONT,
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
