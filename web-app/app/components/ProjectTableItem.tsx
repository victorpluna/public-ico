"use client";
import { Progress, Td, Tr, Text } from "@chakra-ui/react";
import { BigNumberish, formatUnits } from "ethers";
import { useRouter } from "next/navigation";
import { Project } from "../models/project";

interface Props {
  project: Project;
}

export default function ProjectTableItem({ project }: Props) {
  const { id, title, ownFunding, targetFunding, totalFunding, deadline } =
    project;
  const router = useRouter();

  return (
    <Tr
      onClick={() => router.push(`/projects/${id}`)}
      style={{ cursor: "pointer" }}
    >
      <Td>{title}</Td>
      <Td isNumeric>{formatUnits(ownFunding, "ether")} ETH</Td>
      <Td isNumeric>{formatUnits(targetFunding, "ether")} ETH</Td>
      <Td isNumeric>{formatUnits(totalFunding, "ether")} ETH</Td>
      <Td>
        <Progress
          value={calculateFundingProgress(targetFunding, totalFunding)}
          size="xs"
          colorScheme="teal"
        />
        <Text fontSize="xs">
          {Math.min(calculateFundingProgress(targetFunding, totalFunding), 100)}
          %
        </Text>
      </Td>
      <Td>{convertTimestampToDate(deadline).toLocaleDateString()}</Td>
    </Tr>
  );
}

const convertTimestampToDate = (timestamp: BigNumberish) =>
  new Date(Number(timestamp) * 1000);

const calculateFundingProgress = (
  targetFunding: BigNumberish,
  totalFunding: BigNumberish
) =>
  Number(
    (
      (Number(formatUnits(totalFunding, "ether")) /
        Number(formatUnits(targetFunding, "ether"))) *
      100
    ).toFixed(2)
  );
