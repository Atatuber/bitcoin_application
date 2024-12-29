export default function Card({ title, message }) {
    return (
      <div className="block w-full sm:w-full p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 overflow-hidden">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {title}
        </h5>
        <p className="font-normal text-gray-700 break-words">{message}</p>
      </div>
    );
  }
  