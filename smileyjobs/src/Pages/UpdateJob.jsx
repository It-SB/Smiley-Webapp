import React, { useState, useEffect, useNavigate } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import CreatableSelect from "react-select/creatable";
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';
import PageHeader from '../components/PageHeader';

const UpdateJob = () => {
  const { jobId } = useParams(); // Assuming the job ID is passed as a route parameter
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState([]);
  const [benefitsList, setBenefitsList] = useState([]);
  const [jobType, setJobType] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [category, setCategory] = useState([]);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [jobData, setJobData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState([]);
  // Fetch job data and categories from Firestore
  useEffect(() => {
    const fetchJobData = async () => {
      const jobRef = doc(db, "Otherjobs", jobId);
      const jobDoc = await getDoc(jobRef);

      if (jobDoc.exists()) {
        const jobData = jobDoc.data();
        setSelectedOption(jobData.skills.map(skill => ({ value: skill, label: skill })));
        setBenefitsList(jobData.benefits || []);
        setJobType(jobData.jobType || "");
        setCategory(jobData.category || []);
        
        // Populate the form with the job data
        Object.keys(jobData).forEach(key => {
          setValue(key, jobData[key]);
        });
      }
    };

    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "Catergory"));
      const categoriesFromDb = querySnapshot.docs.map(doc => ({
        value: doc.id,
        label: doc.data().name,
      }));
      setCategoryOptions(categoriesFromDb);
    };

    fetchJobData();
    fetchCategories();
  }, [jobId, setValue]);

  const onSubmit = async (data) => {
    data.skills = selectedOption.map(option => option.value);
    data.benefits = benefitsList;
    data.jobType = jobType;
    data.category = category;

    try {
      const jobRef = doc(db, 'Otherjobs', jobId);
      await updateDoc(jobRef, data);
      alert("Job Updated Successfully!!");
      navigate(`/job/${jobId}`); // Redirect to the job detail page or any other page
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Error updating job. Please try again.");
    }
  };

  const handleBenefitsChange = (e) => {
    const value = e.target.value;
    const lines = value.split('\n').filter(line => line.trim() !== '');
    setBenefitsList(lines);
  };

  const jobTypeOptions = [
    { value: "Remote", label: "Remote" },
    { value: "Hybrid", label: "Hybrid" },
    { value: "On-site", label: "On-site" },
  ];

  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "C++", label: "C++" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "React", label: "React" },
    { value: "Node", label: "Node" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Redux", label: "Redux" },
  ];

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <PageHeader title={"Update This Job"} path={"Edit Job"} />

      {/* form */}
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* 1st row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Title</label>
              <input
                defaultValue={jobData?.jobTitle}
                {...register("jobTitle")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Name</label>
              <input
                defaultValue={jobData?.companyName}
                {...register("companyName")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* 2nd row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Minimum Salary</label>
              <input
                defaultValue={jobData?.minPrice}
                {...register("minPrice")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Maximum Salary</label>
              <input
                defaultValue={jobData?.maxPrice}
                {...register("maxPrice")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* 3rd row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Salary Type</label>
              <select
                defaultValue={jobData?.salaryType}
                {...register("salaryType")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              >
                <option value="">Choose your salary</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Location</label>
              <input
                defaultValue={jobData?.jobLocation}
                {...register("jobLocation")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* 4th row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Posting Date</label>
              <input
                defaultValue={jobData?.postingDate}
                {...register("postingDate")}
                type="date"
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Experience Level</label>
              <select
                defaultValue={jobData?.experienceLevel}
                {...register("experienceLevel")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              >
                <option value="">Select Your Experience Level</option>
                <option value="0 - 2 years">0 - 2 years</option>
                <option value="2 - 4 years">2 - 4 years</option>
                <option value="4 - 6 years">4 - 6 years</option>
                <option value="6 - 10 years">6 - 10 years</option>
                <option value="10+ years">10+ years</option>
              </select>
            </div>
          </div>

          {/* 5th row: Required Skills */}
          <div>
            <label className="block mb-2 text-lg">Required Skill Sets:</label>
            <CreatableSelect
              value={selectedOption}
              onChange={setSelectedOption}
              options={options}
              isMulti
              className="create-job-input py-4"
            />
          </div>

          {/* 6th row: Category */}
          <div>
            <label className="block mb-2 text-lg">Category</label>
            <CreatableSelect
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={categoryOptions}
              isMulti
              className="create-job-input py-4"
            />
          </div>

          {/* 7th row */}
          <div>
            <label className="block mb-2 text-lg">Job Description</label>
            <textarea
              defaultValue={jobData?.description}
              {...register("description")}
              rows="5"
              className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
            />
          </div>

          <div className="text-center mt-6">
            <button type="submit" className="bg-primary text-white py-2 px-4 rounded">
              Update Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateJob;
