import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  label: string;
  value: string | ReactNode;
  helpText?: string;
}

export function Totalizer({ label, value, helpText }: Props) {
  return (
    <Stat>
      <StatLabel fontSize={{ base: "xs", md: "sm" }}>{label}</StatLabel>
      <StatNumber fontSize={{ base: "lg", md: "2xl" }}>{value}</StatNumber>
      {helpText && (
        <StatHelpText fontSize={{ base: "xs", md: "sm" }}>
          {helpText}
        </StatHelpText>
      )}
    </Stat>
  );
}
