import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { useParams } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa6";
import Swal from "sweetalert2";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from "../firebase/firebase.config"; // Adjust the import based on your file structure

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchJob = async () => {
      const docRef = doc(db, "Otherjobs", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setJob(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchJob();
  }, [id, db]);

  const handleJobApply = async () => {
    const subject = "Regarding " + (job.jobTitle || " Job Application") + " Job Post";
    const body =
      "Hi " +
      (job?.username || "Recruiter") +
      ",\n\n" +
      "I am interested in applying for this job.";

    // Open the default email client
    window.location.href = `mailto:${job?.postedBy || ""}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // if (!job) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <PageHeader title={"Job Details Page"} path={"Single Job"} />
      <div className="mt-10">
        <div className="my-4">
          <h2 className="text-2xl font-medium text-blue">Position</h2>
          <p className="bg-blue px-6 py-1 text-white rounded-sm">{job.jobTitle}</p>
        </div>

        <div className="my-4 space-y-2">
          <div className="flex items-center gap-2">
            <FaBriefcase />
            <p className="text-xl font-medium mb-2">Job type</p>
          </div>
          <button className="bg-blue px-6 py-1 text-white rounded-sm">
            {job.jobType || "Employment Type"}
          </button>
          <button
            className="bg-indigo-700 px-6 py-1 text-white rounded-sm ms-2"
            onClick={handleJobApply}
          >
            Apply Now
          </button>
        </div>

        {/* Job details */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mt-12 p-5 border border-blue shadow-sm shadow-blue">
          <div className="md:w-1/3 border p-5 border-blue">
            <h4 className="text-lg font-medium mb-3">Skills</h4>
            <p className="text-sm text-primary/70 mb-2">
              Required skills for this position
            </p>
            <ul className="list-disc list-outside text-primary/90 space-y-2 text-base">
              {job.skills && job.skills.length > 0 ? (
                job.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))
              ) : (
                <li>No skills listed</li>
              )}
            </ul>
          </div>

          <div className="md:w-1/3 p-5 border border-blue">
            <h4 className="text-lg font-medium mb-3">Outline</h4>
            <p className="text-primary/90">{job.desc || job.description}</p>
          </div>
          <div className="md:w-1/3 p-5 border border-blue">
            <h4 className="text-lg font-medium mb-3">Salary</h4>
            <p className="text-primary/90">
                {job.minPrice && job.maxPrice
                  ? `${job.minPrice} - ${job.maxPrice} ${job.salaryType}`
                  : job.range
                  ? job.range
                  : "Not available"}
              </p>
          </div>
        </div>

        <div className="text-primary/75 my-5 space-y-6 p-5 border border-blue shadow-sm shadow-blue">
          {job.additionalComments}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
