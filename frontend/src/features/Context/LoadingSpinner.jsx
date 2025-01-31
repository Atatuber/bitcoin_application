export default function LoadingSpinner() {
  return (
    <section className="fixed inset-0 flex justify-center items-center transition-opacity duration-500">
      <div className="animate-spin rounded-full h-32 w-32 border-8 border-indigo-600 border-t-transparent transition-all duration-500 ease-in-out"></div>
    </section>
  );
}
