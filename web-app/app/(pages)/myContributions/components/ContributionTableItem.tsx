"use client";
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
} from "@chakra-ui/react";
import { formatUnits } from "ethers";
import Link from "next/link";
import { BiMoneyWithdraw } from "react-icons/bi";
import { convertTimestampToDate } from "@/app/config/utils";
import { Contribution } from "@/app/models/contribution";
import { writeContract } from "wagmi/actions";
import { config } from "@/app/config/wagmi";
import { contractAbi } from "@/app/config/contract-abi";
import { constants } from "@/app/lib/constants";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  contribution: Contribution;
}

export default function ContributionTableItem({ contribution }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const currentPath = usePathname();
  const { projectId, projectTitle, value, claimed, createdAt } = contribution;

  const handleConfirmClick = async (onClose: Function) => {
    setIsLoading(true);

    try {
      await writeContract(config, {
        abi: contractAbi,
        address: constants.contractAddress,
        functionName: "claimFunds",
        args: [projectId],
      });
      router.push(currentPath);
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
    <Tr>
      <Td>
        <Link href={`/projects/${projectId}`}>{projectTitle}</Link>
      </Td>
      <Td isNumeric>{formatUnits(value, "ether")} ETH</Td>
      <Td>{convertTimestampToDate(createdAt).toLocaleDateString()}</Td>
      <Td>
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
      </Td>
    </Tr>
  );
}
