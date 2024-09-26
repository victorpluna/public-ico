"use client";
import { Project } from "@/app/models/project";
import { Button, HStack } from "@chakra-ui/react";
import { BiLinkExternal } from "react-icons/bi";

interface Props {
  project: Project;
}

export default function ProjectActionButtons({ project }: Props) {
  return (
    <HStack justifyContent="space-between">
      <Button
        rightIcon={<BiLinkExternal />}
        onClick={() => window.open(project.whitePaper, "_blank")}
        colorScheme="teal"
        variant="outline"
      >
        White Paper
      </Button>
      <Button
        rightIcon={<BiLinkExternal />}
        onClick={() => window.open(project.projectPlan, "_blank")}
        colorScheme="teal"
        variant="outline"
      >
        Project Plan
      </Button>
      <Button
        rightIcon={<BiLinkExternal />}
        onClick={() => window.open(project.contractCode, "_blank")}
        colorScheme="teal"
        variant="outline"
      >
        Contract Code
      </Button>
    </HStack>
  );
}
