"use client";
import { Box, Heading, VStack } from "@chakra-ui/react";
import { FaLayerGroup } from "react-icons/fa6";

import SideMenuItem from "./SideMenuItem";
import { usePathname } from "next/navigation";

export default function SideMenu() {
  const currentPath = usePathname();

  return (
    <Box as="nav" w="250px" p={4} position="fixed" h="100vh">
      <Heading as="h1" size="lg" mb="40px">
        Public ICO
      </Heading>
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
