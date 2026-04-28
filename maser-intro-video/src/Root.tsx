import "./index.css";
import { Composition } from "remotion";
import { MaserIntro } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MaserIntro"
        component={MaserIntro}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
