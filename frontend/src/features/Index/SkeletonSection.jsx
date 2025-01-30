export default function SkeletonSection() {
  return (
    <section className="max-w-sm rounded overflow-hidden shadow-lg animate-pulse w-full">
      <div className="h-48 bg-gray-200"></div>

      <div className="px-6 py-4">
        <div className="h-6 bg-gray-200 rounded-full w-3/4 mb-4"></div>

        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded-full w-full"></div>
          <div className="h-4 bg-gray-200 rounded-full w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded-full w-4/6"></div>
        </div>
      </div>

      <div className="px-6 pt-4 pb-6">
        <div className="h-4 bg-gray-200 rounded-full w-1/4"></div>
      </div>
    </section>
  );
}
