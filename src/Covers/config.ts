import { CoverTemplateProps } from "./types";
import MeeYoutubeTemplate from "./Mee/youtube";
import MeeInstagramTemplate from "./Mee/instagram";
import MeeFacebookTemplate from "./Mee/facebook"; 
import HarmonyInstagram1Template from "./Harmony/cover_reel1";
import HarmonyInstagram2Template from "./Harmony/cover_reel2";
import IrsalInstagramTemplate from "./irsal/instagram";
import TventInstagramTemplate from "./tvnet/instagram"
import ThetimesofpalestineInstagramTemplate from "./thetimesofpalestine/instagram"
import MainAukYoutubeTemplate from "./auk/main/youtube";
import MainAukFacebook1Template from "./auk/main/facebook_1";
import MainAukFacebook2Template from "./auk/main/facebook_2";
import MainAukInstagramTemplate from "./auk/main/instagram";
import SocialAukFacebook1Template from "./auk/social/facebook_1";
import SocialLocationAukFacebook1Template from "./auk/social_location/facebook_1";
import SocialLocationAukFacebook2Template from "./auk/social_location/facebook_2";
import SubsBeigeAukYoutubeTemplate from "./auk/subs_beige/youtube";
import SubsBeigeAukFacebook1Template from "./auk/subs_beige/facebook_1";
import SubsBeigeAukFacebook2Template from "./auk/subs_beige/facebook_2";
import SubsBeigeAukInstagramTemplate from "./auk/subs_beige/instagram";
import SubsTurquoiseAukYoutubeTemplate from "./auk/subs_turquoise/youtube";
import SubsTurquoiseAukFacebook1Template from "./auk/subs_turquoise/facebook_1";
import SubsTurquoiseAukFacebook2Template from "./auk/subs_turquoise/facebook_2";
import SubsTurquoiseAukInstagramTemplate from "./auk/subs_turquoise/instagram";
import UrgentAukFacebook1Template from "./auk/urgent/facebook_1";
import UrgentAukFacebook2Template from "./auk/urgent/facebook_2";
import SudanFacebook1Template from "./sudan/facebook_1"
import SudanFacebook2Template from "./sudan/facebook_2"
import SudanFacebook3Template from "./sudan/facebook_3"
import SudanFacebook4Template from "./sudan/facebook_4"
import SudanFacebook5Template from "./sudan/facebook_5"
import SudanYoutube1Template from "./sudan/youtube_1"

import SudanInstagram1Template from "./sudan/instagram_1"




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
  {
    id: "sunda-facebook-1",
    component: SudanFacebook1Template,
    width: 1080,
    height: 1320,
    defaultText: "ISRAEL HAS BOOBY-TRAPPED EQUIPMENT ‘IN ALL COUNTRIES’",
  },
  {
    id: "sunda-facebook-2",
    component: SudanFacebook2Template,
    width: 1080,
    height: 1320,
    defaultText: `رف التجارية تعمل مدار الـ(24) ساعة خلال العد`,
    defaultLocation: "غزة",
  },
  {
    id: "sunda-facebook-3",
    component: SudanFacebook3Template,
    width: 1080,
    height: 1320,
    defaultText: `رف التجارية تعمل مدار الـ(24) ساعة خلال العد`,
  },
  {
    id: "sunda-facebook-4",
    component: SudanFacebook4Template,
    width: 1080,
    height: 1080,
    defaultText: `رف التجارية تعمل مدار الـ(24) ساعة خلال العد`,
  },
  {
    id: "sunda-facebook-5",
    component: SudanFacebook5Template,
    width: 1080,
    height: 1320,
    defaultText: `رف التجارية تعمل مدار الـ(24) ساعة خلال العد`,
    defaultSpeaker: "غزة",
  },
  {
    id: "sunda-instagram-1",
    component: SudanInstagram1Template,
    width: 1080,
    height: 1920,
    defaultText: `رف التجارية تعمل مدار الـ(24) ساعة خلال العد`,
  },
    {
    id: "sudan-youtube-1",
    component: SudanYoutube1Template,
    width: 1080,
    height: 720,
    defaultText: `رف التجارية تعمل مدار الـ(24) ساعة خلال العد`,
  },
  {
    id: "mee-youtube",
    component: MeeYoutubeTemplate,
    width: 1920,
    height: 1080,
    defaultText: "ISRAEL HAS BOOBY-TRAPPED EQUIPMENT ‘IN ALL COUNTRIES’",
  },
  {
    id: "mee-instagram",
    component: MeeInstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "ISRAEL HAS BOOBY-TRAPPED EQUIPMENT ‘IN ALL COUNTRIES’",
  },
  {
    id: "mee-facebook",
    component: MeeFacebookTemplate,
    width: 1440,
    height: 1440,
    defaultText: "ISRAEL HAS BOOBY-TRAPPED EQUIPMENT ‘IN ALL COUNTRIES’",
  },
  {
    id: "harmony-instagram1",
    component: HarmonyInstagram1Template,
    width: 1080,
    height: 1920,
    defaultText: "Haaland IDF askeriyle",
  },
  {
    id: "harmony-instagram2",
    component: HarmonyInstagram2Template,
    width: 1080,
    height: 1920,
    defaultText: "New York Senatosunda Bir Filistinli",
  },
  {
    id: "irsal-instagram",
    component: IrsalInstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText:
      "التي انطلقت لنصرة القدس والأقصى التي انطلقت لنصرة القدس والأقصى",
  },
  {
    id: "tvent-instagram",
    component: TventInstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "Daughter Blasts NM Daughter Blasts NM Daughter Blasts NM",
  },
  {
    id: "Thetimesofpalestine-instagram",
    component: ThetimesofpalestineInstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "Daughter Blasts Daughter Blast",
  },
  {
    id: "auk-main-youtube",
    component: MainAukYoutubeTemplate,
    width: 1920,
    height: 1080,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "auk-main-facebook-1",
    component: MainAukFacebook1Template,
    width: 1080,
    height: 1350,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "auk-main-facebook-2",
    component: MainAukFacebook2Template,
    width: 1080,
    height: 1080,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "auk-main-instagram",
    component: MainAukInstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "auk-social-facebook-1",
    component: SocialAukFacebook1Template,
    width: 1080,
    height: 1080,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "auk-social-location-facebook-1",
    component: SocialLocationAukFacebook1Template,
    width: 1080,
    height: 1350,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
    defaultLocation: "غزة",
  },
  {
    id: "auk-social-location-facebook-2",
    component: SocialLocationAukFacebook2Template,
    width: 1080,
    height: 1080,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
    defaultLocation: "غزة",
  },
  {
    id: "auk-subs-beige-youtube",
    component: SubsBeigeAukYoutubeTemplate,
    width: 1920,
    height: 1080,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "auk-subs-beige-facebook-1",
    component: SubsBeigeAukFacebook1Template,
    width: 1080,
    height: 1350,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "auk-subs-beige-facebook-2",
    component: SubsBeigeAukFacebook2Template,
    width: 1080,
    height: 1080,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "auk-subs-beige-instagram",
    component: SubsBeigeAukInstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "auk-subs-turquoise-youtube",
    component: SubsTurquoiseAukYoutubeTemplate,
    width: 1920,
    height: 1080,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "auk-subs-turquoise-facebook-1",
    component: SubsTurquoiseAukFacebook1Template,
    width: 1080,
    height: 1350,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "auk-subs-turquoise-facebook-2",
    component: SubsTurquoiseAukFacebook2Template,
    width: 1080,
    height: 1080,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "auk-subs-turquoise-instagram",
    component: SubsTurquoiseAukInstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "auk-urgent-facebook-1",
    component: UrgentAukFacebook1Template,
    width: 1080,
    height: 1350,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "auk-urgent-facebook-2",
    component: UrgentAukFacebook2Template,
    width: 1080,
    height: 1080,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
];
