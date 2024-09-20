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

export const contractAddress = "0x9AdFcA25539A8F4Ba1276A23E59c00A868FC3E82";
