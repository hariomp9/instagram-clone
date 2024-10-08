const Pagination = ({ totalPages, page, onPageChange }) => {
  const renderPageButtons = () => {
    const maxVisiblePages = 5;
    const firstPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    const lastPage = Math.min(totalPages, firstPage + maxVisiblePages - 1);

    return Array.from({ length: lastPage - firstPage + 1 }, (_, index) => (
      <button
        key={firstPage + index}
        className={`relative h-10 max-h-[40px] w-10 max-w-[33px] select-none rounded-lg ${
          firstPage + index === page
            ? "bg-gray-400  text-[10px] text-black shadow-md shadow-gray-900/10"
            : " hover:bg-gray-900/10 "
        } text-center align-middle font-sans 2xl:text-xl xl:text-[14px] lg:text-[12px] md:text-[12px] sm:text-[10px] text-[10px] font-medium uppercase transition-all disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
        type="button"
        onClick={() => onPageChange(firstPage + index)}
        disabled={page === firstPage + index}
      >
        <span className="absolute text-[black] transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          {firstPage + index}
        </span>
      </button>
    ));
  };

  return (
    <>
      <div className="flex justify-end items-center gap-0 sm:gap-2 xl:gap-2 mt-5">
        <button
          className="flex items-center  sm:gap-1 xl:gap-2 px-0 sm:px-6 py-3 font-sans 2xl:text-xl xl:text-[14px] lg:text-[12px] md:text-[12px] sm:text-[10px] text-[10px] font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            aria-hidden="true"
            className="w-4 h-4 mr-3 sm:mr-2 md:mr-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            ></path>
          </svg>
          Previous
        </button>
        <div className="flex items-center sm:gap-2">
          {renderPageButtons()}
          {totalPages > 5 && page + 2 < totalPages && (
            <span className="mx-2">...</span>
          )}
        </div>
        <button
          className="flex items-center  gap-2 lg:px-6 lg:py-3 font-sans 2xl:text-xl xl:text-[14px] lg:text-[12px] md:text-[12px] sm:text-[10px] text-[10px] font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            aria-hidden="true"
            className="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            ></path>
          </svg>
        </button>
      </div>
    </>
  );
};

export default Pagination;
