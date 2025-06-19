export default function Loading() {
  return (
    <div className="flex-1 w-full h-full flex flex-col items-center justify-center gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p className="text-gray-600 text-lg font-medium">Loading...</p>
    </div>
  );
}
