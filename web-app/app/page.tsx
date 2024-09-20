"use client";
import {
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { useReadContract } from "wagmi";
import { contractAbi } from "./config/contract-abi";
import { Project } from "./models/project";
import { TableSkeleton } from "./components/TableSkeleton";
import { formatUnits } from "ethers";
import { BigNumberish } from "ethers";
import { contractAddress } from "./config/wagmi";

interface ListProjectsResponse {
  data: Project[] | undefined;
}

export default function Home() {
  const { data: projects }: ListProjectsResponse = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: "listActiveProjects",
  });

  return (
    <div>
      <StatGroup mb="50px">
        <Stat>
          <StatLabel>Total Value Locked (30d)</StatLabel>
          <StatNumber>31.54 ETH</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            23.36%
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Total Value Dealt</StatLabel>
          <StatNumber>412.33 ETH</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            12.31%
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Dealt Projects</StatLabel>
          <StatNumber>42</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            22.05%
          </StatHelpText>
        </Stat>
      </StatGroup>
      {projects === undefined ? (
        <TableSkeleton />
      ) : (
        <TableContainer>
          <Table variant="striped">
            <TableCaption>
              Projects that have not yet completed the target funding amount
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Project Name</Th>
                <Th isNumeric>Target Funding</Th>
                <Th isNumeric>Locked Funding</Th>
                <Th isNumeric>Creator Funding</Th>
                <Th>Expiry Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {projects?.map(
                (
                  { targetFunding, totalFunding, ownFunding, deadline },
                  index
                ) => (
                  <Tr key={index}>
                    <Td>Initial Coin Offering 1</Td>
                    <Td isNumeric>{formatUnits(targetFunding, "ether")} ETH</Td>
                    <Td isNumeric>
                      {formatUnits(totalFunding, "ether")} ETH (83,4%)
                    </Td>
                    <Td isNumeric>{formatUnits(ownFunding, "ether")} ETH</Td>
                    <Td>
                      {convertTimestampToDate(deadline).toLocaleDateString()}
                    </Td>
                  </Tr>
                )
              )}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

const convertTimestampToDate = (timestamp: BigNumberish) =>
  new Date(Number(timestamp) * 1000);
