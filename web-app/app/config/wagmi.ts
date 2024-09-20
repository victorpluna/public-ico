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

export const contractAddress = "0xE5392cB0c1e8dBBFAB78A5cF29e1B75c3a231744";
