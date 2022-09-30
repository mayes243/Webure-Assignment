import React from "react";
import { Link } from "react-router-dom";

const FileNotFound = () => {
  return (
    <section className="flex items-center h-full p-16 dark:text-gray-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-indigo-500">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn't find this page.
          </p>
          <p className="mt-4 mb-8"></p>
          <Link
            to="/"
            className="px-8 py-3 font-semibold rounded bg-indigo-600 text-white"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FileNotFound;
