"use client";
import {
  Box,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  VStack,
} from "@chakra-ui/react";
import { FaLayerGroup, FaCoins } from "react-icons/fa6";

import SideMenuItem from "./SideMenuItem";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface Props {
  onClose: () => void;
  isOpen: boolean;
  variant: string | undefined;
}

export default function SideMenu({ variant, isOpen, onClose }: Props) {
  return variant === "sidebar" ? (
    <Box as="nav" w="250px" p={4} position="fixed" h="100vh">
      <SideMenuContent onClickItem={onClose} />
    </Box>
  ) : (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <SideMenuContent onClickItem={onClose} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

export function SideMenuContent({ onClickItem }: { onClickItem: () => void }) {
  const currentPath = usePathname();

  return (
    <>
      <Center mb="40px">
        <Image
          alt="dico logo"
          src="/images/logo-light.png"
          width="150"
          height="50"
        />
      </Center>
      <VStack align="start" spacing={5}>
        <SideMenuItem
          icon={FaLayerGroup}
          label="Open ICOs"
          href="/"
          isActive={currentPath === "/"}
          onClick={onClickItem}
        />
        <SideMenuItem
          icon={FaCoins}
          label="My Contributions"
          href="/myContributions"
          isActive={currentPath === "/myContributions"}
          onClick={onClickItem}
        />
      </VStack>
    </>
  );
}
