import { Box, HStack } from "@chakra-ui/react";
import { TableSkeleton } from "./components/Skeleton/TableSkeleton";
import { StatSkeleton } from "./components/Skeleton/StatSkeleton";

export default function Loading() {
  return (
    <>
      <HStack justifyContent="space-between" mb="20px">
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
        <Box />
      </HStack>
      <TableSkeleton />
    </>
  );
}
