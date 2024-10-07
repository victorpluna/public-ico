"use client";
import { useState } from "react";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import SideMenu from "./SideMenu";
import Header from "./Header";
import Footer from "./Footer";

const smVariant = { navigation: "drawer", navigationButton: true };
const mdVariant = { navigation: "sidebar", navigationButton: false };

export function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <Flex minH="100vh" direction="column">
      <SideMenu
        variant={variants?.navigation}
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
      />
      <Flex
        flex="1"
        direction="column"
        minH="100vh"
        ml={{ sm: 0, md: 250 }}
        bg="gray.50"
      >
        <Header
          showSidebarButton={variants?.navigationButton}
          onShowSidebar={toggleSidebar}
        />
        <Box flex="1" px={{ base: 2, md: 6 }} py={{ base: 4, md: 6 }} w="full">
          {children}
        </Box>
        <Footer />
      </Flex>
    </Flex>
  );
}
