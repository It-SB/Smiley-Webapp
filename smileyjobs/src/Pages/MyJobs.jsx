import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { db, collection, query, where, getDocs, deleteDoc, doc } from "../firebase/firebase.config";

const MyJobs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const jobsQuery = query(
          collection(db, "Otherjobs"), // Ensure this matches the collection name in Firestore
          where("postedBy", "==", user?.email) // Ensure the field and value match your data
        );
        const querySnapshot = await getDocs(jobsQuery);
        const jobsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setJobs(jobsData);
        setFilteredJobs(jobsData); // Initialize filteredJobs with the full list of jobs
      } catch (error) {
        console.error("Error fetching jobs: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [user]);

  useEffect(() => {
    // Apply search filter whenever searchText changes
    const filter = jobs.filter(job =>
      job.jobTitle.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredJobs(filter);
    setCurrentPage(1); // Reset to the first page whenever search changes
  }, [searchText, jobs]);

  const handleSearch = () => {
    // Trigger search by updating searchText state
    setSearchText(searchText);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Otherjobs", id)); // Ensure this matches the collection name in Firestore
      alert("Job Deleted Successfully!!");
      // Refresh job list after deletion
      const jobsQuery = query(
        collection(db, "Otherjobs"), // Ensure this matches the collection name in Firestore
        where("postedBy", "==", user?.email) // Ensure the field and value match your data
      );
      const querySnapshot = await getDocs(jobsQuery);
      const jobsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJobs(jobsData);
      setFilteredJobs(jobsData); // Ensure filteredJobs is also updated
    } catch (error) {
      console.error("Error deleting job: ", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (indexOfLastItem < filteredJobs.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="my-jobs-container">
        <h1 className="text-center p-4">ALL My Jobs</h1>
        <div className="search-box p-2 text-center mb-2">
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            placeholder="search"
            className="py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full"
          />
          <button
            onClick={handleSearch}
            className="bg-blue text-white font-semibold px-8 py-2 rounded-sm mb-4"
          >
            Search
          </button>
        </div>

        <section className="py-1 bg-blueGray-50">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-5">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex md:flex-row gap-4 flex-col items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-blueGray-700">
                      All Jobs
                    </h3>
                  </div>
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                    <Link
                      to="/post-job"
                      className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    >
                      Post A New Job
                    </Link>
                  </div>
                </div>
              </div>

              <div className="block w-full overflow-x-auto">
                <table className="items-center bg-transparent w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        No.
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Title
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Company Name
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Salary
                      </th>
                      {/* <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Edit
                      </th> */}
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Delete
                      </th>
                    </tr>
                  </thead>

                  {isLoading ? (
                    <div className="flex items-center justify-center h-20">
                      <p>Loading...</p>
                    </div>
                  ) : (
                    <tbody>
                      {currentJobs.map((job, index) => (
                        <tr key={job.id}>
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                            {index + 1}
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {job.jobTitle}
                          </td>
                          <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {job.companyName}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {job.minPrice} - {job.maxPrice}
                          </td>
                          {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <button><Link to={`/edit-job/${job.id}`}>Edit</Link></button>
                          </td> */}
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <button className="bg-red-700 py-2 px-6 text-white rounded-sm" onClick={() => handleDelete(job.id)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>

          <div className="flex justify-center text-black space-x-8">
            {currentPage > 1 && (
              <button onClick={prevPage} className="hover:underline">
                Previous
              </button>
            )}
            {indexOfLastItem < filteredJobs.length && (
              <button onClick={nextPage} className="hover:underline">
                Next
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyJobs;
