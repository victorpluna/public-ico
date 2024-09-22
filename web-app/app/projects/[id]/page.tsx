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
import { BiLinkExternal, BiPlus } from "react-icons/bi";

interface Props {
  params: { id: number };
}

export default function ProjectDetail({ params: { id } }: Props) {
  const address = "0x35BE4f1Aa18AD52D606E9B2eA257A3416e8030fF";

  return (
    <Stack spacing="6">
      <Heading size="lg">DICO - Decentralized ICO</Heading>
      <HStack justifyContent="space-between">
        <Badge variant="outline" colorScheme="teal">
          Expiration Date: 12/19/2024
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
              <StatNumber>31.54 ETH</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Creator Funding</StatLabel>
              <StatNumber>412.33 ETH</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Target Funding</StatLabel>
              <StatNumber>42.55 ETH</StatNumber>
            </Stat>
          </StatGroup>
          <Progress value={50} size="lg" colorScheme="teal" hasStripe />
          <HStack justifyContent="space-between">
            <Button
              rightIcon={<BiLinkExternal />}
              colorScheme="teal"
              variant="outline"
            >
              White Paper
            </Button>
            <Button
              rightIcon={<BiLinkExternal />}
              colorScheme="teal"
              variant="outline"
            >
              Project Plan
            </Button>
            <Button
              rightIcon={<BiLinkExternal />}
              colorScheme="teal"
              variant="outline"
            >
              Contract Code
            </Button>
          </HStack>
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
