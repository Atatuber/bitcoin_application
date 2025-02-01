export default function PaginationButton({ isNext, onClick, disabled }) {
  return disabled ? (
    <button
      onClick={onClick}
      className="flex border-gray-200 bg-gray-100 shadow font-medium rounded-md px-3 py-2 border-2 text-black transition duration-300 ease-in-out"
      disabled
    >
      {isNext ? (
        <>
          Next
          <div className="m-1"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          <div className="m-1"></div>
          Previous
        </>
      )}
    </button>
  ) : (
    <button
      onClick={onClick}
      className="flex bg-white disabled:border-gray-200 disabled:bg-gray-50 shadow font-medium rounded-md px-3 py-2 border-2 text-black hover:bg-gray-50 transition duration-300 ease-in-out"
    >
      {isNext ? (
        <>
          Next
          <div className="m-1"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          <div className="m-1"></div>
          Previous
        </>
      )}
    </button>
  );
}
