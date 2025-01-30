export default function SkeletonSection() {
  return (
    <section class="max-w-sm rounded overflow-hidden shadow-lg animate-pulse w-full">
      <div class="h-48 bg-gray-200"></div>

      <div class="px-6 py-4">
        <div class="h-6 bg-gray-200 rounded-full w-3/4 mb-4"></div>

        <div class="space-y-3">
          <div class="h-4 bg-gray-200 rounded-full w-full"></div>
          <div class="h-4 bg-gray-200 rounded-full w-5/6"></div>
          <div class="h-4 bg-gray-200 rounded-full w-4/6"></div>
        </div>
      </div>

      <div class="px-6 pt-4 pb-6">
        <div class="h-4 bg-gray-200 rounded-full w-1/4"></div>
      </div>
    </section>
  );
}
