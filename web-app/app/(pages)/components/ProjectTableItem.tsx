"use client";
import { Progress, Td, Tr, Text, Tooltip } from "@chakra-ui/react";
import { formatUnits } from "ethers";
import { useRouter } from "next/navigation";
import { Project } from "@/app/models/project";
import {
  calculateFundingProgress,
  convertTimestampToDate,
} from "@/app/config/utils";

interface Props {
  project: Project;
}

export default function ProjectTableItem({ project }: Props) {
  const {
    id,
    title,
    fundingDetails: { ownFunding, targetFunding, totalFunding },
    deadline,
  } = project;
  const router = useRouter();

  return (
    <Tr
      onClick={() => router.push(`/projects/${id}`)}
      style={{ cursor: "pointer" }}
    >
      <Td>{title}</Td>
      <Td isNumeric>
        <Tooltip
          label={`${formatUnits(ownFunding, "ether")} ETH`}
          placement="top"
          hasArrow
        >
          <Text>{Number(formatUnits(ownFunding, "ether")).toFixed(2)} ETH</Text>
        </Tooltip>
      </Td>
      <Td isNumeric>
        <Tooltip
          label={`${formatUnits(targetFunding, "ether")} ETH`}
          placement="top"
          hasArrow
        >
          <Text>
            {Number(formatUnits(targetFunding, "ether")).toFixed(2)} ETH
          </Text>
        </Tooltip>
      </Td>
      <Td isNumeric>
        <Tooltip
          label={`${formatUnits(totalFunding, "ether")} ETH`}
          placement="top"
          hasArrow
        >
          <Text>
            {Number(formatUnits(totalFunding, "ether")).toFixed(2)} ETH
          </Text>
        </Tooltip>
      </Td>
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
      <Td suppressHydrationWarning>
        {convertTimestampToDate(deadline).toLocaleDateString()}
      </Td>
    </Tr>
  );
}
