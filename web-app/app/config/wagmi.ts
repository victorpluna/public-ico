import { http, createConfig } from "wagmi";
import { metaMask } from "wagmi/connectors";
import { ganacheChain } from "./ganache-chain";

export const config = createConfig({
  chains: [ganacheChain],
  connectors: [metaMask()],
  transports: {
    [ganacheChain.id]: http(),
  },
});
