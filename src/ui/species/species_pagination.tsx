"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/ui/components/pagination";
import { usePathname, useSearchParams } from "next/navigation";

type SpeciesPaginationProps = {
  totalPages: number;
  itemsPerPage: number;
  currentPage: number;
};

type PaginationProps = {
  type: "page" | "ellipsis" | "next" | "previous";
  pageNumber?: number;
};

export default function SpeciesPagination(props: SpeciesPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const paginations = generatePagination(props.currentPage, props.totalPages);
  const paginationButtons = paginations.map((paginationProps, index) => {
    const isCurrentPage = paginationProps.pageNumber === props.currentPage;
    const isFirstPage = props.currentPage === 1;
    const isLastPage = props.currentPage === props.totalPages;

    const urlSearchParams = new URLSearchParams(searchParams);
    switch (paginationProps.type) {
      case "page":
        urlSearchParams.set(
          "page",
          paginationProps.pageNumber?.toString() ?? ""
        );
        break;
      case "next":
        urlSearchParams.set("page", (props.currentPage + 1).toString());
        break;
      case "previous":
        urlSearchParams.set("page", (props.currentPage - 1).toString());
        break;
      case "ellipsis":
        break;
    }

    return (
      <PaginationItem key={`${paginationProps.pageNumber}-${index}`}>
        <PaginationButton
          type={paginationProps.type}
          label={paginationProps.pageNumber?.toString()}
          href={`${pathname}?${urlSearchParams.toString()}`}
          isActive={isCurrentPage}
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
        />
      </PaginationItem>
    );
  });

  return (
    <Pagination>
      <PaginationContent>{paginationButtons}</PaginationContent>
    </Pagination>
  );
}

function PaginationButton({
  type,
  label,
  href,
  isActive,
  isFirstPage,
  isLastPage,
}: {
  type: "page" | "ellipsis" | "next" | "previous";
  label?: string;
  href: string;
  isActive: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
}) {
  switch (type) {
    case "ellipsis":
      return <PaginationEllipsis />;
    case "next":
      return (
        <PaginationNext
          href={href}
          aria-disabled={isLastPage}
          className={isLastPage ? "pointer-events-none opacity-50" : ""}
        />
      );
    case "previous":
      return (
        <PaginationPrevious
          href={href}
          aria-disabled={isFirstPage}
          className={isFirstPage ? "pointer-events-none opacity-50" : ""}
        />
      );
    default:
      return (
        <PaginationLink href={href} isActive={isActive}>
          {label}
        </PaginationLink>
      );
  }
}

function generatePagination(
  currentPage: number,
  totalPages: number
): PaginationProps[] {
  const window = 1;
  const expectedRange = window * 2;
  let start = Math.max(1, currentPage - window);
  let end = Math.min(totalPages, currentPage + window);

  // Expand range if not enough pages are shown
  const shown = end - start;
  if (shown < expectedRange) {
    const missing = expectedRange - shown;
    if (start === 1) {
      end = Math.min(totalPages, end + missing);
    }
    if (end === totalPages) {
      start = Math.max(1, start - missing);
    }
  }

  const pages: PaginationProps[] = [];
  for (let i = start; i <= end; i++) {
    pages.push({ type: "page", pageNumber: i });
  }

  // Add start ellipsis and first page
  if (start > 1) {
    if (start > 2) {
      pages.unshift({ type: "ellipsis" });
    }
    pages.unshift({ type: "page", pageNumber: 1 });
  }

  // Add end ellipsis and last page
  if (end < totalPages) {
    if (end < totalPages - 1) {
      pages.push({ type: "ellipsis" });
    }
    pages.push({ type: "page", pageNumber: totalPages });
  }

  // Add previous and next buttons
  pages.unshift({ type: "previous" });
  pages.push({ type: "next" });

  return pages;
}
