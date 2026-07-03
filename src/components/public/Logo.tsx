import React from "react";

interface LogoProps {
  light?: boolean;
  fontSize?: string;
  subtitleSize?: string; // Kept for backwards compatibility
  style?: React.CSSProperties;
  layout?: "horizontal" | "vertical";
}

export default function Logo({
  light = false,
  fontSize = "26px",
  style,
  layout = "horizontal",
}: LogoProps) {
  const height = layout === "horizontal" ? `calc(1.35 * ${fontSize})` : `calc(2.0 * ${fontSize})`;

  return (
    <div style={{ display: "inline-flex", alignItems: "center", ...style }}>
      <img
        src="/logo.png"
        alt="MIEUX Interior & Architecture"
        style={{
          height: height,
          width: "auto",
          maxWidth: "100%",
          display: "block",
          objectFit: "contain",
        }}
      />
    </div>
  );
}



