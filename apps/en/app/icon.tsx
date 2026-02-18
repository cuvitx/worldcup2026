import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: "#1a1a2e",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#f5a623",
          fontWeight: "bold",
          borderRadius: "4px",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="1.5" />
          <path
            d="M12 1C12 1 8 5 8 12C8 19 12 23 12 23"
            stroke="white"
            strokeWidth="1"
          />
          <path
            d="M12 1C12 1 16 5 16 12C16 19 12 23 12 23"
            stroke="white"
            strokeWidth="1"
          />
          <line x1="1" y1="12" x2="23" y2="12" stroke="white" strokeWidth="1" />
          <line x1="3" y1="7" x2="21" y2="7" stroke="white" strokeWidth="0.75" />
          <line
            x1="3"
            y1="17"
            x2="21"
            y2="17"
            stroke="white"
            strokeWidth="0.75"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
