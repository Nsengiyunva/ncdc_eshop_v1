import { MainLayout } from "components/Layout";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <MainLayout>
      <div className="md:w-2/3 lg:w-1/2 mx-auto py-10 md:py-20 h-full rounded-md">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-green-600 text-9xl">404</h1>

          <h6 className="mb-2 text-2xl font-bold text-center text-gray-400 md:text-3xl">
            <span className="text-red-500">Sorry, </span> Page not found
          </h6>

          <p className="mb-8 text-center text-gray-500 md:text-lg">
            The page you’re looking for doesn’t exist.
          </p>

          <Link
            to="./"
            className="px-6 py-3 text-sm font-semibold text-gray-500 bg-blue-100 rounded rounded-md"
          >
            Go back home
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};
