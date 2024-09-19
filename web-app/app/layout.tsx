import "./reset.scss";

import { Box, Flex } from "@chakra-ui/react";

import { Providers } from "./providers";
import { fonts } from "./fonts";
import SideMenu from "@/app/components/SideMenu";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fonts.rubik.variable}>
      <body>
        <Providers>
          <Flex minH="100vh" direction="column">
            <SideMenu />
            <Flex
              flex="1"
              direction="column"
              minH="100vh"
              ml="250px"
              bg="gray.50"
            >
              <Header />
              <Box flex="1" p={6} w="full">
                {children}
              </Box>
              <Footer />
            </Flex>
          </Flex>
        </Providers>
      </body>
    </html>
  );
}
