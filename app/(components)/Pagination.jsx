import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

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
              className="bg-blue-700 hover:bg-blue-800  hover:text-white text-white rounded"
              onClick={decreasePage}
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
          <PaginationLink>{totalPages}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white rounded"
            disabled={isLastPage}
          >
            <PaginationNext
              className="bg-blue-700 hover:bg-blue-800 hover:text-white cursor-pointer text-white rounded"
              onClick={increasePage}
            />{" "}
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
