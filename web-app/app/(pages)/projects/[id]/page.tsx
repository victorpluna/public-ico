import {
  Badge,
  Center,
  Heading,
  HStack,
  Progress,
  Stack,
  StatGroup,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  Text,
} from "@chakra-ui/react";
import { readContract } from "wagmi/actions";
import { formatUnits } from "ethers";
import dynamic from "next/dynamic";
import { Project } from "@/app/models/project";
import { constants } from "@/app/lib/constants";
import { contractAbi } from "@/app/config/contract-abi";
import { config } from "@/app/config/wagmi";
import {
  calculateFundingProgress,
  convertTimestampToDate,
  shortAddress,
} from "@/app/config/utils";
import ProjectActionButtons from "./components/ProjectActionButtons";
import { Contribution } from "@/app/models/contribution";
import { BreadCrumb } from "../../components/Breadcrumb";
import { Totalizer } from "../../components/Totalizer";
const ContributeProject = dynamic(
  () => import("./components/ContributeProject"),
  {
    ssr: false,
  }
);

interface Props {
  params: { id: number };
}

const getOnChainContributions = async (
  projectId: number
): Promise<Contribution[]> => {
  try {
    return (await readContract(config, {
      abi: contractAbi,
      address: constants.contractAddress,
      functionName: "listProjectContributions",
      args: [projectId],
    })) as Contribution[];
  } catch {
    return [];
  }
};

const getOnChainProject = async (projectId: number): Promise<Project> => {
  return (await readContract(config, {
    abi: contractAbi,
    address: constants.contractAddress,
    functionName: "retrieveProject",
    args: [projectId],
  })) as Project;
};

export async function generateMetadata({ params: { id } }: Props) {
  const project = await getOnChainProject(id);

  return {
    title: project?.title,
  };
}

export default async function ProjectDetail({ params: { id } }: Props) {
  const project = await getOnChainProject(id);
  const contributions = (await getOnChainContributions(id)).filter(
    ({ claimed }) => !claimed
  );

  return (
    <Stack spacing="6">
      <BreadCrumb
        items={[{ label: "Open ICOs", href: "/" }, { label: project?.title }]}
      />
      <Heading size="lg">{project?.title}</Heading>
      <HStack justifyContent="space-between">
        <Badge variant="outline" colorScheme="teal">
          Expiration Date:{" "}
          {convertTimestampToDate(project?.deadline).toLocaleDateString()}
        </Badge>
        <ContributeProject projectId={id} />
      </HStack>
      <HStack alignItems="flex-start" spacing="10">
        <Stack flex="2" spacing="10">
          <StatGroup>
            <Totalizer
              label="Locked Funding"
              value={
                <Tooltip
                  label={`${formatUnits(project?.totalFunding, "ether")} ETH`}
                  placement="top"
                  hasArrow
                >
                  <Text>
                    {Number(
                      formatUnits(project?.totalFunding, "ether")
                    ).toFixed(2)}{" "}
                    ETH
                  </Text>
                </Tooltip>
              }
            />
            <Totalizer
              label="Creator Funding"
              value={
                <Tooltip
                  label={`${formatUnits(project?.ownFunding, "ether")} ETH`}
                  placement="top"
                  hasArrow
                >
                  <Text>
                    {Number(formatUnits(project?.ownFunding, "ether")).toFixed(
                      2
                    )}{" "}
                    ETH
                  </Text>
                </Tooltip>
              }
            />
            <Totalizer
              label="Target Funding"
              value={
                <Tooltip
                  label={`${formatUnits(project?.targetFunding, "ether")} ETH`}
                  placement="top"
                  hasArrow
                >
                  <Text>
                    {Number(
                      formatUnits(project?.targetFunding, "ether")
                    ).toFixed(2)}{" "}
                    ETH
                  </Text>
                </Tooltip>
              }
            />
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
            <Table variant="striped" className="responsive-table">
              <Thead>
                <Tr>
                  <Th>Wallet Address</Th>
                  <Th isNumeric>Amount</Th>
                  <Th>Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {contributions.length ? (
                  contributions
                    .filter(({ claimed }) => !claimed)
                    .map(({ contributor, value, createdAt }, index) => (
                      <Tr key={index}>
                        <Td>
                          <Tooltip label={contributor}>
                            {shortAddress(contributor)}
                          </Tooltip>
                        </Td>
                        <Td isNumeric>{formatUnits(value, "ether")} ETH</Td>
                        <Td>
                          {convertTimestampToDate(
                            createdAt
                          ).toLocaleDateString()}
                        </Td>
                      </Tr>
                    ))
                ) : (
                  <Tr>
                    <Td colSpan={6}>
                      <Center>
                        <Text fontSize={12}>There is no contributions yet</Text>
                      </Center>
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Stack>
      </HStack>
    </Stack>
  );
}
