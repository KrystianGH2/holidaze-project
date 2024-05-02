import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function PaginationDemo({
  increasePage,
  decreasePage,
  isLastPage,
  isFirstPage,
  currentPage,
  totalPages,
}) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <button disabled={isFirstPage}>
            <PaginationPrevious
              onClick={decreasePage}
              className={"cursor-pointer"}
            />
          </button>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className={"text-black"} isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
       
      
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <button disabled={isLastPage}>
            <PaginationNext
              onClick={increasePage}
              className={"cursor-pointer"}
            />{" "}
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
