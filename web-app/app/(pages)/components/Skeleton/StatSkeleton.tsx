import { Box, SkeletonText } from "@chakra-ui/react";

export function StatSkeleton() {
  return (
    <Box padding="6" w="200px">
      <SkeletonText noOfLines={3} spacing="4" skeletonHeight="5" />
    </Box>
  );
}
