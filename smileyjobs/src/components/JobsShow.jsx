"use client";

import React from "react";

const JobShow = ({
  handleChange,
  handleClick,
  prevPage,
  nextPage,
  filteredItems,
  itemsPerPage,
  result = [],
  state = { isLoading: false, currentPage: 1 },
  Sidebar,
  Jobs,
  Newsletter,
}) => {
  return (
    <div className="bg-gradient-to-b from-white to-blue md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
      {/* Sidebar */}
      <div className="backdrop-blur-sm bg-white/30 p-4 rounded border border-blue">
        <Sidebar handleChange={handleChange} handleClick={handleClick} />
      </div>

      {/* Main Job Listings */}
      <div className="col-span-2 backdrop-blur-sm bg-white/30 p-4 rounded border border-blue">
        {state.isLoading ? (
          <p className="font-medium">Loading...</p>
        ) : result.length > 0 ? (
          <Jobs result={result} />
        ) : (
          <>
            <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
            <p>No data found</p>
          </>
        )}

        {/* Pagination */}
        {result.length > 0 && (
          <div className="flex justify-center mt-4 space-x-8">
            <button
              onClick={prevPage}
              disabled={state.currentPage === 1}
              className="hover:underline"
            >
              Previous
            </button>
            <span className="mx-2">
              Page {state.currentPage} of{" "}
              {Math.ceil(filteredItems().length / itemsPerPage)}
            </span>
            <button
              onClick={nextPage}
              disabled={
                state.currentPage ===
                Math.ceil(filteredItems().length / itemsPerPage)
              }
              className="hover:underline"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Newsletter */}
      <div className="backdrop-blur-sm bg-white/30 p-4 rounded border border-blue">
        <Newsletter />
      </div>
    </div>
  );
};

export default JobShow;
