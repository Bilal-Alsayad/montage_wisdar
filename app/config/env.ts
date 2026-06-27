import dotenv from "dotenv";

dotenv.config();

// --- AWS Regions supported by Remotion Lambda ---
export type AwsRegion =
  | "us-east-1"
  | "us-east-2"
  | "us-west-1"
  | "us-west-2"
  | "eu-central-1"
  | "eu-west-1"
  | "eu-west-2";

// --- Required environment variable validation ---
function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    console.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
  return value;
}

// --- Validated environment config ---
export const env = {
  port: parseInt(process.env.API_PORT || "8000", 10),
  apiKey: requireEnv("API_KEY"),
  maxConcurrentRenders: parseInt(process.env.MAX_CONCURRENT_RENDERS || "3", 10),
  webhookUrl: requireEnv("WEBHOOK_URL"),
  aws: {
    accessKeyId: requireEnv("REMOTION_AWS_ACCESS_KEY_ID"),
    secretAccessKey: requireEnv("REMOTION_AWS_SECRET_ACCESS_KEY"),
  },

  remotion: {
    region: requireEnv("REMOTION_REGION") as AwsRegion,
    functionName: requireEnv("REMOTION_FUNCTION_NAME"),
    serveUrl: requireEnv("REMOTION_SERVE_URL"),
    bucketName: requireEnv("REMOTION_BUCKET_NAME"),
  },
} as const;
