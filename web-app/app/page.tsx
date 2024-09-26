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
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { readContract } from "wagmi/actions";
import { contractAbi } from "./config/contract-abi";
import { Project } from "./models/project";
import { constants } from "./lib/constants";
import { config } from "./config/wagmi";
import ProjectTableItem from "./components/ProjectTableItem";

export default async function Home() {
  const projects = (await readContract(config, {
    abi: contractAbi,
    address: constants.contractAddress,
    functionName: "listActiveProjects",
  })) as Project[];

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
      <TableContainer>
        <Table variant="striped">
          <TableCaption>
            Projects that have not yet completed the target funding amount
          </TableCaption>
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
    </div>
  );
}
