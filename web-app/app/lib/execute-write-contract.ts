import { waitForTransactionReceipt, writeContract } from "wagmi/actions";
import { config } from "../config/wagmi";
import { contractAbi } from "../config/contract-abi";
import { constants } from "./constants";
import { position } from "@chakra-ui/react";

interface Props {
  functionName: string;
  value?: bigint;
  args: Array<any>;
  toast: any;
  onCloseComplete?: () => void;
}

export const executeWriteContract = async ({
  functionName,
  value,
  args,
  toast,
  onCloseComplete,
}: Props) => {
  const transactionId = await writeContract(config, {
    abi: contractAbi,
    address: constants.contractAddress,
    functionName,
    value,
    args,
  });

  const transactionPromise = waitForTransactionReceipt(config, {
    hash: transactionId,
  });

  toast.promise(transactionPromise, {
    success: {
      title: "Transaction completed",
      description: "It's on chain already",
      position: "top-right",
      onCloseComplete,
    },
    error: {
      title: "Transaction failed",
      description: "Transaction could not be completed",
      position: "top-right",
    },
    loading: {
      title: "Transaction pending",
      description: "Please wait for the chain validation",
      position: "top-right",
    },
  });
};
