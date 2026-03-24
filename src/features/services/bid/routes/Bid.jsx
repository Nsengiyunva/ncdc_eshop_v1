import { MainLayout } from "components/Layout";
import { UPLOADS_API_URL_DOCS } from "config";
import { useAuth } from "lib/auth";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useBid } from "../api/getBid";
import { useEmailVerify } from "features/account/api/emailVerify";

import { differenceInSeconds } from "date-fns";
import { Button } from "components/Elements";
import { MdPayment } from "react-icons/md";
import { DownloadIcon } from "@heroicons/react/solid";
import Breadcrumbs from "components/Layout/Breadcrumbs";

export const Bid = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { slug } = useParams();
  const auth = useAuth();
  const bid = useBid({ slug });
  const verifyEmailMutation = useEmailVerify();

  const futureDate = 1700420825723;

  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  function getTimeRemaining() {
    const now = new Date();
    const difference = differenceInSeconds(futureDate, now);
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    const days = Math.floor(difference / (60 * 60 * 24));
    const hours = Math.floor((difference % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((difference % (60 * 60)) / 60);
    const seconds = difference % 60;
    return { days, hours, minutes, seconds };
  }

  const routes = [
    { path: "/services/bids", name: "Bids" },
    { path: `/services/bids/${slug}`, name: bid.data?.name },
  ];

  return (
    <MainLayout>
      <Breadcrumbs routes={routes} />
      {bid.isLoading ? (
        <div className="shadow bg-white rounded-md p-8 space-y-4 animate-pulse">
          <div className="h-8 w-4/6 bg-gray-300 rounded"></div>
          <div className="h-8 w-5/6 bg-gray-200 rounded"></div>
          <div className="h-8 w-5/6 bg-gray-100 rounded"></div>
        </div>
      ) : (
        <div className="bg-white shadow rounded-md p-6 sm:p-10 relative overflow-hidden">
          {/* Decorative Gradient Strip */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#008000] via-blue-500 to-purple-500 rounded-t-2xl" />

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            {bid.data?.name}
          </h1>

          {/* Countdown */}
          <div className="bg-gray-100 border border-dashed border-green-300 p-4 rounded-lg mb-6 text-green-700 text-sm font-semibold">
            Time remaining: {timeRemaining.days}d {timeRemaining.hours}h{" "}
            {timeRemaining.minutes}m {timeRemaining.seconds}s
          </div>

          {/* Dates */}
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
            <div>
              <span className="text-gray-500">Bid Opening Date</span>
              <p className="font-medium text-green-600">
                {bid.data?.bid_opening_date}
              </p>
            </div>
            <div>
              <span className="text-gray-500">Bid Closing Date</span>
              <p className="font-medium text-red-600">
                {bid.data?.bid_closing_date}
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Description
            </h2>
            <p className="text-gray-800 text-sm leading-relaxed">
              {bid.data?.details}
            </p>
          </div>

          {/* Bid Items Table */}
          {bid.data?.bidItems?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Procurement Items
              </h2>
              <div className="overflow-auto">
                <table className="w-full text-sm text-left border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 font-semibold">Reference No.</th>
                      <th className="px-4 py-2 font-semibold">
                        Subject Matter
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bid.data.bidItems.map((item, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2 text-gray-700">
                          {item?.procurement_ref_no}
                        </td>
                        <td className="px-4 py-2 text-gray-700">
                          {item?.subject_matter}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Documents & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6">
            <a
              href={`${UPLOADS_API_URL_DOCS}/bids/${bid?.data?.bid_details_location}`}
              target="_blank"
              rel="noreferrer"
            >
              <Button startIcon={<DownloadIcon className="h-5" />}>
                Download Bid Details
              </Button>
            </a>

            {auth.user ? (
              auth.user.email_verified_at === null ? (
                <button
                  className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600"
                  onClick={async () =>
                    await verifyEmailMutation.mutateAsync({
                      email: auth?.user?.email,
                    })
                  }
                >
                  Verify account
                </button>
              ) : (
                <Link to={`/services/bids/${bid.data?.slug}/make-payment`}>
                  <Button startIcon={<MdPayment />} variant="outline">
                    Continue to Payment
                  </Button>
                </Link>
              )
            ) : (
              <Link to="/auth/login">
                <button className="text-green-600 border border-green-500 rounded-lg px-5 py-2 hover:bg-green-50 font-semibold">
                  Log in to participate
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </MainLayout>
  );
};
