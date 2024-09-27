import { http, createConfig } from "wagmi";
import { metaMask } from "wagmi/connectors";
import { hardhatChain } from "./hardhat-chain";

export const config = createConfig({
  chains: [hardhatChain],
  connectors: [metaMask()],
  ssr: true,
  transports: {
    [hardhatChain.id]: http(),
  },
});
