import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        obs: {
          ink: "#121416",
          surface: "#1a1f22",
          fog: "#f4f1eb",
          sand: "#d6c7b2",
          copper: "#b8622f",
          muted: "#7e7a74",
          line: "rgba(244, 241, 235, 0.12)"
        }
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
        sans: ["system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 20px 70px rgba(0,0,0,0.18)"
      },
      maxWidth: {
        "content": "76rem"
      }
    }
  },
  plugins: []
};

export default config;
