import {
  Center,
  HStack,
  Stack,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";
import { readContract } from "wagmi/actions";
import dynamic from "next/dynamic";
import { formatUnits } from "ethers";
import { contractAbi } from "../config/contract-abi";
import { Project } from "../models/project";
import { constants } from "../lib/constants";
import { config } from "../config/wagmi";
import ProjectTableItem from "./components/ProjectTableItem";
const CreateProject = dynamic(() => import("./components/CreateProject"), {
  ssr: false,
});

const getOnChainProjects = async (): Promise<Project[]> => {
  try {
    return (await readContract(config, {
      abi: contractAbi,
      address: constants.contractAddress,
      functionName: "listActiveProjects",
    })) as Project[];
  } catch {
    return [];
  }
};

export default async function Home() {
  const projects = await getOnChainProjects();

  return (
    <Stack spacing={3}>
      <StatGroup>
        <Stat>
          <StatLabel>Total Value Locked</StatLabel>
          <StatNumber>
            {calculateTotalValue(projects).toFixed(2)} ETH
          </StatNumber>
          <StatHelpText>
            {(
              (calculateTotalValue(projects) /
                calculateTotalTargetValue(projects)) *
              100
            ).toFixed(2)}
            %
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Total Value Left</StatLabel>
          <StatNumber>
            {(
              calculateTotalTargetValue(projects) -
              calculateTotalValue(projects)
            ).toFixed(2)}{" "}
            ETH
          </StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Open Projects</StatLabel>
          <StatNumber>{projects.length}</StatNumber>
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
            {projects.length ? (
              projects.map((project) => (
                <ProjectTableItem key={project.id} project={project} />
              ))
            ) : (
              <Tr>
                <Td colSpan={6}>
                  <Center>
                    <Text fontSize={12}>No projects created yet</Text>
                  </Center>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

const calculateTotalValue = (projects: Project[]) =>
  projects.reduce(
    (aggregated, { totalFunding }) =>
      aggregated + +formatUnits(totalFunding, "ether"),
    0
  );

const calculateTotalTargetValue = (projects: Project[]) =>
  projects.reduce(
    (aggregated, { targetFunding }) =>
      aggregated + +formatUnits(targetFunding, "ether"),
    0
  );
