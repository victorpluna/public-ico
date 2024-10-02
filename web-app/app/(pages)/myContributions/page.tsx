import {
  Center,
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
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";
import { readContract } from "wagmi/actions";
import { contractAbi } from "../../config/contract-abi";
import { constants } from "../../lib/constants";
import { config } from "../../config/wagmi";
import { Contribution } from "@/app/models/contribution";
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
  const contributions = await getOnChainContributions();

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
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Contributor</Th>
              <Th isNumeric>Amount</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {contributions.length ? (
              contributions.map((contribution, index) => (
                <ContributionTableItem
                  key={index}
                  contribution={contribution}
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
