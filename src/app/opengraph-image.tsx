import { ImageResponse } from "next/og";

export const alt = "Javier Chiang | Game Math Model Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#070A12",
          color: "#F7FBFF"
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, color: "#4DE3FF" }}>
          GAME MATH MODEL DESIGNER
        </div>
        <div style={{ marginTop: 28, fontSize: 84, fontWeight: 800 }}>
          Javier Chiang
        </div>
        <div style={{ marginTop: 24, fontSize: 38, color: "#CBD5E1" }}>
          Slot &amp; game math model design
        </div>
        <div style={{ marginTop: 48, fontSize: 28, color: "#94A3B8" }}>
          RTP · Volatility · Simulation · GLI / BMM specifications
        </div>
      </div>
    ),
    size
  );
}
