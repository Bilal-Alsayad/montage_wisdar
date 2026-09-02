import { CoverTemplateProps } from "./types";
import MeeYoutubeTemplate from "./Mee/youtube";
import MeeInstagramTemplate from "./Mee/instagram";
import MeeFacebookTemplate from "./Mee/facebook";
import HarmonyInstagram1Template from "./Harmony/cover_reel1";
import HarmonyInstagram2Template from "./Harmony/cover_reel2";
import IrsalInstagramTemplate from "./irsal/instagram";
import TventInstagramTemplate from "./tvnet/instagram";
import ThetimesofpalestineInstagramTemplate from "./thetimesofpalestine/instagram";
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
import SudanFacebook1Template from "./sudan/facebook_1";
import SudanFacebook2Template from "./sudan/facebook_2";
import SudanFacebook3Template from "./sudan/facebook_3";
import SudanFacebook4Template from "./sudan/facebook_4";
import SudanFacebook5Template from "./sudan/facebook_5";
import SudanYoutube1Template from "./sudan/youtube_1";
import SudanYoutube2Template from "./sudan/youtube_2";
import SudanInstagram1Template from "./sudan/instagram_1";
import SudanInstagram2Template from "./sudan/instagram_2";
import TurkpressInstagramTemplate from "./turkpress/instagram";
import TurkpressFacebookTemplate from "./turkpress/facebook";
import TurkpressYoutubeTemplate from "./turkpress/youtube";
import News247InstagramTemplate from "./247news/instagram";
import ArabFactInstagramTemplate from "./arabfact/instagram";
import Arabi21SportIbrahimInstagramTemplate from "./arabi21sportibrahim/instagram";
import BreakingArInstagramTemplate from "./breakingar/instagram";
import DailyNews247InstagramTemplate from "./dailynews247/instagram";
import HeadlineGlobalInstagramTemplate from "./headlineglobal/instagram";
import HeadlineArInstagramTemplate from "./headlinear/instagram";
import NewsArInstagramTemplate from "./newsar/instagram";
import ProWrestleHubInstagramTemplate from "./prowrestlehub/instagram";
import TrendNewsInstagramTemplate from "./trendnews/instagram";
import TurkHaber247InstagramTemplate from "./turkhaber247/instagram";
import TurkHaber247TikbumInstagramTemplate from "./turkhaber247tikbum/instagram";
import FlashInstagramTemplate from "./flash/instagram";
import SharqInstagramTemplate from "./sharq/instagram";
import TrendsFactsInstagramTemplate from "./trendsfacts/instagram";
import NowVoiceInstagramTemplate from "./nowvoice/instagram";
import Breaking24InstagramTemplate from "./breaking24/instagram";
import MdarNewsInstagramTemplate from "./mdarnews/instagram";
import MasrFiveInstagramTemplate from "./masrfive/instagram";
import FactsInSecondsInstagramTemplate from "./factsinseconds/instagram";
import FromMeccaToJerusalemInstagramTemplate from "./frommeccatojerusalem/instagram";
import ArabVarietyInstagramTemplate from "./arabvariety/instagram";
import LivePulseInstagramTemplate from "./livepulse/instagram";
import TurkeyPulseInstagramTemplate from "./turkeypulse/instagram";
import InfoplusInstagramTemplate from "./infoplus/instagram";
import Awlad9InstagramTemplate from "./awlad9/instagram";
import AlmaredaltounsiInstagramTemplate from "./almaredaltounsi/instagram";
import Intikhabat2019InstagramTemplate from "./intikhabat2019/instagram";
import Tounes2020InstagramTemplate from "./tounes2020/instagram";
import CampPostInstagramTemplate from "./camppost/instagram";

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
    id: "camppost-instagram",
    component: CampPostInstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: `رف التجارية تعمل مدار الـ(24) ساعة خلال العد`,
  },
  {
    id: "turkppress-youtube",
    component: TurkpressYoutubeTemplate,
    width: 1920,
    height: 1080,
    defaultText: `رف التجارية تعمل مدار الـ(24) ساعة خلال العد`,
  },
  {
    id: "turkpress-facebook",
    component: TurkpressFacebookTemplate,
    width: 1080,
    height: 1080,
    defaultText: `رف التجارية تعمل مدار الـ(24) ساعة خلال العد`,
  },
  {
    id: "turkpress-instagram",
    component: TurkpressInstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: `رف التجارية تعمل مدار الـ(24) ساعة خلال العد`,
  },
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
    id: "sunda-instagram-2",
    component: SudanInstagram2Template,
    width: 1080,
    height: 1920,
    defaultText: `رف التجارية تعمل مدار الـ(24) ساعة خلال العد`,
    defaultLocation: "غزة",
  },
  {
    id: "sudan-youtube-1",
    component: SudanYoutube1Template,
    width: 1080,
    height: 720,
    defaultText: `رف التجارية تعمل مدار الـ(24) ساعة خلال العد`,
  },
  {
    id: "sudan-youtube-2",
    component: SudanYoutube2Template,
    width: 1080,
    height: 720,
    defaultLocation: ` التجارد`,
    defaultSource: "الذكاء الاصطناعي",
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
  {
    id: "247news-instagram",
    component: News247InstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "arabfact-instagram",
    component: ArabFactInstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "arabi21sportibrahim-instagram",
    component: Arabi21SportIbrahimInstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "breakingar-instagram",
    component: BreakingArInstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "dailynews247-instagram",
    component: DailyNews247InstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "headlineglobal-instagram",
    component: HeadlineGlobalInstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "headlinear-instagram",
    component: HeadlineArInstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "newsar-instagram",
    component: NewsArInstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "prowrestlehub-instagram",
    component: ProWrestleHubInstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "trendnews-instagram",
    component: TrendNewsInstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "turkhaber247-instagram",
    component: TurkHaber247InstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "turkhaber247tikbum-instagram",
    component: TurkHaber247TikbumInstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "flash-instagram",
    component: FlashInstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "sharq-instagram",
    component: SharqInstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "trendsfacts-instagram",
    component: TrendsFactsInstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "nowvoice-instagram",
    component: NowVoiceInstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "breaking24-instagram",
    component: Breaking24InstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "mdarnews-instagram",
    component: MdarNewsInstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "masrfive-instagram",
    component: MasrFiveInstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "factsinseconds-instagram",
    component: FactsInSecondsInstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "frommeccatojerusalem-instagram",
    component: FromMeccaToJerusalemInstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "arabvariety-instagram",
    component: ArabVarietyInstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "livepulse-instagram",
    component: LivePulseInstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "turkeypulse-instagram",
    component: TurkeyPulseInstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "infoplus-instagram",
    component: InfoplusInstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "awlad9-instagram",
    component: Awlad9InstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "almaredaltounsi-instagram",
    component: AlmaredaltounsiInstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "intikhabat2019-instagram",
    component: Intikhabat2019InstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
  {
    id: "tounes2020-instagram",
    component: Tounes2020InstagramTemplate,
    width: 1080,
    height: 1920,
    defaultText: "شركة كلود الصينية تقضي على مستخدمي الذكاء الاصطناعي",
  },
];
