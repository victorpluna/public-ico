import { http, createConfig } from "wagmi";
import { metaMask } from "wagmi/connectors";
import { sepolia } from "viem/chains";

export const config = createConfig({
  chains: [sepolia],
  connectors: [metaMask()],
  ssr: true,
  transports: {
    [sepolia.id]: http(),
  },
});
