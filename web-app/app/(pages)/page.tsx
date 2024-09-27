import {
  HStack,
  Stack,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { readContract } from "wagmi/actions";
import dynamic from "next/dynamic";
import { contractAbi } from "../config/contract-abi";
import { Project } from "../models/project";
import { constants } from "../lib/constants";
import { config } from "../config/wagmi";
import ProjectTableItem from "./components/ProjectTableItem";
const CreateProject = dynamic(() => import("./components/CreateProject"), {
  ssr: false,
});

export default async function Home() {
  const projects = (await readContract(config, {
    abi: contractAbi,
    address: constants.contractAddress,
    functionName: "listActiveProjects",
  })) as Project[];

  return (
    <Stack spacing={3}>
      <StatGroup>
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
      <HStack justifyContent="flex-end" h="40px">
        <CreateProject />
      </HStack>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Project Name</Th>
              <Th isNumeric>Creator Funding</Th>
              <Th isNumeric>Target Funding</Th>
              <Th isNumeric>Locked Funding</Th>
              <Th>Progress</Th>
              <Th>Expiry Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {projects?.map((project) => (
              <ProjectTableItem key={project.id} project={project} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
