import React from "react";
import { BookToEvaluate } from "../components/BookToEvaluate";
import { UploadBookForm } from "../components/UploadBookForm";
import { useEvaluation } from "../api/getBookEvaluation";
import { useAuth } from "lib/auth";
import { Spinner } from "components/Elements";

export const Books = () => {
  const evaluationQuery = useEvaluation();
  const { user } = useAuth();

  const evaluationBook = evaluationQuery.data?.filter((bookEvaluation) => {
    return bookEvaluation?.user_id === user?.id;
  });

  if (evaluationQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {evaluationBook?.length !== 0 ? (
        <section className="bg-gray-50 p-5 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Your Current Evaluations</h2>
          <BookToEvaluate books={evaluationBook} />
        </section>
      ) : (
        <section className="bg-gray-50 p-5 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">No Evaluations Found</h2>
          <p className="text-gray-600 mb-4">You don't have any current book evaluations. Start by uploading a new book for evaluation.</p>
          <UploadBookForm />
        </section>
      )}
    </div>
  );
};
