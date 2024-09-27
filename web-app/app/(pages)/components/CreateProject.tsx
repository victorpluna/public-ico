"use client";
import React from "react";
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
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Formik, Field, FieldInputProps, FormikProps } from "formik";
import { BiPlus } from "react-icons/bi";
import { validateRequired, validateURL } from "@/app/config/validation";

interface FormValues {
  targetFunding: number;
}

interface FieldNumberProps {
  field: FieldInputProps<number>;
  form: FormikProps<FormValues>;
}

export default function CreateProject() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        leftIcon={<BiPlus />}
        onClick={onOpen}
        colorScheme="teal"
        variant="outline"
      >
        Create Project
      </Button>
      <Drawer isOpen={isOpen} placement="right" size="sm" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create new project</DrawerHeader>

          <DrawerBody>
            <Formik initialValues={initialValues} onSubmit={console.log}>
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
                    <Button type="submit" colorScheme="teal" width="full">
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
  targetFunding: 0.01,
  fundingWallet: "",
};
