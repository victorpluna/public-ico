import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { FaChevronRight } from "react-icons/fa6";

interface BreadcrumbItem {
  href?: string;
  label: string;
}

interface Props {
  items: Array<BreadcrumbItem>;
}

export function BreadCrumb({ items }: Props) {
  return (
    <Breadcrumb spacing="8px" separator={<FaChevronRight color="gray.500" />}>
      {items.map(({ href, label }) => (
        <BreadcrumbItem isCurrentPage={!href}>
          <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}
