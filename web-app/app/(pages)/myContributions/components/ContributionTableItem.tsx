"use client";
import { Td, Tr } from "@chakra-ui/react";
import { formatUnits } from "ethers";
import { convertTimestampToDate } from "@/app/config/utils";
import { Contribution } from "@/app/models/contribution";

interface Props {
  contribution: Contribution;
}

export default function ContributionTableItem({ contribution }: Props) {
  const { contributor, value, claimed, createdAt } = contribution;

  return (
    <Tr>
      <Td>{contributor}</Td>
      <Td isNumeric>{formatUnits(value, "ether")} ETH</Td>
      <Td>{convertTimestampToDate(createdAt).toLocaleDateString()}</Td>
    </Tr>
  );
}
