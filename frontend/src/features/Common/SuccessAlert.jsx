export default function SuccessAlert({ message, setMessageState }) {
    return (
      <div
        className="flex justify-between items-center bg-green-100 border border-green-400 text-green-700 p-3 m-4 rounded relative"
        role="alert"
      >
        <span className="block sm:inline">{message}</span>
        <button onClick={() => setMessageState({ message: "", closed: true })}>
          <svg
            className="fill-current h-6 w-6 text-green-500 ml-5"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </button>
      </div>
    );
  }
  