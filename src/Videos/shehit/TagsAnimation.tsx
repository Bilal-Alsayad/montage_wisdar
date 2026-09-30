import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

export const TAGS_ANIMATION_DURATION = 151;

const CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const ORANGE_FILTER =
  "brightness(0) saturate(100%) invert(63%) sepia(92%) saturate(1794%) hue-rotate(355deg) brightness(101%) contrast(95%)";

const slideIn = (frame: number, start: number, end: number, from = 80) =>
  interpolate(frame, [start, end], [from, 0], {
    ...CLAMP,
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

const fadeIn = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    ...CLAMP,
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

const slideOut = (frame: number, start: number, end: number, to = 70) =>
  interpolate(frame, [start, end], [0, to], {
    ...CLAMP,
    easing: Easing.bezier(0.64, 0, 0.78, 0),
  });

const fadeOut = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [1, 0], {
    ...CLAMP,
    easing: Easing.bezier(0.64, 0, 0.78, 0),
  });

function SourceRow({
  text,
  fontFamily,
}: {
  text: string;
  fontFamily: string;
}) {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        top: 470,
        right: 78,
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        opacity: fadeIn(frame, 0, 16) * fadeOut(frame, 132, 149),
        transform: `translateX(${slideIn(frame, 0, 26, 92) + slideOut(frame, 132, 149, 70)}px)`,
      }}
    >
      <span
        dir="auto"
        style={{
          color: "#FFFFFF",
          fontFamily,
          fontSize: 28,
          lineHeight: "34px",
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </span>

      <Img
        src={staticFile("shehit/images/source.png")}
        style={{
          width: 48,
          height: 28,
          objectFit: "contain",
          filter: "drop-shadow(0 3px 7px rgba(0,0,0,0.35))",
        }}
      />
    </div>
  );
}

function InfoRow({
  text,
  icon,
  top,
  start,
  fontSize,
  lineHeight,
  iconWidth,
  iconHeight,
  fontFamily,
}: {
  text: string;
  icon: string;
  top: number;
  start: number;
  fontSize: number;
  lineHeight: string;
  iconWidth: number;
  iconHeight: number;
  fontFamily: string;
}) {
  const frame = useCurrentFrame();

  const opacity = fadeIn(frame, start, start + 14) * fadeOut(frame, 132, 149);
  const x = slideIn(frame, start, start + 24, 112) + slideOut(frame, 132, 149, 70);

  return (
    <div
      style={{
        position: "absolute",
        top,
        right: 78,
        display: "inline-flex",
        alignItems: "stretch",
        opacity,
        transform: `translateX(${x}px)`,
      }}
    >
      <div
        style={{
          height: 54,
          backgroundColor: "#3F63A7",
          display: "inline-flex",
          alignItems: "center",
          padding: "0 18px 0 18px",
          color: "#FFFFFF",
          fontFamily,
          fontSize,
          lineHeight,
          whiteSpace: "nowrap",
          position: "relative",
          zIndex: 2,
          marginRight: -1,
        }}
      >
        <span dir="auto">{text}</span>
      </div>

      <div
        style={{
          width: 54,
          height: 54,
          backgroundColor: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Img
          src={staticFile(`shehit/images/${icon}`)}
          style={{
            width: iconWidth,
            height: iconHeight,
            objectFit: "contain",
            filter: ORANGE_FILTER,
          }}
        />
      </div>
    </div>
  );
}

export default function TagsAnimation({
  source = "",
  location = "",
  date = "",
  fontFamily,
}: {
  source?: string;
  location?: string;
  date?: string;
  fontFamily: string;
}) {
  return (
    <AbsoluteFill>
      {source ? <SourceRow text={source} fontFamily={fontFamily} /> : null}

      {date ? (
        <InfoRow
          text={date}
          icon="date.png"
          top={540}
          start={3}
          fontSize={36}
          lineHeight="43px"
          iconWidth={31}
          iconHeight={31}
          fontFamily={fontFamily}
        />
      ) : null}

      {location ? (
        <InfoRow
          text={location}
          icon="location.png"
          top={604}
          start={9}
          fontSize={42}
          lineHeight="50px"
          iconWidth={26}
          iconHeight={34}
          fontFamily={fontFamily}
        />
      ) : null}
    </AbsoluteFill>
  );
}