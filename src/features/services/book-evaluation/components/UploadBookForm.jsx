import { Button } from "components/Elements";
import { Form, InputField } from "components/Form";
import React, { useState } from "react";
import * as z from "zod";
import { useUploadBook } from "../api/uploadBook";
import { FiMail, FiPhoneCall } from "react-icons/fi";

export const UploadBookForm = () => {
  const schema = z.object({
    book_title: z.string().min(1, "Required"),
  });

  const [bookPdf, setBookPdf] = useState();
  const uploadBookMutation = useUploadBook();

  return (
    <div className="">
      {uploadBookMutation.isSuccess ? (
        <div className="p-4">
          <div className="text-lg font-bold mb-2">
            Thank you for sharing your work with us!
          </div>
          <div className="text-gray-700">
            We appreciate your submission and will promptly review your
            material. You will receive a notification once the evaluation fee
            has been determined by the administrator.
          </div>
          <div className="text-sm font-bold mb-2 mt-3">
            <div className="mb-3">
              If you have any questions. Feel free to call or send an email.
            </div>

            <div className="flex flex-row items-center space-x-2">
              <a href="tel:+393112088" className="flex items-center gap-2">
                <FiPhoneCall className="text-green-600 text-lg" />
                <h1 className="text-green-700 text-xs">Hotline: +256-393-112-088</h1>
              </a>

              <a
                href="mailto:admin@ncdc.go.ug"
                className="flex items-center gap-2"
              >
                <FiMail className="text-green-600 text-lg" />
                <h1 className="text-green-700 text-xs">
                  admin@ncdc.go.ug
                </h1>
              </a>
            </div>
          </div>
        </div>
      ) : (
        <Form
          onSubmit={async (values) => {
            const { book_title } = values;
            const bodyFormData = new FormData();
            bodyFormData.append("book_title", book_title);
            bodyFormData.append("location", bookPdf);
            await uploadBookMutation.mutateAsync({
              data: bodyFormData,
            });
          }}
          schema={schema}
        >
          {({ register, formState }) => (
           <div className="p-8 flex flex-col space-y-2">
           <InputField
             label="Book Title"
             required={true}
             error={formState.errors["book_title"]}
             registration={register("book_title")}
           />
           <div className="">
             <div className="text-gray-600">
               Select material for Evaluation
             </div>
             <div className="text-gray-600 text-xs mb-3">
               Please provide the book title and upload the material in PDF, DOC, or DOCX format.
             </div>
             <input
               className="border border-gray-300 rounded-md shadow-sm p-2"
               type="file"
               accept=".pdf,.doc,.docx"
               onChange={(e) => setBookPdf(e.target.files[0])}
               required
             />
           </div>
           <div>
             <Button
               isLoading={uploadBookMutation?.isLoading}
               type="submit"
               className={`w-full ${
                 uploadBookMutation?.isLoading
                   ? "bg-green-400"
                   : "bg-green-600"
               }`}
             >
               {uploadBookMutation?.isLoading
                 ? "Uploading material..."
                 : "Submit Material"}
             </Button>
           </div>
           <div className="text-gray-600 text-xs mt-3">
             If you have any questions or need assistance, feel free to reach out to us.
           </div>
         </div>
          )}
        </Form>
      )}
    </div>
  );
};
