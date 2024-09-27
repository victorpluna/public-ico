import {
  Badge,
  Button,
  Heading,
  HStack,
  Progress,
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
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { BiPlus } from "react-icons/bi";
import { readContract } from "wagmi/actions";
import { formatUnits } from "ethers";
import { Project } from "@/app/models/project";
import { constants } from "@/app/lib/constants";
import { contractAbi } from "@/app/config/contract-abi";
import { config } from "@/app/config/wagmi";
import {
  calculateFundingProgress,
  convertTimestampToDate,
} from "@/app/config/utils";
import ProjectActionButtons from "./components/ProjectActionButtons";

interface Props {
  params: { id: number };
}

export default async function ProjectDetail({ params: { id } }: Props) {
  const project = (await readContract(config, {
    abi: contractAbi,
    address: constants.contractAddress,
    functionName: "retrieveProject",
    args: [id],
  })) as Project;
  const address = "0x35BE4f1Aa18AD52D606E9B2eA257A3416e8030fF";

  return (
    <Stack spacing="6">
      <Heading size="lg">{project?.title}</Heading>
      <HStack justifyContent="space-between">
        <Badge variant="outline" colorScheme="teal">
          Expiration Date:{" "}
          {convertTimestampToDate(project?.deadline).toLocaleDateString()}
        </Badge>
        <Button leftIcon={<BiPlus />} colorScheme="teal" variant="outline">
          Contribute
        </Button>
      </HStack>
      <HStack alignItems="flex-start" spacing="10">
        <Stack flex="2" spacing="10">
          <StatGroup>
            <Stat>
              <StatLabel>Locked Funding</StatLabel>
              <StatNumber>
                {formatUnits(project?.totalFunding, "ether")} ETH
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Creator Funding</StatLabel>
              <StatNumber>
                {formatUnits(project?.ownFunding, "ether")} ETH
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Target Funding</StatLabel>
              <StatNumber>
                {formatUnits(project?.targetFunding, "ether")} ETH
              </StatNumber>
            </Stat>
          </StatGroup>
          <Progress
            value={calculateFundingProgress(
              project?.targetFunding,
              project?.totalFunding
            )}
            size="lg"
            colorScheme="teal"
            hasStripe
          />
          <ProjectActionButtons project={project} />
        </Stack>
        <Stack flex="1">
          <Heading fontWeight="500" size="xs">
            Contributions
          </Heading>
          <TableContainer>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Wallet Address</Th>
                  <Th isNumeric>Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    <Tooltip label={address}>{`${address.slice(
                      0,
                      5
                    )}...${address.slice(-5)}`}</Tooltip>
                  </Td>
                  <Td isNumeric>0.11 ETH</Td>
                </Tr>
                <Tr>
                  <Td>
                    <Tooltip label={address}>{`${address.slice(
                      0,
                      5
                    )}...${address.slice(-5)}`}</Tooltip>
                  </Td>
                  <Td isNumeric>0.15 ETH</Td>
                </Tr>
                <Tr>
                  <Td>
                    <Tooltip label={address}>{`${address.slice(
                      0,
                      5
                    )}...${address.slice(-5)}`}</Tooltip>
                  </Td>
                  <Td isNumeric>1.04 ETH</Td>
                </Tr>
                <Tr>
                  <Td>
                    <Tooltip label={address}>{`${address.slice(
                      0,
                      5
                    )}...${address.slice(-5)}`}</Tooltip>
                  </Td>
                  <Td isNumeric>1.04 ETH</Td>
                </Tr>
                <Tr>
                  <Td>
                    <Tooltip label={address}>{`${address.slice(
                      0,
                      5
                    )}...${address.slice(-5)}`}</Tooltip>
                  </Td>
                  <Td isNumeric>1.04 ETH</Td>
                </Tr>
                <Tr>
                  <Td>
                    <Tooltip label={address}>{`${address.slice(
                      0,
                      5
                    )}...${address.slice(-5)}`}</Tooltip>
                  </Td>
                  <Td isNumeric>1.04 ETH</Td>
                </Tr>
                <Tr>
                  <Td>
                    <Tooltip label={address}>{`${address.slice(
                      0,
                      5
                    )}...${address.slice(-5)}`}</Tooltip>
                  </Td>
                  <Td isNumeric>1.04 ETH</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Stack>
      </HStack>
    </Stack>
  );
}
