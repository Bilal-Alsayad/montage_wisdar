import { CoverTemplateProps } from "./types";

import MeeYoutubeTemplate from "./Mee/youtube";
import MeeInstagramTemplate from "./Mee/instagram";
import MeeFacebookTemplate from "./Mee/facebook"; 
import HarmonyInstagram1Template from "./Harmony/cover_reel1";
import HarmonyInstagram2Template from "./Harmony/cover_reel2";
import IrsalInstagramTemplate from "./irsal/instagram";
import TventInstagramTemplate from "./tvnet/instagram"
import ThetimesofpalestineInstagramTemplate from "./thetimesofpalestine/instagram"
import AukFacebook1Template from "./auk/facebook_1"
import AukFacebook2Template from "./auk/facebook_2"
import AukFacebook3Template from "./auk/facebook_3"
import AukFacebook4Template from "./auk/facebook_4"
import AukFacebook5Template from "./auk/facebook_5"
import AukFacebook6Template from "./auk/facebook_6"
import AukFacebook7Template from "./auk/facebook_7"
import AukInstagram2Template from "./auk/instagram_2"
import AukInstagram1Template from "./auk/instagram_1"
import AukYoutube1Template from "./auk/youtube_1"
import AukYoutube2Template from "./auk/youtube_2"



export interface CoverTemplateConfig {
  id: string;
  component: React.ComponentType<CoverTemplateProps>;
  width: number;
  height: number;
  defaultText?: string;
  defaultLocation?: string;
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
  { id: "harmony-instagram2", component: HarmonyInstagram2Template, width: 1080, height: 1920, defaultText: "New York Senatosunda Bir Filistinli" },
  { id: "irsal-instagram", component: IrsalInstagramTemplate, width: 1080, height: 1920, defaultText: "التي انطلقت لنصرة القدس والأقصى التي انطلقت لنصرة القدس والأقصى" },
  { id: "tvent-instagram", component: TventInstagramTemplate, width: 1080, height: 1920, defaultText: "Daughter Blasts NM Daughter Blasts NM Daughter Blasts NM" },
  { id: "Thetimesofpalestine-instagram", component: ThetimesofpalestineInstagramTemplate, width: 1080, height: 1920, defaultText: "Daughter Blasts Daughter Blast" },
  { id: "auk-facebook-1", component: AukFacebook1Template, width: 1620, height: 2025, defaultText: "شركة كلود الصينة تقضي على مستعملين ذكاء اصطناعي بتحديث جديد",defaultLocation:"صين" },
  { id: "auk-facebook-2", component: AukFacebook2Template, width: 1620, height: 1620, defaultText: "شركة كلود الصينة تقضي على مستعملين ذكاء اصطناعي بتحديث جديد" },
  { id: "auk-facebook-3", component: AukFacebook3Template, width: 1620, height: 1620, defaultText: "شركة كلود الصينة تقضي على مستعملين ذكاء اصطناعي بتحديث جديد" },
  { id: "auk-facebook-4", component: AukFacebook4Template, width: 1620, height: 1620, defaultText: "شركة كلود الصينة تقضي على مستعملين ذكاء اصطناعي بتحديث جديد" },
  { id: "auk-facebook-5", component: AukFacebook5Template, width: 1620, height: 2025, defaultText: "شركة كلود الصينة تقضي على مستعملين ذكاء اصطناعي بتحديث جديد" },
  { id: "auk-facebook-6", component: AukFacebook6Template, width: 1620, height: 2025, defaultText: "شركة كلود الصينة تقضي مستعملين ذكاء اصطناعي " },
  { id: "auk-facebook-7", component: AukFacebook7Template, width: 1620, height: 2025, defaultText: "شركة كلود الصينة تقضي مستعملين ذكاء اصطناعي " },
  { id: "auk-instagram-1", component: AukInstagram1Template, width: 1080, height: 1920, defaultText: "شركة كلود الصينة تقضي مستعملين ذكاء اصطناعي " },
  { id: "auk-instagram-2", component: AukInstagram2Template, width: 1080, height: 1920, defaultText: "شركة كلود الصينة تقضي مستعملين ذكاء اصطناعي " },
  { id: "auk-youtube-1", component: AukYoutube1Template, width: 1920, height: 1080, defaultText: "شركة كلود الصينة تقضي مستعملين ذكاء اصطناعي " },
  { id: "auk-youtube-2", component: AukYoutube2Template, width: 1920, height: 1080, defaultText: "شركة كلود الصينة تقضي مستعملين ذكاء اصطناعي " },


];
