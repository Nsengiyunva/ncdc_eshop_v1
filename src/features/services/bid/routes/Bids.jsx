import { MainLayout } from "components/Layout";
import { useNavigate } from "react-router-dom";
import { useBids } from "../api/getBids";
import { ChevronRight, Info } from "react-feather";
import { Button } from "components/Elements";
import Breadcrumbs from "components/Layout/Breadcrumbs";
import { Tooltip } from "flowbite-react";

export const Bids = () => {
  const bidsQuery = useBids();
  const navigate = useNavigate();

  const routes = [
    {
      path: "/bids",
      name: "Bids",
    },
  ];

  console.log(bidsQuery?.data);

  return (
    <MainLayout page="Bids">
      <Breadcrumbs routes={routes} />

      <section className="bg-white p-4 rounded-md shadow-md space-y-6">
        <div className="flex flex-row items-center gap-2">
          <h2 className="text-2xl font-bold text-gray-800">Public Bids</h2>
          <Tooltip content="A formal offer submitted by a company, individual, or organization to supply goods, services, or undertake work in response to a request from a buyer — typically a government agency or large organization.">
            <Info className="text-gray-500" size={20} />
          </Tooltip>
        </div>

        <p className="text-sm text-gray-700 leading-relaxed">
          The National Curriculum Development Centre (NCDC) regularly publishes
          official bid notices in accordance with the Public Procurement and
          Disposal of Public Assets Act, 2003. These notices outline
          opportunities for suppliers, contractors, and service providers to
          participate in open and fair government procurement processes. Below
          is a list of active bids currently open for submission.
        </p>

        {bidsQuery.isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-lg p-6 shadow h-full space-y-4"
              >
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                <div className="h-10 bg-gray-300 rounded w-32 mt-4"></div>
              </div>
            ))}
          </div>
        ) : bidsQuery?.data?.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {bidsQuery.data.map((bid, index) => (
              <div
                key={index}
                className="relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col justify-between space-y-4 group"
              >
                {/* Header */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-200">
                      {bid?.name}
                    </h3>
                    <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 font-medium rounded-md hidden sm:inline">
                      BID
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-xs">
                        Opening Date
                      </span>
                      <span className="text-green-600 font-medium">
                        {bid?.bid_opening_date}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-xs">
                        Closing Date
                      </span>
                      <span className="text-red-600 font-medium">
                        {bid?.bid_closing_date}
                      </span>
                    </div>
                  </div>

                  {/* Ref Number */}
                  <p className="text-xs text-gray-500 italic mt-1">
                    Ref: {`NCDCBD-${bid?.bid_opening_date?.slice(0, 7)}-${bid?.id}`}
                  </p>
                </div>

                {/* Call to Action */}
                <div className="pt-2 border-t border-dashed border-gray-200 mt-auto">
                  <Button
                    className="mt-4 w-full sm:w-auto"
                    onClick={() => navigate(`/services/bids/${bid?.slug}`)}
                    endIcon={<ChevronRight />}
                  >
                    View Full Details
                  </Button>
                </div>

                {/* Decorative Accent */}
                <div className="absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 rounded-t-xl" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 mt-4">
            No bids are available at this time.
          </p>
        )}
      </section>
    </MainLayout>
  );
};
