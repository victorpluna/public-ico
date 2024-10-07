"use client";
import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Td,
  Tr,
  Text,
  useToast,
  Badge,
  Table,
  Thead,
  Th,
  Tbody,
  Flex,
} from "@chakra-ui/react";
import { formatUnits } from "ethers";
import Link from "next/link";
import { BiMoneyWithdraw } from "react-icons/bi";
import { usePathname, useRouter } from "next/navigation";
import { convertTimestampToDate } from "@/app/config/utils";
import { ProjectContributions } from "@/app/models/contribution";
import { executeWriteContract } from "@/app/lib/execute-write-contract";

interface Props {
  projectContributions: ProjectContributions;
}

export default function ContributionTableItem({ projectContributions }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const currentPath = usePathname();
  const { projectId, projectTitle, total, claimed, contributions } =
    projectContributions;

  const handleConfirmClick = async (onClose: () => void) => {
    setIsLoading(true);

    try {
      await executeWriteContract({
        functionName: "claimFunds",
        args: [projectId],
        toast: toast,
        onCloseComplete: () => router.push(currentPath),
      });
    } catch (error) {
      console.log("error", error);
      toast({
        title: "Refund failed.",
        description: "Transaction could not be completed",
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <>
      <Tr fontWeight="500">
        <Td>
          <Link href={`/projects/${projectId}`}>{projectTitle}</Link>
        </Td>
        <Td isNumeric>{formatUnits(total, "ether")} ETH</Td>
        <Td>
          <Flex justifyContent="flex-end">
            {claimed ? (
              <Badge variant="outline" colorScheme="teal">
                Refunded
              </Badge>
            ) : (
              <Popover closeOnBlur={false}>
                {({ onClose }) => (
                  <>
                    <PopoverTrigger>
                      <Button
                        leftIcon={<BiMoneyWithdraw />}
                        onClick={() => {}}
                        colorScheme="teal"
                        variant="outline"
                      >
                        Refund
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Confirmation!</PopoverHeader>
                      <PopoverBody>
                        <Text fontSize="xs">
                          Are you sure you want to get your money back?
                        </Text>
                      </PopoverBody>
                      <PopoverFooter display="flex" justifyContent="flex-end">
                        <ButtonGroup size="sm">
                          <Button onClick={onClose} variant="outline">
                            Cancel
                          </Button>
                          <Button
                            isLoading={isLoading}
                            onClick={() => handleConfirmClick(onClose)}
                            colorScheme="teal"
                          >
                            Yes
                          </Button>
                        </ButtonGroup>
                      </PopoverFooter>
                    </PopoverContent>
                  </>
                )}
              </Popover>
            )}
          </Flex>
        </Td>
      </Tr>
      <Tr>
        <Td colSpan={3}>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Amount</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {contributions.map(({ value, createdAt }, index) => (
                <Tr key={index}>
                  <Td>{formatUnits(value, "ether")} ETH</Td>
                  <Td suppressHydrationWarning>
                    {convertTimestampToDate(createdAt).toLocaleDateString()}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Td>
      </Tr>
    </>
  );
}
