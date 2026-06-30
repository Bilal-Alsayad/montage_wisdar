import Captions from "../../Components/Captions";

type PalCaptionsProps = {
  src: string;
  fontFamily: string;
};

const MIN_CAPTION_WIDTH = 720;
const CAPTION_PADDING = 18;
const CAPTION_FONT_SIZE = 60;
const CAPTION_LETTER_SPACING = "0px";

export default function PalCaptions({ src, fontFamily }: PalCaptionsProps) {
  return (
    <Captions
      src={src}
      containerStyle={{
        top: 1120,
        left: "50%",
        minWidth: MIN_CAPTION_WIDTH,
        maxWidth: "90%",
        width: "fit-content",
        boxSizing: "border-box",
        padding: CAPTION_PADDING,
        borderRadius: 12,
        backgroundColor: "rgba(172, 0, 0, 0.85)",
        boxShadow: "2.12px 2.12px 12px 0 rgba(0, 0, 0, 1)",
        pointerEvents: "none",
        transform: "translateX(-50%)",
        zIndex: 100,
      }}
      textStyle={{
        color: "#ffffff",
        fontFamily,
        fontWeight: 700,
        fontSize: CAPTION_FONT_SIZE,
        letterSpacing: CAPTION_LETTER_SPACING,
        lineHeight: 1.1,
        textAlign: "center",
        textShadow: "2.12px 2.12px 12px rgba(0, 0, 0, 1)",
        textTransform: "uppercase",
        whiteSpace: "pre-wrap",
        unicodeBidi: "plaintext",
      }}
    />
  );
}