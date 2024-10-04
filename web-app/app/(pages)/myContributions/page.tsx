import {
  Center,
  Stack,
  Stat,
  StatGroup,
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
import { formatUnits } from "ethers";
import { contractAbi } from "../../config/contract-abi";
import { constants } from "../../lib/constants";
import { config } from "../../config/wagmi";
import { Contribution, ProjectContributions } from "@/app/models/contribution";
import ContributionTableItem from "./components/ContributionTableItem";

const getOnChainContributions = async (): Promise<Contribution[]> => {
  try {
    return (await readContract(config, {
      abi: contractAbi,
      address: constants.contractAddress,
      functionName: "getMyContributions",
    })) as Contribution[];
  } catch {
    return [];
  }
};

export default async function MyContributions() {
  const contributions = groupContributionsByProject(
    await getOnChainContributions()
  );

  return (
    <Stack spacing={3}>
      <StatGroup>
        <Stat>
          <StatLabel>Total Value Locked</StatLabel>
          <StatNumber>
            {calculateTotalValue(contributions).toFixed(2)} ETH
          </StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Refunded Value Locked</StatLabel>
          <StatNumber>
            {calculateTotalValue(contributions, true)} ETH
          </StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Invested Projects</StatLabel>
          <StatNumber>{contributions.length}</StatNumber>
        </Stat>
      </StatGroup>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Project</Th>
              <Th isNumeric>Amount</Th>
              <Th isNumeric>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {contributions.length ? (
              contributions.map((contribution, index) => (
                <ContributionTableItem
                  key={index}
                  projectContributions={contribution}
                />
              ))
            ) : (
              <Tr>
                <Td colSpan={3}>
                  <Center>
                    <Text fontSize={12}>You have no contributions so far</Text>
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

function groupContributionsByProject(
  contributions: Contribution[]
): ProjectContributions[] {
  const projectMap: Map<number, ProjectContributions> = new Map();

  contributions.forEach((contribution) => {
    const { projectId, projectTitle, value, claimed } = contribution;

    if (projectMap.has(projectId)) {
      const existingProject = projectMap.get(projectId);

      if (existingProject) {
        existingProject.contributions.push(contribution);
        existingProject.total += value;
      }
    } else {
      projectMap.set(projectId, {
        projectId,
        projectTitle,
        total: value,
        claimed,
        contributions: [contribution],
      });
    }
  });

  return Array.from(projectMap.values());
}

const calculateTotalValue = (
  contributions: ProjectContributions[],
  claimed: boolean = false
) =>
  contributions
    .filter(
      ({ claimed: projectClaimed }) =>
        (claimed && projectClaimed) || (!claimed && !projectClaimed)
    )
    .reduce(
      (aggregated, { total }) => aggregated + +formatUnits(total, "ether"),
      0
    );
