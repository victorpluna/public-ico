import { Skeleton, Stack } from "@chakra-ui/react";

export function TableSkeleton() {
  return (
    <Stack>
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
    </Stack>
  );
}
