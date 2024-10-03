"use client";
import { Td, Tr } from "@chakra-ui/react";
import { formatUnits } from "ethers";
import { convertTimestampToDate } from "@/app/config/utils";
import { Contribution } from "@/app/models/contribution";
import Link from "next/link";

interface Props {
  contribution: Contribution;
}

export default function ContributionTableItem({ contribution }: Props) {
  const { projectId, projectTitle, value, claimed, createdAt } = contribution;

  return (
    <Tr>
      <Td>
        <Link href={`/projects/${projectId}`}>{projectTitle}</Link>
      </Td>
      <Td isNumeric>{formatUnits(value, "ether")} ETH</Td>
      <Td>{convertTimestampToDate(createdAt).toLocaleDateString()}</Td>
    </Tr>
  );
}
