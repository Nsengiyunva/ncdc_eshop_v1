import { MDPreview } from "components/Elements";
import React from "react";
import { FiMail, FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";

export const BookToEvaluate = ({ books }) => {
  return (
    <div className="space-y-6">
      {books?.map((bookEvaluation, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
          {!bookEvaluation.amount && (
            <div className="p-4 bg-gray-50 rounded-lg mb-6">
              <div className="text-lg font-bold mb-2 text-green-700">
                Thank you for sharing your work with us!
              </div>
              <div className="text-gray-700">
                We appreciate your submission and will promptly review your material. You will receive a notification once the evaluation fee has been determined by the administrator.
              </div>
              <div className="text-sm font-bold mb-2 mt-3">
                <div className="mb-3">
                  If you have any questions, feel free to call or send an email.
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
                  <a href="tel:+393112088" className="flex items-center gap-2 text-green-700 hover:underline">
                    <FiPhoneCall className="text-lg" />
                    <span>Hotline: +256-393-112-088</span>
                  </a>
                  <a href="mailto:eshop-services@ncdc.go.ug" className="flex items-center gap-2 text-green-700 hover:underline">
                    <FiMail className="text-lg" />
                    <span>admin@ncdc.go.ug</span>
                  </a>
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-4">
            {bookEvaluation.amount !== null && (
              <>
                <div className="space-y-4">
                  <div className="mb-3">
                    <div className="text-xs font-semibold text-gray-500">Book Title</div>
                    <div className="font-bold text-lg text-gray-800">{bookEvaluation.book_title}</div>
                  </div>
                  <div className="">
                    <div className="text-xs font-semibold text-gray-500">Fee</div>
                    <div className="font-bold text-lg text-gray-800">
                      {parseFloat(bookEvaluation?.amount).toLocaleString("en-US", {
                        style: "currency",
                        currency: "UGX",
                      })}
                    </div>
                  </div>
                  <div className="bg-orange-100 text-orange-600 text-md font-bold p-3 rounded-lg">
                    Please note that you're required to pay the evaluation fee within a period of {bookEvaluation?.period_of_delivery} days
                  </div>
                  <div className="p-2">
                    <div className="text-gray-500 font-semibold">Comments</div>
                    <div className="mt-1">
                      {bookEvaluation?.comments === null ? (
                        <p className="text-gray-500">No comments for now.</p>
                      ) : (
                        <MDPreview value={bookEvaluation?.comments} />
                      )}
                    </div>
                  </div>
                  <Link to="/services/book-evaluation/make-payment">
                    <button
                      className="my-4 w-full text-white bg-green-500 rounded-lg shadow-sm font-extrabold px-5 py-2 hover:bg-green-600 transition-colors duration-300"
                      onClick={() => {
                        localStorage.setItem("evaluationAmount", bookEvaluation?.amount);
                        localStorage.setItem("evaluation_id", bookEvaluation?.id);
                      }}
                    >
                      Pay Evaluation Fee
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
