import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { holesky } from "wagmi/chains";
import { useEnv } from "./hooks/useEnv";

const { RAINBOWKIT_PROJECT_ID } = useEnv();

export const config = getDefaultConfig({
  appName: "RainbowKit App",
  projectId: RAINBOWKIT_PROJECT_ID,
  chains: [holesky],
  ssr: true,
});
