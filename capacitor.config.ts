import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.wilsonsamiano.armywhtr",
  appName: "Army WHtR Calculator",
  webDir: "dist/native-www",
  android: {
    allowMixedContent: false,
  },
  ios: {
    contentInset: "automatic",
  },
};

export default config;
