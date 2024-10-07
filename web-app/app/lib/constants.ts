import { Address } from "viem";

export interface Constants {
  chainId: number;
  chainName: string;
  rpcUrl: string;
  contractAddress: Address;
}

export const constants: Constants = {
  chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
  chainName: process.env.NEXT_PUBLIC_CHAIN_NAME || "",
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || "",
  contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
};
