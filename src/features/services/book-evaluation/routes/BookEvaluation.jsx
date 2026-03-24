import { MainLayout } from "components/Layout";
import { useAuth } from "lib/auth";
import { LogError } from "../components/LogError";
import { Books } from "./Books";
import { Link } from "react-router-dom";
import { ChevronRight } from "react-feather";
import Breadcrumbs from "components/Layout/Breadcrumbs";

export const BookEvaluation = () => {
  const { user } = useAuth();

  const routes = [
    {
      path: "/services/book-evaluation",
      name: "Book Evaluation",
    },
  ];

  return (
    <MainLayout>
      <Breadcrumbs routes={routes} />
      <div className="bg-white shadow rounded-md p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#008000] via-blue-500 to-purple-500 rounded-t-2xl" />
        <header className="border-b pb-5">
          <h1 className="text-2xl font-bold">NCDC Book Evaluation Service</h1>
          <p className="text-sm text-gray-600">
            Providing quality book evaluations for educational purposes.
          </p>
        </header>

        <div className="text-gray-700">{user ? <Books /> : <LogError />}</div>

        <footer className="border-t pt-5 text-sm text-gray-500">
          <p>
            &copy; 2024 NCDC Book Evaluation Service. All rights reserved.
          </p>
        </footer>
      </div>
    </MainLayout>
  );
};
