import { ElementType } from "react";
import { Link } from "@chakra-ui/next-js";
import { HStack, Icon, Text } from "@chakra-ui/react";

interface SideMenuItemProps {
  isActive: boolean;
  icon: ElementType;
  label: string;
  href: string;
  onClick?: () => void;
}

export default function SideMenuItem({
  isActive,
  icon,
  label,
  href,
  onClick,
}: SideMenuItemProps) {
  return (
    <Link
      href={href}
      borderRadius="md"
      w="full"
      bg={isActive ? "teal.50" : undefined}
      color={isActive ? "teal" : "gray.700"}
      _hover={{ bg: "teal.50", color: "teal" }}
      onClick={onClick}
    >
      <HStack w="full" p={3} spacing={3}>
        <Icon as={icon} boxSize={5} />
        <Text>{label}</Text>
      </HStack>
    </Link>
  );
}
