export default function Error() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
            <h1 className="text-5xl font-bold text-red-600 dark:text-red-400">404 : PAGE NOT FOUND</h1>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
            Something went wrong. Please try again later.
            </p>
        </div>
        </div>
    );
}