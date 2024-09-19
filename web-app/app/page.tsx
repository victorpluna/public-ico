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

export default function Home() {
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
              <Th isNumeric>Target Funding</Th>
              <Th isNumeric>Locked Funding</Th>
              <Th isNumeric>Creator Funding</Th>
              <Th>Expiry Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Initial Coin Offering 1</Td>
              <Td isNumeric>25.4</Td>
              <Td isNumeric>25.4 (83,4%)</Td>
              <Td isNumeric>25.4</Td>
              <Td>10/11/2024</Td>
            </Tr>
            <Tr>
              <Td>Initial Coin Offering 2</Td>
              <Td isNumeric>25.4</Td>
              <Td isNumeric>25.4 (67,1%)</Td>
              <Td isNumeric>25.4</Td>
              <Td>10/11/2024</Td>
            </Tr>
            <Tr>
              <Td>Initial Coin Offering 3</Td>
              <Td isNumeric>25.4</Td>
              <Td isNumeric>25.4 (33,8%)</Td>
              <Td isNumeric>25.4</Td>
              <Td>10/11/2024</Td>
            </Tr>
            <Tr>
              <Td>Initial Coin Offering 4</Td>
              <Td isNumeric>25.4</Td>
              <Td isNumeric>25.4 (7,2%)</Td>
              <Td isNumeric>25.4</Td>
              <Td>10/11/2024</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
