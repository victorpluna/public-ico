import { Box, Button, Flex } from "@chakra-ui/react";

export default function Header() {
  return (
    <Box as="header" w="100%" p={4}>
      <Flex justifyContent="end" alignItems="center">
        <Button colorScheme="teal" variant="solid">
          Connect Wallet
        </Button>
      </Flex>
    </Box>
  );
}
