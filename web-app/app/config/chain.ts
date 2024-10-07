import { defineChain } from "viem";
import { constants } from "../lib/constants";

export const customChain = defineChain({
  id: constants.chainId,
  name: constants.chainName,
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: [constants.rpcUrl] },
  },
  blockExplorers: {
    default: { name: "Etherscan", url: "https://etherscan.io" },
  },
});
