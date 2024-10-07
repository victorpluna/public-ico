"use client";
import { shortAddress } from "@/app/config/utils";
import { FaChevronRight } from "react-icons/fa6";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FaChevronDown, FaPowerOff } from "react-icons/fa6";
import { useAccount, useConnect, useDisconnect } from "wagmi";

interface Props {
  onShowSidebar: () => void;
  showSidebarButton?: boolean;
}

export default function Header({ showSidebarButton, onShowSidebar }: Props) {
  const {
    connectors: [connector],
    connect,
  } = useConnect();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <Box as="header" w="100%" p={{ base: 2, md: 4 }}>
      <Flex
        justifyContent={showSidebarButton ? "space-between" : "flex-end"}
        alignItems="center"
      >
        {showSidebarButton && (
          <IconButton
            icon={<FaChevronRight />}
            colorScheme="blackAlpha"
            variant="outline"
            onClick={onShowSidebar}
            aria-label="toggle-button"
          />
        )}
        {address ? (
          <Menu>
            <MenuButton as={Button} rightIcon={<FaChevronDown />}>
              {shortAddress(address)}
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
