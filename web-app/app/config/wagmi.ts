import { http, createConfig } from "wagmi";
import { metaMask } from "wagmi/connectors";
import { customChain } from "./chain";

export const config = createConfig({
  chains: [customChain],
  connectors: [metaMask()],
  ssr: true,
  transports: {
    [customChain.id]: http(),
  },
});
