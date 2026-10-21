export const MONTAGE_FILES_URL = "https://ekteb-01.s3.eu-central-1.amazonaws.com/ekteb2/montage_v2";
export const COVERS_FILES_URL = "https://ekteb-01.s3.eu-central-1.amazonaws.com/ekteb2/platforms_tempaltes/covers";
export const FONTS_FILES_URL = "https://ekteb-01.s3.eu-central-1.amazonaws.com/ekteb2/platforms_tempaltes/fonts";

export const MONTAGE_FILES_URL_DO = "https://fra1.digitaloceanspaces.com/ekteb-01/montage_v2/assets_remotion/video";
export const COVERS_FILES_URL_DO = "https://fra1.digitaloceanspaces.com/ekteb-01/montage_v2/assets_remotion/covers";
export const FONTS_FILES_URL_DO = "https://fra1.digitaloceanspaces.com/ekteb-01/montage_v2/assets_remotion/fonts";
/** Target video FPS — change this value to adjust all templates automatically */
export const VIDEO_FPS = 24;

/** Original FPS the animations were designed at */
const DESIGN_FPS = 30;

/** Convert a frame number from design FPS (30) to VIDEO_FPS */
export const f = (frame: number): number => Math.round(frame * VIDEO_FPS / DESIGN_FPS);