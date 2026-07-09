import { z } from "zod";
import { CoverTemplateDataSchema, CoverTemplateSchema } from "../utils/schemas";

export type CoverTemplateData = z.infer<typeof CoverTemplateDataSchema>;
export type CoverTemplateProps = z.infer<typeof CoverTemplateSchema>;
