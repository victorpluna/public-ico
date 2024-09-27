"use client";
import { Box, Center, VStack } from "@chakra-ui/react";
import { FaLayerGroup } from "react-icons/fa6";

import SideMenuItem from "./SideMenuItem";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function SideMenu() {
  const currentPath = usePathname();

  return (
    <Box as="nav" w="250px" p={4} position="fixed" h="100vh">
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
        />
        <SideMenuItem
          icon={FaLayerGroup}
          label="My ICOs"
          href="/myOffers"
          isActive={currentPath === "/myOffers"}
        />
      </VStack>
    </Box>
  );
}
