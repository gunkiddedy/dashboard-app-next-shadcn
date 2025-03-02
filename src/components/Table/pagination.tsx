import { NextIcon, PrevIcon } from "../shared/svgs";

const Pagination = ({ table }: { table: any }) => {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();
  // const maxPageNumbers = 5; // Number of visible pages before "..."
  const maxPageNumbers = table.getState().pagination.pageSize;

  const getPageNumbers = () => {
    let pages: (number | string)[] = [];
    // const half = Math.floor(maxPageNumbers / 2);
    const half = Math.floor(maxPageNumbers);

    if (totalPages <= maxPageNumbers) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else if (currentPage <= half + 1) {
      pages = [...Array(maxPageNumbers).keys()].map((n) => n + 1);
      pages.push("...");
      pages.push(totalPages);
    } else if (currentPage >= totalPages - half) {
      pages.push(1);
      pages.push("...");
      pages = pages.concat(
        Array.from(
          { length: maxPageNumbers - 1 },
          (_, i) => totalPages - (maxPageNumbers - 2) + i,
        ),
      );
    } else {
      pages.push(1);
      pages.push("...");
      pages = pages.concat(
        Array.from(
          { length: maxPageNumbers - 2 },
          (_, i) => currentPage - half + i,
        ),
      );
      pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center gap-4 mt-4 justify-center">
      {/* previous button */}
      <button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        className="disabled:opacity-25"
      >
        <PrevIcon />
      </button>

      {/* page numbers */}
      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-3">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => table.setPageIndex(Number(page) - 1)}
            className={`w-[35px] h-[31px] rounded-[4px] text-sm ${
              currentPage === page
                ? "border border-[#5D30BE] font-semibold"
                : "font-normal"
            }`}
          >
            {page}
          </button>
        ),
      )}

      {/* next button */}
      <button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        className="disabled:opacity-25"
      >
        <NextIcon />
      </button>
    </div>
  );
};

export default Pagination;
