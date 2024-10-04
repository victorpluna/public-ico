import { Box, HStack, Skeleton } from "@chakra-ui/react";
import { StatSkeleton } from "../../components/Skeleton/StatSkeleton";
import { TableSkeleton } from "../../components/Skeleton/TableSkeleton";

export default function Loading() {
  return (
    <>
      <Box mb="50px">
        <Skeleton height="20px" width="20%" mb="20px" />
        <Skeleton height="40px" width="50%" mb="20px" />
        <Skeleton height="20px" width="20%" />
      </Box>
      <HStack>
        <HStack flex="2" justifyContent="space-between">
          <StatSkeleton />
          <StatSkeleton />
          <StatSkeleton />
          <Box />
        </HStack>
        <Box flex="1">
          <TableSkeleton />
        </Box>
      </HStack>
    </>
  );
}
