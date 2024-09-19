"use client";
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FaChevronDown, FaPowerOff } from "react-icons/fa6";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function Header() {
  const {
    connectors: [connector],
    connect,
  } = useConnect();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <Box as="header" w="100%" p={4}>
      <Flex justifyContent="end" alignItems="center">
        {address ? (
          <Menu>
            <MenuButton as={Button} rightIcon={<FaChevronDown />}>
              {`${address.slice(0, 5)}...${address.slice(-5)}`}
            </MenuButton>
            <MenuList minW="170px">
              <MenuItem icon={<FaPowerOff />} onClick={() => disconnect()}>
                Disconnect
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button
            onClick={() => connect({ connector: connector })}
            colorScheme="teal"
            variant="solid"
          >
            Connect Wallet
          </Button>
        )}
      </Flex>
    </Box>
  );
}
