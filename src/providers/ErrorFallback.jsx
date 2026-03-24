import { useState } from "react";

export function ErrorFallback() {
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    // Example: send report to logging/monitoring service
    console.log("User issue report:", description);
    alert("Thank you for your feedback. Our team will review this shortly.");
    setDescription("");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center px-4">
      <div className="bg-white rounded-md p-8 shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Oops! Something went wrong.
        </h2>
        <p className="text-gray-600 mb-4">
          We're sorry for the inconvenience. An unexpected error has occurred.
        </p>
        <p className="text-gray-600 mb-4">
          <b className="text-blue-500">Don't worry —</b> our team has been
          notified. If you'd like, you can also help by reporting what happened.
        </p>

        <label
          htmlFor="error-description"
          className="block text-gray-700 font-medium mb-1"
        >
          Describe what you were doing:
        </label>
        <textarea
          id="error-description"
          className="w-full border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="What were you trying to do? What went wrong?"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
        >
          Submit Report
        </button>

        <button
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
          onClick={() => window.location.assign(window.location.origin)}
        >
          Go Back to Home
        </button>
        <button
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => {
            window.location.reload(true);
            localStorage.clear();
            sessionStorage.clear();
            window.location.assign(window.location.origin);
          }}
        >
          Reset Cache and Refresh
        </button>

        <div className="text-xs text-gray-400 mt-6">
          <div>
            Error ID: <code>ERR-XYZ-1234</code>
          </div>
          <div>Timestamp: {new Date().toLocaleString()}</div>
          <div className="mt-1">
            Need help? Contact{" "}
            <a
              href="mailto:admin@ncdc.go.ug"
              className="text-blue-500 underline"
            >
              admin@ncdc.go.ug
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
