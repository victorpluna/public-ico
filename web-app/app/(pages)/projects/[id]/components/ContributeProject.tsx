"use client";
import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Tooltip,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { parseEther } from "ethers";
import { Field, FieldInputProps, Formik, FormikProps } from "formik";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { useAccount } from "wagmi";
import { executeWriteContract } from "@/app/lib/execute-write-contract";
import { refreshPage } from "@/app/actions";

interface Props {
  projectId: number;
}

interface FormValues {
  value: number;
}

interface FieldNumberProps {
  field: FieldInputProps<number>;
  form: FormikProps<FormValues>;
}

export default function ContributeProject({ projectId }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const { isConnected } = useAccount();
  const router = useRouter();
  const currentPath = usePathname();
  const toast = useToast();

  const handleSubmitForm = async ({ value }: FormValues) => {
    setIsLoading(true);

    try {
      await executeWriteContract({
        functionName: "contribute",
        value: parseEther(value.toString()),
        args: [projectId],
        toast: toast,
        onCloseComplete: () => refreshPage(currentPath),
      });
    } catch (error) {
      console.log("error", error);
      toast({
        title: "Transaction failed.",
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
      <Tooltip
        label="You must connect your wallet"
        placement="top"
        isDisabled={isConnected}
        hasArrow
      >
        <Button
          onClick={onOpen}
          isDisabled={!isConnected}
          leftIcon={<BiPlus />}
          colorScheme="teal"
          variant="outline"
        >
          Contribute
        </Button>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Project Contribution</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik initialValues={initialValues} onSubmit={handleSubmitForm}>
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <VStack spacing={6} align="flex-start">
                    <Field name="value">
                      {({ field, form }: FieldNumberProps) => (
                        <FormControl id="value">
                          <FormLabel htmlFor="value">
                            Contribution Amount
                          </FormLabel>
                          <NumberInput
                            id="value"
                            {...field}
                            step={0.01}
                            min={0.01}
                            precision={8}
                            variant="filled"
                            onChange={(value) =>
                              form.setFieldValue(field.name, value)
                            }
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </FormControl>
                      )}
                    </Field>
                    <Button
                      isLoading={isLoading}
                      type="submit"
                      colorScheme="teal"
                      width="full"
                    >
                      Contribute
                    </Button>
                  </VStack>
                </form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

const initialValues: FormValues = {
  value: 0.1,
};
