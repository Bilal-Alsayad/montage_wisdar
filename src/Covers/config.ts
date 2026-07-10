import { CoverTemplateProps } from "./types";
import HarmonyInstagramTemplate from "./Harmony/instagram";
import HarmonyYoutubeTemplate from "./Harmony/youtube";
import HarmonyFacebookTemplate from "./Harmony/facebook";
import HarmonyX43Template from "./Harmony/x43";
import HarmonyX34Template from "./Harmony/x34";
import HarmonyX11Template from "./Harmony/x11";
import MeeYoutubeTemplate from "./Mee/youtube";
import MeeInstagramTemplate from "./Mee/instagram";
import MeeFacebookTemplate from "./Mee/facebook"; 

export interface CoverTemplateConfig {
  id: string;
  component: React.ComponentType<CoverTemplateProps>;
  width: number;
  height: number;
  defaultText?: string;
  defaultSpeaker?: string;
  defaultAdj?: string;
  defaultTitle?: string;
  defaultSource?: string;
}

export const COVER_TEMPLATES: CoverTemplateConfig[] = [
  { id: "harmony-instagram", component: HarmonyInstagramTemplate, width: 1080, height: 1920, defaultText: "Suriye'nin güvenliği Bizim güvenliğimizdir" },
  { id: "harmony-youtube", component: HarmonyYoutubeTemplate, width: 1920, height: 1080, defaultText: "Suriye'nin güvenliği Bizim güvenliğimizdir" },
  { id: "harmony-facebook", component: HarmonyFacebookTemplate, width: 1080, height: 1440, defaultText: "Suriye'nin güvenliği Bizim güvenliğimizdir" },
  { id: "harmony-x43", component: HarmonyX43Template, width: 1440, height: 1080, defaultText: "Suriye'nin güvenliği Bizim güvenliğimizdir" },
  { id: "harmony-x34", component: HarmonyX34Template, width: 1080, height: 1440, defaultText: "Suriye'nin güvenliği Bizim güvenliğimizdir" },
  { id: "harmony-x11", component: HarmonyX11Template, width: 1080, height: 1080, defaultText: "Suriye'nin güvenliği Bizim güvenliğimizdir" },
  { id: "mee-youtube", component: MeeYoutubeTemplate, width: 1920, height: 1080, defaultText: "ISRAEL HAS BOOBY-TRAPPED EQUIPMENT ‘IN ALL COUNTRIES’" },
  { id: "mee-instagram", component: MeeInstagramTemplate, width: 1080, height: 1920, defaultText: "ISRAEL HAS BOOBY-TRAPPED EQUIPMENT ‘IN ALL COUNTRIES’" },
  { id: "mee-facebook", component: MeeFacebookTemplate, width: 1440, height: 1440, defaultText: "ISRAEL HAS BOOBY-TRAPPED EQUIPMENT ‘IN ALL COUNTRIES’" },
];
