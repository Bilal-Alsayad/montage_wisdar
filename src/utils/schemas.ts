import { z } from "zod";

export const CropCoordinatesSchema = z.object({
  topLeft: z.object({ x: z.number(), y: z.number() }),
  bottomRight: z.object({ x: z.number(), y: z.number() }),
});

export const CoverTemplateDataSchema = z.object({
  text_fields: z.record(z.string()),
  imageSrc: z.string(),
  crop: CropCoordinatesSchema.optional(),
});

export const CoverTemplateSchema = z.object({
  data: CoverTemplateDataSchema,
});
const coordinateTuple = z.tuple([z.number(), z.number()]);

const coordinateObjSchema = z.object({
  top_left: coordinateTuple,
  bottom_right: coordinateTuple,
});

const BlurSchema = z.object({
  top_left: coordinateTuple,
  bottom_right: coordinateTuple,
  blur_gain: z.number(),
  spread: z.number(),
});

const AudioClipSchema = z.object({
  src: z.string(),
  gain: z.number(),
  fadeIn: z.number(),
  fadeOut: z.number(),
  startTime: z.number(),
  duration: z.number(),
  trimStart: z.number().optional(),
  trimEnd: z.number().optional(),
});

export const VideoTemplateDataSchema = z.object({
  sequences: z.array(
    z.object({
      start: z.number(),
      end: z.number(),
      crop: coordinateObjSchema,
      blur: z.array(BlurSchema),
      volume: z.number(),
      videoSrc: z.string(),
    }),
  ),
  title: z.object({
    text: z.string(),
  }),
  captions: z.object({
    src: z.string(),
  }),
  tags: z.object({
    location: z.string().optional(),
    date: z.string().optional(),
    source: z.string().optional(),
  }),
  speakers: z.array(
    z.object({
      start: z.number(),
      name: z.string(),
      description: z.string(),
    }),
  ),
  private_source: z.preprocess((val) => {
    if (typeof val === "number") return Boolean(val);
    return val;
  }, z.boolean().optional()),
  scale_to_fit: z.preprocess((val) => {
    if (typeof val === "number") return Boolean(val);
    return val;
  }, z.boolean()),
  background_img_url: z.string(),
  audio_clips: z.array(AudioClipSchema).optional(),
  cover_src: z.string().optional(),
});

export const VideoTemplateSchema = z.object({
  outroStartFrame: z.number().optional(),
  outroDurationInFrames: z.number().optional(),
  mainVideoDurationInFrames: z.number().optional(),
  outroOverlapFrames: z.number().optional(),
  data: VideoTemplateDataSchema,
});
