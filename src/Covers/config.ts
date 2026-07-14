import { CoverTemplateProps } from "./types";

import MeeYoutubeTemplate from "./Mee/youtube";
import MeeInstagramTemplate from "./Mee/instagram";
import MeeFacebookTemplate from "./Mee/facebook"; 
import HarmonyInstagram1Template from "./Harmony/instagram_1";
import HarmonyInstagram2Template from "./Harmony/instagram_2";

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
  { id: "mee-youtube", component: MeeYoutubeTemplate, width: 1920, height: 1080, defaultText: "ISRAEL HAS BOOBY-TRAPPED EQUIPMENT ‘IN ALL COUNTRIES’" },
  { id: "mee-instagram", component: MeeInstagramTemplate, width: 1080, height: 1920, defaultText: "ISRAEL HAS BOOBY-TRAPPED EQUIPMENT ‘IN ALL COUNTRIES’" },
  { id: "mee-facebook", component: MeeFacebookTemplate, width: 1440, height: 1440, defaultText: "ISRAEL HAS BOOBY-TRAPPED EQUIPMENT ‘IN ALL COUNTRIES’" },
  { id: "harmony-instagram1", component: HarmonyInstagram1Template, width: 1080, height: 1920, defaultText: "Haaland IDF askeriyle" },
  { id: "harmony-instagram2", component: HarmonyInstagram2Template, width: 1080, height: 1920, defaultText: "New York Senatosunda Bir Filistinli" }
];
