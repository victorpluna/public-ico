import { Box, Flex } from "@chakra-ui/react";
import { Metadata } from "next";

import { Providers } from "../providers";
import { fonts } from "../fonts";
import SideMenu from "./components/Layout/SideMenu";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "DICO - Decentralized ICOs",
    template: "%s | DICO",
  },
  description:
    "DICO is a decentralized application where web3 projects can raise decentralized and trustless funding",
  openGraph: {
    images: ["/images/logo-social.png"], // it's not working
  },
  twitter: {
    images: ["/images/logo-social.png"], // it's not working
  },
};

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
