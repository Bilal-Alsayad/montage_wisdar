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

const TEMPLATE_FONT = "Tounes2020AlmaraiExtraBold";
const PRIMARY_COLOR = "#d50a10";
const CUT_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 145" preserveAspectRatio="none">
    <path fill="white" d="M24 0 H900 V121 L876 145 H0 V24 Z"/>
  </svg>`
)}")`;

const TITLE_STYLES: TitleAnimationStyles = {
  container: {
    position: "absolute",
    top: 945,
    left: 90,
    width: 900,
    height: 309,
    background: "linear-gradient(#12AEBA, #12AEBA) bottom / 100% 5px no-repeat",
  },

  firstLine: {
    marginLeft: 52,
    width: 848,
    height: 143,
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D30104",
    maskImage: CUT_MASK,
    maskSize: "100% 100%",
    maskRepeat: "no-repeat",
    WebkitMaskImage: CUT_MASK,
    WebkitMaskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
    color: "#FFF2E2",
    fontFamily: TEMPLATE_FONT,
    fontSize: 76,
    lineHeight: 1.25,
    whiteSpace: "nowrap",
  },

  secondLine: {
    marginTop: 17,
    width: 900,
    height: 144,
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00071D",
    maskImage: CUT_MASK,
    maskSize: "100% 100%",
    maskRepeat: "no-repeat",
    WebkitMaskImage: CUT_MASK,
    WebkitMaskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
    color: "#EDE1CF",
    fontFamily: TEMPLATE_FONT,
    fontSize: 76,
    lineHeight: 1.25,
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
const tagsTextBox = {
  position: "absolute" as const,
  top: 298,
  left: 157,
  height: 55,
  padding: "0 30.75px",
  display: "inline-flex" as const,
  alignItems: "center" as const,
  fontFamily: TEMPLATE_FONT,
  fontSize: 30,
  whiteSpace: "nowrap" as const,
  clipPath:
    "polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%)",
};
const tagsIconBox = {
  position: "absolute" as const,
  top: 298,
  left: 102,
  width: 55,
  height: 55,
  transformOrigin: "left center",
};
const tagsCommon: Omit<TagsAnimationStyles["location"], "icon"> = {
  textBox: tagsTextBox,
  text: { position: "relative" },
  alignment: "left",
  iconBox: tagsIconBox,
  textBackgroundColors: ["#F3EEE5", "#F3EEE5"],
  textColors: ["#011429", "#011429", "#011429"],
  iconBackgroundColors: ["#D50A10", "#D50A10", "#D50A10"],
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
export default function Tounes2020Template({ data }: TemplateProps) {
  const fontsLoaded = useLoadFonts([
    {
      family: TEMPLATE_FONT,
      url: staticFile("pulitkat/tounes2020/fonts/Almarai ExtraBold.ttf"),
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
        src={staticFile("pulitkat/tounes2020/images/logo.png")}
        style={{ position: "absolute", top: 260, right: 102, width: 200 }}
      />
      {data.captions.src && (
        <Captions
          src={data.captions.src}
          containerStyle={{
            top: 1450,
            backgroundColor: "#011429",
            borderBottom: "5px solid #1DAFBA",
            padding: "5px 16px",
            width: "fit-content",
            textAlign: "center",
            clipPath:
              "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
          }}
          textStyle={{
            color: "#F3EEE5",
            fontFamily: "Cairo",
            fontSize: 55,
            fontWeight: 800,
          }}
        />
      )}
    </AbsoluteFill>
  );
}
