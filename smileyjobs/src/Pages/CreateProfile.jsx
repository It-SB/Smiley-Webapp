import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { db } from "../firebase/firebase.config"; // Adjust import path if needed
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useUser } from "@clerk/clerk-react";

const CreateUserProfile = () => {
  const { user } = useUser();
  const [selectedOption, setSelectedOption] = useState([]);
  const [benefitsList, setBenefitsList] = useState([]);
  const [preferredWorkModel, setPreferredWorkModel] = useState([]);
  const [salaryBrackets, setSalaryBrackets] = useState([]);

  const handlePreferredWorkModelChange = (value) => {
    setPreferredWorkModel((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value]
    );
  };

  const handleSalaryBracketsChange = (value) => {
    setSalaryBrackets((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value]
    );
  };
  const [selectedCurrency, setselectedCurrency] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [category, setCategory] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [showGenderPopup, setShowGenderPopup] = useState(false);
  const [showLocationPopup, setShowLocationPopup] = useState(false);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  // Fetch categories from Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "Catergory"));
      const categoriesFromDb = querySnapshot.docs.map((doc) => ({
        value: doc.id,
        label: doc.data().name,
      }));
      setCategoryOptions(categoriesFromDb);
    };

    fetchCategories();
  }, []);

  const onSubmit = async (data) => {
    data.skills = selectedOption.map((option) => option.value); // Convert skills to an array of strings
    data.benefits = benefitsList;
    data.preferredWorkModel = preferredWorkModel; // Add preferredWorkModel to the data
    data.category = category?.value || ""; // Add category to the data
    data.salaryBrackets = salaryBrackets; // Add salary bracket to the data
    data.selectedCurrency = selectedCurrency; // Add selectedCurrency to the data

    try {
      console.log("Data before adding:", data);
      const jobsCollection = collection(db, "UserPost"); // Reference to 'UserPost' collection
      await addDoc(jobsCollection, data);
      alert("Profile Created Successfully!!");
      reset(); // Reset the form
      setSelectedOption([]); // Clear selected skills
      setBenefitsList([]); // Clear benefits list
      setPreferredWorkModel([]); // Clear job type selection
      setSalaryBrackets([]); // Clear salary bracket selection
      setCategory(null); // Clear category selection
    } catch (error) {
      console.error("Error creating profile:", error);
      alert("Error creating profile. Please try again.");
    }
  };

  const preferredWorkModelOptions = [
    { value: "Remote", label: "Remote" },
    { value: "Hybrid", label: "Hybrid" },
    { value: "On-site", label: "On-site" },
  ];

  const salaryTypeOptions = [
    { value: "Less than 50 000", label: "Less than 50 000" },
    { value: "50 000 - 100 000", label: "50 000 - 100 000" },
    { value: "More than 100 000", label: "More than 100 000" },
  ];

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="bg-[#fafafa] rounded py-10 px-4 lg:px-16 border border-blue mb-2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* 1st row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">
                Full Name and Surname
              </label>
              <input
                placeholder="John Smith"
                {...register("name")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 border border-blue rounded"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Email</label>
              <input
                type="email"
                value={user?.email}
                className="w-full pl-3 py-1.5 focus:outline-none border border-blue rounded"
                {...register("email")}
                placeholder="Johnsmith@example.com"
              />
            </div>
          </div>

          {/* 2nd row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Ethnicity</label>
              <select
                {...register("ethnicity")}
                className="create-job-input border border-blue rounded"
              >
                <option value="African">African</option>
                <option value="Asian">Asian</option>
                <option value="Caucasian">Caucasian</option>
                <option value="Hispanic">Hispanic</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Gender</label>
              <select
                {...register("gender")}
                onChange={handleGenderChange}
                className="create-job-input border border-blue rounded"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* 3rd row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Current Location</label>
              <select
                {...register("selectedLocation")}
                onChange={handleLocationChange}
                className="create-job-input border border-blue rounded"
              >
                <option value="None selected">Select A Country</option>
                <option value="South Africa">South Africa</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="European Union">European Union</option>
                <option value="Australia">Australia</option>
              </select>
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">
                Are You Willing To Relocate
              </label>
              <select
                {...register("relocate")}
                className="create-job-input border border-blue rounded"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          {/* 4th row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Phone Number</label>
              <input
                type="text"
                placeholder="123 456 7890"
                {...register("phone")}
                className="create-job-input border border-blue rounded"
              />
            </div>
          </div>

          {/* 5th row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Current Address</label>
              <input
                type="text"
                placeholder="eg: 13 Lower Road Morningside, Sandton"
                {...register("address")}
                className="create-job-input border border-blue rounded"
              />
            </div>
          </div>

          {/* 6th row: Job Type */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">
                Select Your Career Field
              </label>
              <CreatableSelect
                className="create-job-input p-4 rounded bg-[#fafafa]"
                value={category}
                onChange={setCategory}
                options={categoryOptions}
              />
            </div>
          </div>

          {/* 7th row: Preferred Work Model */}
          <div className="w-full">
            <label className="block mb-2 text-lg">
              Preferred Work Model 
            </label>
            <div className="flex items-center gap-5">
              {preferredWorkModelOptions.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={option.value}
                    onChange={() =>
                      handlePreferredWorkModelChange(option.value)
                    }
                    checked={preferredWorkModel.includes(option.value)}
                    className="focus:ring-0"
                  />
                  <label>{option.label}</label>
                </div>
              ))}
            </div>
          </div>

          {/* 8th row: Salary Bracket */}
          <div className="w-full">
            <label className="block mb-2 text-lg">
              Salary Bracket 
            </label>
            <div className="flex items-center gap-5">
              {salaryTypeOptions.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={option.value}
                    onChange={() => handleSalaryBracketsChange(option.value)}
                    checked={salaryBrackets.includes(option.value)}
                    className="focus:ring-0"
                  />
                  <label>{option.label}</label>
                </div>
              ))}
            </div>
          </div>

          {/* 9th row */}
          <div className="lg:w-1/2 w-full">
            <label className="block mb-2 text-lg">
              Select A selected Currency
            </label>
            <select
              {...register("selectedselectedCurrency")}
              onChange={(e) => setselectedCurrency(e.target.value)}
              className="create-job-input border border-blue rounded"
            >
              <option value="None selected">Select A selectedCurrency</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="ZAR">ZAR</option>
              <option value="AUD">AUD</option>
            </select>
          </div>

          <input
            type="submit"
            className="block mt-12 bg-blue border border-white text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateUserProfile;
