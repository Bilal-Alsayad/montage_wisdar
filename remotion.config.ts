// See all configuration options: https://remotion.dev/docs/config
// Each option also is available as a CLI flag: https://remotion.dev/docs/cli

// Note: When using the Node.JS APIs, the config file doesn't apply. Instead, pass options directly to the APIs

import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind-v4";

Config.setVideoImageFormat("png");
Config.setOverwriteOutput(true);
Config.overrideWebpackConfig(enableTailwind);

// Enable GPU hardware acceleration for encoding
Config.setHardwareAcceleration("if-possible");

// Disable CORS restrictions to allow fetching external media (e.g. from S3)
Config.setChromiumDisableWebSecurity(true);
