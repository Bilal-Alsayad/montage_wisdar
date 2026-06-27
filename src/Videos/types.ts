import { z } from "zod";
import { VideoTemplateDataSchema, VideoTemplateSchema } from "../utils/schemas";

export type TemplateData = z.infer<typeof VideoTemplateDataSchema>;
export type TemplateProps = z.infer<typeof VideoTemplateSchema>;
