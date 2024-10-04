"use client";
import React, { useState } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
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
import { Formik, Field, FieldInputProps, FormikProps } from "formik";
import { BiPlus } from "react-icons/bi";
import { useAccount } from "wagmi";
import { parseEther } from "ethers";
import { usePathname, useRouter } from "next/navigation";
import { validateRequired, validateURL } from "@/app/config/validation";
import { executeWriteContract } from "@/app/lib/execute-write-contract";
import { refreshPage } from "@/app/actions";

interface FormValues {
  title: string;
  whitePaper: string;
  projectPlan: string;
  contractCode: string;
  targetFunding: number;
  ownFunding: number;
  fundingWallet: string;
}

interface FieldNumberProps {
  field: FieldInputProps<number>;
  form: FormikProps<FormValues>;
}

export default function CreateProject() {
  const router = useRouter();
  const currentPath = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmitForm = async (values: FormValues) => {
    setIsLoading(true);
    const {
      title,
      whitePaper,
      projectPlan,
      contractCode,
      targetFunding,
      ownFunding,
      fundingWallet,
    } = values;

    try {
      await executeWriteContract({
        functionName: "createProject",
        value: parseEther(ownFunding.toString()),
        args: [
          title,
          whitePaper,
          projectPlan,
          contractCode,
          parseEther(targetFunding.toString()),
          fundingWallet,
        ],
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
          leftIcon={<BiPlus />}
          onClick={onOpen}
          colorScheme="teal"
          variant="outline"
          isDisabled={!isConnected}
        >
          Create Project
        </Button>
      </Tooltip>
      <Drawer isOpen={isOpen} placement="right" size="sm" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create new project</DrawerHeader>

          <DrawerBody>
            <Formik initialValues={initialValues} onSubmit={handleSubmitForm}>
              {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4} align="flex-start">
                    <FormControl isInvalid={!!errors.title && touched.title}>
                      <FormLabel htmlFor="title">Project Title</FormLabel>
                      <Field
                        as={Input}
                        id="title"
                        name="title"
                        type="text"
                        variant="filled"
                        placeholder="ex. DICO - Decentralized ICO"
                        validate={validateRequired}
                      />
                      <FormErrorMessage>{errors.title}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.whitePaper && touched.whitePaper}
                    >
                      <FormLabel htmlFor="whitePaper">White Paper</FormLabel>
                      <Field
                        as={Input}
                        id="whitePaper"
                        name="whitePaper"
                        type="text"
                        variant="filled"
                        placeholder="https://"
                        validate={validateURL}
                      />
                      <FormErrorMessage>{errors.whitePaper}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.projectPlan && touched.projectPlan}
                    >
                      <FormLabel htmlFor="projectPlan">Project Plan</FormLabel>
                      <Field
                        as={Input}
                        id="projectPlan"
                        name="projectPlan"
                        type="text"
                        variant="filled"
                        placeholder="https://"
                        validate={validateURL}
                      />
                      <FormErrorMessage>{errors.projectPlan}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.contractCode && touched.contractCode}
                    >
                      <FormLabel htmlFor="contractCode">
                        Contract Code
                      </FormLabel>
                      <Field
                        as={Input}
                        id="contractCode"
                        name="contractCode"
                        type="text"
                        variant="filled"
                        placeholder="https://"
                        validate={validateURL}
                      />
                      <FormErrorMessage>{errors.contractCode}</FormErrorMessage>
                    </FormControl>
                    <Field name="targetFunding">
                      {({ field, form }: FieldNumberProps) => (
                        <FormControl id="targetFunding">
                          <FormLabel htmlFor="targetFunding">
                            Target Funding
                          </FormLabel>
                          <NumberInput
                            id="targetFunding"
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
                    <Field name="ownFunding">
                      {({ field, form }: FieldNumberProps) => (
                        <FormControl id="ownFunding">
                          <FormLabel htmlFor="ownFunding">
                            Own Funding
                          </FormLabel>
                          <NumberInput
                            id="ownFunding"
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
                    <FormControl
                      isInvalid={
                        !!errors.fundingWallet && touched.fundingWallet
                      }
                    >
                      <FormLabel htmlFor="fundingWallet">
                        Funding Wallet
                      </FormLabel>
                      <Field
                        as={Input}
                        id="fundingWallet"
                        name="fundingWallet"
                        type="text"
                        variant="filled"
                        placeholder="ex. 0x0397a..."
                        validate={validateRequired}
                      />
                      <FormErrorMessage>
                        {errors.fundingWallet}
                      </FormErrorMessage>
                    </FormControl>
                    <Button
                      isLoading={isLoading}
                      type="submit"
                      colorScheme="teal"
                      width="full"
                    >
                      Create
                    </Button>
                  </VStack>
                </form>
              )}
            </Formik>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

const initialValues = {
  title: "",
  whitePaper: "",
  projectPlan: "",
  contractCode: "",
  targetFunding: 0.1,
  ownFunding: 0.01,
  fundingWallet: "",
};
