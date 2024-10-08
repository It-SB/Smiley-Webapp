import React from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";
import { Header1 } from "./Header";

const Banner = ({
  handleInputChange,
  handleLocationChange,
  query,
  location,
  onSubmit,
}) => {
  return (
    <div className="bg-gradient-to-b from-white to-white text-blue">
      <div className="max-w-screen-2xl mx-auto xl:px-24 md:py-20 py-14 px-4 ">
        <h1 className="text-5xl font-bold  mb-3">
          Find your <span className="">new job</span> today
        </h1>
        <p className="text-lg text-black/70 mb-8 ">
          Thousands of jobs in the computer, engineering and technology sectors
          are waiting for you.
        </p>

        <form onSubmit={onSubmit}>
          <div className="flex justify-start md:flex-row flex-col md:gap-3 gap-4 ">
            <div className="flex  rounded shadow-sm ring-1 ring-inset ring-black focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/2 w-full relative border border-blue">
              <input
                type="text"
                name="query"
                id="query"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-blue placeholder:text-black focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="What position are you looking for?"
                onChange={handleInputChange}
                value={query}
              />
              <FiSearch className="absolute mt-2.5 ml-2 text-blue" />
            </div>

            <div className="flex  rounded ring-1 ring-inset ring-black focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/3 relative border border-blue">
              <input
                type="text"
                name="location"
                id="location"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-blue placeholder:text-black focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Location"
                onChange={handleLocationChange}
                value={location}
              />
              <FiMapPin className="absolute mt-2.5 ml-2 text-blue" />
            </div>

            <button
              type="submit"
              className="bg-blue py-2 px-8 text-white md:rounded-e-md rounded"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Banner;
