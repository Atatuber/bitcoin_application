export default function Pagination({ txPerPage, length, currentPage, onPageChange }) {
  const totalPages = Math.ceil(length / txPerPage);

  const getDisplayedPages = () => {
    if (totalPages <= 7) {
      return [...Array(totalPages).keys()].map((num) => num + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const displayedPages = getDisplayedPages();
  return (
    <div className="flex flex-wrap justify-center items-center mt-4">
      {displayedPages.map((pageNumber, index) => {
        if (pageNumber === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="mx-1 px-3 py-1 text-gray-500"
            >
              ...
            </span>
          );
        }

        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`mx-1 px-3 py-1 rounded transition-colors duration-200 ${
              pageNumber === currentPage
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {pageNumber}
          </button>
        );
      })}
    </div>
  );
}