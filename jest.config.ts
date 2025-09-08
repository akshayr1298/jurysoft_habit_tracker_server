import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",          // use ts-jest to transpile TS
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": ["ts-jest", { useESM: true }],
  },
  moduleFileExtensions: ["ts", "js"],
  extensionsToTreatAsEsm: [".ts"], // treat TS as ESM
};

export default config;
