import { Easing, interpolate, useCurrentFrame } from "remotion";

const toRemotionFrame = (lottieFrame: number) => lottieFrame * 1.2;

const lottieInterpolate = (
  frame: number,
  lottieRange: [number, number],
  outputRange: [number, number],
  easing: (input: number) => number,
) =>
  interpolate(
    frame,
    [
      toRemotionFrame(lottieRange[0]),
      toRemotionFrame(lottieRange[1]),
    ],
    outputRange,
    {
      easing,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

const EASE = {
  bar: Easing.bezier(0.127, 0.117, 0.121, 1),
  capMove: Easing.bezier(0.169, 0.555, 0.314, 0.993),
  nameMove: Easing.bezier(0.154, 0.444, 0.434, 1),
  tracking: Easing.bezier(0.289, 0.381, 0.667, 1),
  descriptionDrop: Easing.bezier(0.185, 0.465, 0.48, 0.998),
  exitMove: Easing.bezier(0.169, 0.479, 0.314, 0.994),
  shrink: Easing.bezier(0.167, 0.153, 0.833, 1),
  fade: Easing.bezier(0.167, 0.167, 0.833, 0.833),
};

const BAR_LEFT = 0;

export const SPEAKER_ANIMATION_DURATION = 112;

// Sabit tasarım değerleri (eski hardcoded 529 / 476 değerlerinin referans noktası).
// Bunlar artık "üst sınır" değil, "varsayılan / minimum" genişlik olarak kullanılıyor.
const DEFAULT_BAR_RIGHT = 529; // purple bar & moving cap & exit eraser için varsayılan sağ sınır
const DEFAULT_BACKDROP_RIGHT = 476; // backdrop için varsayılan sağ sınır
const BACKDROP_TO_BAR_GAP = DEFAULT_BAR_RIGHT - DEFAULT_BACKDROP_RIGHT; // 53px sabit fark korunuyor

const NAME_LEFT_PADDING = 56; // ismin bar içindeki sol boşluğu (nameLeft'in son değeriyle uyumlu)
const NAME_RIGHT_PADDING = 40; // ismin sağında bırakılacak boşluk
const DESCRIPTION_LEFT_PADDING = 52; // açıklamanın sol boşluğu (mevcut left: 52 ile uyumlu)
const DESCRIPTION_RIGHT_PADDING = 40;

// Canvas tabanlı gerçek metin genişliği ölçümü.
// Aynı (text, font) kombinasyonu için tekrar tekrar ölçüm yapmamak üzere basit bir cache kullanılıyor.
//
// NOT: tsconfig'de "dom" lib'i açık olmayabileceği için `document`/`HTMLCanvasElement`
// gibi global DOM tiplerine doğrudan referans vermiyoruz. Bunun yerine burada ihtiyaç
// duyduğumuz minimum yüzeyi kendi arayüzlerimizle tanımlıyoruz (no-explicit-any uyumlu).
interface MinimalCanvasContext2D {
  font: string;
  measureText: (text: string) => { width: number };
}

interface MinimalCanvasElement {
  getContext: (contextId: "2d") => MinimalCanvasContext2D | null;
}

interface MinimalDocument {
  createElement: (tagName: "canvas") => MinimalCanvasElement;
}

const getGlobalDocument = (): MinimalDocument | undefined => {
  const globalScope = globalThis as unknown as { document?: MinimalDocument };
  return globalScope.document;
};

const measurementCache = new Map<string, number>();
let measurementCanvas: MinimalCanvasElement | undefined;

const measureTextWidth = (
  text: string,
  fontFamily: string,
  fontSize: number,
  fontWeight: string | number = "normal",
): number => {
  if (!text) return 0;

  const cacheKey = `${fontFamily}|${fontSize}|${fontWeight}|${text}`;
  const cached = measurementCache.get(cacheKey);
  if (cached !== undefined) return cached;

  const fallbackWidth = text.length * fontSize * 0.55;

  const doc = getGlobalDocument();

  // SSR / Node ortamında (Remotion render sırasında) document her zaman mevcut olmayabilir.
  // Bu durumda karakter sayısına dayalı kaba bir tahmine düşüyoruz.
  if (!doc) {
    measurementCache.set(cacheKey, fallbackWidth);
    return fallbackWidth;
  }

  if (!measurementCanvas) {
    measurementCanvas = doc.createElement("canvas");
  }

  const context = measurementCanvas.getContext("2d");

  if (!context) {
    measurementCache.set(cacheKey, fallbackWidth);
    return fallbackWidth;
  }

  context.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  const width = context.measureText(text).width;

  measurementCache.set(cacheKey, width);
  return width;
};

interface SpeakerAnimationProps {
  name?: string;
  description?: string;
  fontFamily: string;
}

export default function SpeakerAnimation({
  name,
  description,
  fontFamily,
}: SpeakerAnimationProps) {
  const frame = useCurrentFrame();

  if (!name && !description) {
    return null;
  }

  // --- Dinamik genişlik hesaplama ---
  // Kutunun (bar) hacmi, isim ve açıklamadan HANGİSİ daha uzunsa ona göre belirlenir.
  // "Uzunluk" burada gerçek render edilmiş piksel genişliği anlamına geliyor (Canvas ile ölçülüyor).
  const nameTextWidth = name
    ? measureTextWidth(name, fontFamily, 41)
    : 0;
  const descriptionTextWidth = description
    ? measureTextWidth(description, fontFamily, 35)
    : 0;

  // Her metnin kendi padding'iyle birlikte ihtiyaç duyduğu toplam bar genişliği
  const nameRequiredRight =
    BAR_LEFT + NAME_LEFT_PADDING + nameTextWidth + NAME_RIGHT_PADDING;
  const descriptionRequiredRight =
    BAR_LEFT + DESCRIPTION_LEFT_PADDING + descriptionTextWidth + DESCRIPTION_RIGHT_PADDING;

  // Ana kural: açıklama esas alınır, ama isim açıklamadan uzunsa ismin boyutu alınır.
  // Yani: max(isim, açıklama, varsayılan minimum)
  const dynamicBarRight = Math.max(
    DEFAULT_BAR_RIGHT,
    nameRequiredRight,
    descriptionRequiredRight,
  );

  const dynamicBackdropRight = dynamicBarRight - BACKDROP_TO_BAR_GAP;

  // --- Animasyonlar artık sabit 529/476 yerine yukarıda hesaplanan dinamik değerleri hedefliyor ---

  const purpleRight = lottieInterpolate(
    frame,
    [2, 24],
    [-97, dynamicBarRight],
    EASE.bar,
  );

  const purpleEraseLeft = interpolate(
    frame,
    [toRemotionFrame(15), toRemotionFrame(37) + 3],
    [-87, dynamicBarRight],
    {
      easing: EASE.bar,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const movingCapRight = lottieInterpolate(
    frame,
    [2, 24],
    [-88, dynamicBarRight],
    EASE.capMove,
  );

  const movingCapWidth = lottieInterpolate(
    frame,
    [11, 28],
    [43, 1],
    EASE.shrink,
  );

  const movingCapOpacity = lottieInterpolate(
    frame,
    [27, 28],
    [1, 0],
    EASE.fade,
  );

  const staticCapOpacity =
    frame < toRemotionFrame(27)
      ? 0
      : lottieInterpolate(frame, [36, 59], [1, 0], EASE.fade);

  const nameLeft = lottieInterpolate(
    frame,
    [3, 27],
    [137, 56],
    EASE.nameMove,
  );

  const nameLetterSpacing = lottieInterpolate(
    frame,
    [13, 34],
    [7, 0],
    EASE.tracking,
  );

  const backdropRight = lottieInterpolate(
    frame,
    [8, 30],
    [-100, dynamicBackdropRight],
    EASE.bar,
  );

  const backdropEnterOpacity = lottieInterpolate(
    frame,
    [13, 31],
    [0, 1],
    EASE.fade,
  );

  const backdropExitOpacity = lottieInterpolate(
    frame,
    [67, 82],
    [1, 0],
    EASE.fade,
  );

  const descriptionTranslateY = lottieInterpolate(
    frame,
    [14, 39],
    [-95, 0],
    EASE.descriptionDrop,
  );

  const descriptionLineHeight = lottieInterpolate(
    frame,
    [15, 40],
    [50, 42],
    EASE.descriptionDrop,
  );

  const descriptionOpacity =
    frame < toRemotionFrame(14)
      ? 0
      : lottieInterpolate(frame, [67, 82], [1, 0], EASE.fade);

  const exitEraserRight = lottieInterpolate(
    frame,
    [66, 88],
    [BAR_LEFT, dynamicBarRight],
    EASE.exitMove,
  );

  const exitEraserWidth = lottieInterpolate(
    frame,
    [75, 92],
    [54, 0],
    EASE.shrink,
  );


  const purpleLeft =
    frame < toRemotionFrame(15)
      ? BAR_LEFT
      : Math.max(BAR_LEFT, purpleEraseLeft);

  const purpleWidth = Math.max(
    0,
    Math.max(BAR_LEFT, Math.min(dynamicBarRight, purpleRight)) - purpleLeft,
  );

  const exitHasStarted = frame >= toRemotionFrame(66);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 420,
        width: 1080,
        height: 1080,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: `inset(0 0 0 ${
            exitHasStarted ? exitEraserRight : BAR_LEFT
          }px)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: BAR_LEFT,
            top: 514,
            width: Math.max(0, backdropRight - BAR_LEFT),
            height: 60,
            opacity: Math.min(
              backdropEnterOpacity,
              backdropExitOpacity,
            ),
            background:
              "linear-gradient(90deg, rgba(0, 0, 0, 0.35), rgba(82, 47, 113, 0.35))",
          }}
        />

        {name && (
          <div
            style={{
              position: "absolute",
              left: BAR_LEFT,
              top: 514,
              width: Math.max(
                0,
                Math.max(BAR_LEFT, Math.min(dynamicBarRight, movingCapRight)) - BAR_LEFT,
              ),
              height: 60,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: nameLeft - BAR_LEFT,
                top: "50%",
                transform: "translateY(-50%)",
                fontFamily,
                fontSize: 41,
                lineHeight: 1,
                letterSpacing: nameLetterSpacing,
                color: "#FFFFFF",
                whiteSpace: "nowrap",
              }}
            >
              {name}
            </div>
          </div>
        )}


        <div
          style={{
            position: "absolute",
            left: dynamicBarRight - 54,
            top: 514,
            width: 54,
            height: 60,
            backgroundColor: "#FFFFFF",
            opacity: staticCapOpacity,
          }}
        />

        <div
          style={{
            position: "absolute",
            left: purpleLeft,
            top: 514,
            width: purpleWidth,
            height: 60,
            backgroundColor: "#522F71",
          }}
        />



        {name && purpleWidth > 0 ? (
          <div
            style={{
              position: "absolute",
              left: purpleLeft,
              top: 514,
              width: purpleWidth,
              height: 60,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: nameLeft - purpleLeft,
                top: "50%",
                transform: "translateY(-50%)",
                fontFamily,
                fontSize: 41,
                lineHeight: 1,
                letterSpacing: nameLetterSpacing,
                color: "#000000",
                whiteSpace: "nowrap",
              }}
            >
              {name}
            </div>
          </div>
        ) : null}

        <div
          style={{
            position: "absolute",
            left: movingCapRight - movingCapWidth,
            top: 514,
            width: movingCapWidth,
            height: 60,
            backgroundColor: "#FFFFFF",
            opacity: movingCapOpacity,
          }}
        />
      </div>

      {description && (
        <div
          style={{
            position: "absolute",
            left: 52,
            top: 576,
            width: Math.max(477, descriptionTextWidth + DESCRIPTION_RIGHT_PADDING),
            height: 112,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              transform: `translateY(${descriptionTranslateY}px)`,
              opacity: descriptionOpacity,
              fontFamily,
              fontSize: 35,
              lineHeight: `${descriptionLineHeight}px`,
              color: "#FFFFFF",
              whiteSpace: "pre-line",
            }}
          >
            {description}
          </div>
        </div>
      )}

      {exitHasStarted && (
        <div
          style={{
            position: "absolute",
            left: exitEraserRight - exitEraserWidth,
            top: 514,
            width: exitEraserWidth,
            height: 60,
            backgroundColor: "#FFFFFF",
          }}
        />
      )}
    </div>
  );
}