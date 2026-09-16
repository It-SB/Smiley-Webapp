import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { db, storage } from "../firebase/firebase.config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { AuthContext } from "../context/AuthProvider";

const CreateJob = () => {
  const [selectedOption, setSelectedOption] = useState([]);
  const [benefitsList, setBenefitsList] = useState([]);   
  const [jobType, setJobType] = useState(""); // New state for job type
  const [category, setCategory] = useState([]); // New state for category
  const [logoUrl, setLogoUrl] = useState("");
  const [postImageUrl, setPostImageUrl] = useState("");
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingPostImage, setIsUploadingPostImage] = useState(false);
  const { user } = useContext(AuthContext);

  const { register, handleSubmit, reset, watch } = useForm();

  const handleCompanyLogoUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setIsUploadingLogo(true);

    try {
      const storageRef = ref(
        storage,
        `company-logos/${Date.now()}-${file.name}`,
      );
      await uploadBytes(storageRef, file);
      const uploadedUrl = await getDownloadURL(storageRef);
      setLogoUrl(uploadedUrl);
      alert("Company logo uploaded successfully.");
    } catch (error) {
      console.error("Error uploading logo:", error);
      alert("Error uploading company logo. Please try again.");
    } finally {
      setIsUploadingLogo(false);
      event.target.value = "";
    }
  };

  const handleFileUpload = async (event, type) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Basic validation
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      event.target.value = "";
      return;
    }

    // 5MB limit
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be smaller than 5MB.");
      event.target.value = "";
      return;
    }

    const isLogo = type === "logo";

    if (isLogo) {
      setIsUploadingLogo(true);
    } else {
      setIsUploadingPostImage(true);
    }

    try {
      const fileExtension = file.name.split(".").pop();
      const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;

      const folder = isLogo ? "company-logos" : "job-post-images";

      const storageRef = ref(storage, `${folder}/${fileName}`);

      await uploadBytes(storageRef, file);

      const downloadUrl = await getDownloadURL(storageRef);

      if (isLogo) {
        setLogoUrl(downloadUrl);
      } else {
        setPostImageUrl(downloadUrl);
      }

      alert(`${isLogo ? "Company logo" : "Job image"} uploaded successfully.`);
    } catch (error) {
      console.error(`Error uploading ${isLogo ? "logo" : "job image"}:`, error);

      alert(
        `Error uploading ${isLogo ? "company logo" : "job image"}: ${
          error?.message || "Please try again."
        }`,
      );
    } finally {
      if (isLogo) {
        setIsUploadingLogo(false);
      } else {
        setIsUploadingPostImage(false);
      }

      event.target.value = "";
    }
  };

  const onSubmit = async (data) => {
    if (!user) {
      alert("Please log in before posting a job.");
      return;
    }

    const jobData = {
      ...data,

      skills: selectedOption.map((option) => option.value),

      benefits: benefitsList,

      jobType,

      category: category.length ? category.map((option) => option.value) : [],

      companyLogo: logoUrl || "",

      postImage: postImageUrl || "",

      postedBy: user.email || "",

      postedByUid: user.uid || "",

      createdAt: serverTimestamp(),
    };

    try {
      const jobsCollection = collection(db, "Otherjobs");

      await addDoc(jobsCollection, jobData);

      alert("Job Posted Successfully!!");

      reset();

      setSelectedOption([]);
      setBenefitsList([]);
      setJobType("");
      setCategory([]);
      setLogoUrl("");
      setPostImageUrl("");
    } catch (error) {
      console.error("Error posting job:", error);

      alert(`Error posting job: ${error?.message || "Please try again."}`);
    }
  };

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

  const handleBenefitsChange = (e) => {
    const value = e.target.value;
    const lines = value.split("\n").filter((line) => line.trim() !== "");
    setBenefitsList(lines);
  };

  const jobTypeOptions = [
    { value: "Remote", label: "Remote" },
    { value: "Hybrid", label: "Hybrid" },
    { value: "On-site", label: "On-site" },
  ];

  const categoryOptions = [
    { value: "Health", label: "Health" },
    { value: "Finance", label: "Finance" },
    { value: "HR", label: "HR" },
    { value: "IT Consulting", label: "IT Consulting" },
    { value: "Education", label: "Education" },
    { value: "Legal", label: "Legal" },
    { value: "Marketing", label: "Marketing" },
    { value: "Engineering", label: "Engineering" },
  ];

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16 rounded border border-blue">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* 1st row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 ">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Title</label>
              <input
                placeholder="Web Developer"
                {...register("jobTitle")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 rounded border border-blue"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Name</label>
              <input
                placeholder="Ex: Microsoft"
                {...register("companyName")}
                className="create-job-input rounded border border-blue"
              />
            </div>
          </div>

          {/* 2nd row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Minimum Salary</label>
              <input
                placeholder="$20k"
                {...register("minPrice")}
                className="create-job-input rounded border border-blue"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Maximum Salary</label>
              <input
                placeholder="$100k"
                {...register("maxPrice")}
                className="create-job-input rounded border border-blue"
              />
            </div>
          </div>

          {/* 3rd row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Salary Type</label>
              <select
                {...register("salaryType")}
                className="create-job-input rounded border border-blue"
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
                placeholder="Ex: New York"
                {...register("jobLocation")}
                className="create-job-input rounded border border-blue"
              />
            </div>
          </div>

          {/* 4th row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Posting Date</label>
              <input
                className="create-job-input rounded border border-blue"
                {...register("createdAt")}
                placeholder="Ex: 2024-11-03"
                type="date"
              />
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Experience Level</label>
              <select
                {...register("experienceLevel")}
                className="create-job-input rounded border border-blue"
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

          {/* 5th row */}
          <div className="">
            <label className="block mb-2 text-lg">Required Skill Sets:</label>
            <CreatableSelect
              className="create-job-input rounded bg-[#FAFAFA] py-4"
              value={selectedOption}
              onChange={setSelectedOption}
              options={options}
              isMulti
            />
          </div>

          {/* 5th row */}
          <div className="">
            <label className="block mb-2 text-lg">Category:</label>
            <CreatableSelect
              className="create-job-input rounded bg-[#FAFAFA] py-4"
              value={category}
              onChange={setCategory}
              options={categoryOptions}
              isMulti
            />
          </div>

          {/* 6th row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Logo</label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, "logo")}
                disabled={isUploadingLogo}
                className="create-job-input rounded border border-blue bg-white"
              />

              {isUploadingLogo && (
                <p className="mt-2 text-sm text-gray-500">
                  Uploading company logo...
                </p>
              )}

              {logoUrl && (
                <div className="mt-4">
                  <p className="text-sm text-green-600 mb-2">
                    Logo uploaded successfully
                  </p>

                  <img
                    src={logoUrl}
                    alt="Company logo preview"
                    className="w-24 h-24 object-contain border rounded bg-white p-2"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Post Image</label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, "postImage")}
                disabled={isUploadingPostImage}
                className="create-job-input rounded border border-blue bg-white"
              />

              {isUploadingPostImage && (
                <p className="mt-2 text-sm text-gray-500">
                  Uploading job image...
                </p>
              )}

              {postImageUrl && (
                <div className="mt-4">
                  <p className="text-sm text-green-600 mb-2">
                    Job image uploaded successfully
                  </p>

                  <img
                    src={postImageUrl}
                    alt="Job post preview"
                    className="max-w-xs max-h-48 object-cover border rounded bg-white"
                  />
                </div>
              )}
            </div>
          </div>

          {/* 7th row: Job Type */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Type</label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="create-job-input rounded border border-blue"
              >
                <option value="">Select Job Type</option>
                {jobTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="create-job-input rounded border border-blue"
              >
                <option value="">Select Category</option>
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div> */}
          </div>

          {/* 8th row: Job Description */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Description</label>
            <textarea
              className="w-full pl-3 py-1.5 focus:outline-none rounded border border-blue"
              rows={6}
              {...register("description")}
              // placeholder="job description"
              placeholder={
                "Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt."
              }
            />
          </div>

          {/* 9th row: Job Benefits */}
          <div className="w-full">
            <label className="block mb-2 text-lg">
              Job Benefits (one per line)
            </label>
            <textarea
              className="w-full pl-3 py-1.5 focus:outline-none rounded border border-blue"
              rows={3}
              onChange={handleBenefitsChange}
              placeholder="Enter each benefit on a new line"
            />
            <div className="mt-4">
              <label className="block mb-2 text-lg">Benefits List</label>
              <div className="pl-3">
                {benefitsList.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <span className="mr-2">{index + 1}.</span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 10th row: Growth Potential */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Growth Potential</label>
            <textarea
              className="w-full pl-3 py-1.5 focus:outline-none rounded border border-blue"
              rows={3}
              {...register("growthPotential")}
              placeholder="Describe the growth potential of the position"
            />
          </div>

          {/* 11th row: Additional Comments */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Additional Comments</label>
            <textarea
              className="w-full pl-3 py-1.5 focus:outline-none rounded border border-blue"
              rows={3}
              {...register("additionalComments")}
              placeholder="Any additional comments about the job"
            />
          </div>

          {/* last row */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Posted by</label>
            <input
              type="email"
              // value={user?.email}
              className="w-full pl-3 py-1.5 focus:outline-none rounded border border-blue"
              {...register("postedBy")}
              placeholder="your email"
            />
          </div>

          <input
            type="submit"
            className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
