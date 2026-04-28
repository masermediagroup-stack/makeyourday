import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const serviceLine = "One Crew. Brand, Product, and Web.";

export const MaserIntro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ease = Easing.bezier(0.16, 1, 0.3, 1);

  const headlineOpacity = interpolate(frame, [0.15 * fps, 1 * fps], [0, 1], {
    easing: ease,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headlineY = interpolate(frame, [0.15 * fps, 1 * fps], [42, 0], {
    easing: ease,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoProgress = spring({
    frame: frame - 1.2 * fps,
    fps,
    config: {
      damping: 17,
      mass: 0.75,
      stiffness: 120,
    },
  });

  const logoOpacity = interpolate(frame, [1.15 * fps, 1.75 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const serviceStart = 2.55 * fps;
  const typedCharacters = Math.floor(
    interpolate(
      frame,
      [serviceStart, serviceStart + 1.55 * fps],
      [0, serviceLine.length],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    ),
  );

  const serviceOpacity = interpolate(
    frame,
    [2.35 * fps, 2.9 * fps],
    [0, 1],
    {
      easing: ease,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const accentSweep = interpolate(frame, [1.5 * fps, 4.7 * fps], [-38, 138], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const closingLift = interpolate(frame, [4.55 * fps, 5.6 * fps], [0, -18], {
    easing: ease,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 50% 18%, #102432 0%, #081017 42%, #05080c 100%)",
        color: "#f6fbff",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(115deg, transparent 0%, transparent 43%, rgba(44, 175, 255, 0.16) 50%, transparent 57%, transparent 100%)",
          transform: `translateX(${accentSweep}%)`,
          mixBlendMode: "screen",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 96,
          right: 96,
          top: 82,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(44, 175, 255, 0.5), transparent)",
          opacity: 0.7,
        }}
      />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          transform: `translateY(${closingLift}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            padding: "0 120px",
          }}
        >
          <div
            style={{
              opacity: headlineOpacity,
              transform: `translateY(${headlineY}px)`,
              fontSize: 86,
              fontWeight: 760,
              letterSpacing: 0,
              lineHeight: 1,
              textAlign: "center",
              textTransform: "none",
              textWrap: "balance",
            }}
          >
            need one Creative team
          </div>

          <div
            style={{
              marginTop: 58,
              opacity: logoOpacity,
              transform: `scale(${0.9 + logoProgress * 0.1})`,
              filter: "drop-shadow(0 28px 46px rgba(44, 175, 255, 0.2))",
            }}
          >
            <Img
              src={staticFile("maser-logo.svg")}
              style={{
                display: "block",
                width: 760,
                maxWidth: "72vw",
                height: "auto",
              }}
            />
          </div>

          <div
            style={{
              marginTop: 52,
              minHeight: 58,
              opacity: serviceOpacity,
              color: "#d8f1ff",
              fontSize: 42,
              fontWeight: 560,
              letterSpacing: 0,
              lineHeight: 1.25,
              textAlign: "center",
              textWrap: "balance",
            }}
          >
            {serviceLine.slice(0, typedCharacters)}
            <span
              style={{
                display: "inline-block",
                width: 3,
                height: 43,
                marginLeft: 8,
                transform: "translateY(7px)",
                backgroundColor:
                  frame % 20 < 11 && typedCharacters < serviceLine.length
                    ? "#2cafff"
                    : "transparent",
              }}
            />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
