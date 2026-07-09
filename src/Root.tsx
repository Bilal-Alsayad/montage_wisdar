import { CoverCompositions } from "./CoverCompositions";
import "./index.css";
import { VideoCompositions } from "./VideoCompositions";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <VideoCompositions />
      <CoverCompositions />
    </>
  );
};
