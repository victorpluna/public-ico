import { http, createConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet],
  connectors: [metaMask()],
  transports: {
    [mainnet.id]: http(),
  },
});
