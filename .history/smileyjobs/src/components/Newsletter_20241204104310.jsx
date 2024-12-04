import React, { useState, useEffect } from "react";
import { FaEnvelopeOpenText, FaRocket } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";
import {
  db,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "../firebase/firebase.config.js";
import { Link } from "react-router-dom";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const checkEmailExists = async () => {
      if (email) {
        const q = query(
          collection(db, "Subscribers"),
          where("email", "==", email)
        );
        const querySnapshot = await getDocs(q);
        setIsSubscribed(!querySnapshot.empty);
      }
    };

    checkEmailExists();
  }, [email]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (email && !isSubscribed) {
      try {
        await addDoc(collection(db, "Subscribers"), { email });
        alert("Subscription successful!");
        setIsSubscribed(true);
        setEmail(""); // Clear the input field
      } catch (error) {
        console.error("Error adding document: ", error);
        alert("Subscription failed. Please try again.");
      }
    }
  };

  const handleResumeUpload = () => {
    // Create the iframe
    const iframe = document.createElement("iframe");
    iframe.src = "https://it-sb.github.io/SmileyUpload/";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
  
    // Create the modal container
    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "50vw";
    modal.style.height = "50vh";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    modal.style.backdropFilter = "blur(10px)"; // Blurred background
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.zIndex = "1000";
  
    // Create a container for the iframe
    const iframeContainer = document.createElement("div");
    iframeContainer.style.width = "80%"; // Adjust as needed
    iframeContainer.style.height = "80%"; // Adjust as needed
    iframeContainer.style.backgroundColor = "#ffffff"; // White background for the iframe
    iframeContainer.style.borderRadius = "10px"; // Rounded corners
    iframeContainer.style.overflow = "hidden";
    iframeContainer.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.3)";
  
    iframeContainer.appendChild(iframe);
    modal.appendChild(iframeContainer);
  
    // Append the modal to the body
    document.body.appendChild(modal);
  
    // Close modal on click outside the iframe container
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        document.body.removeChild(modal);
      }
    });
  };
  
  

  return (
    <div>
      <div className="">
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <MdAccountCircle /> Create A Profile
        </h3>
        <p className="text-primary/75 text-base mb-4">
          Create a profile and access personalised job opportunities, aligned to
          your career aspirations.
        </p>
        <p className="text-primary/75 text-base mb-4">
          Get notified on new job opportunities in your niche.
        </p>
        <p className="text-primary/75 text-base mb-4">
          Upload your Resume and key information to be well positioned every
          opportunity you apply for…
        </p>
        <div className="w-full space-y-4">
          <Link to={`/create-profile`}>
            <input
              type="button"
              value="Create Profile"
              className="w-full block py-2 bg-blue rounded-sm text-white cursor-pointer font-semibold"
            />
          </Link>
        </div>
      </div>

      <div className="mt-20">
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaRocket /> Boost Your Visibility
        </h3>
        <p className="text-primary/75 text-base mb-4">
          Upload your Resume and our team will keep you in our database to be
        </p>

        <p className="text-primary/75 text-base mb-4">
          considered for employment opportunities in line with your career path.
        </p>
        <div className="w-full space-y-4">
          <input
            type="button"
            value="Upload Your Resume"
            onClick={handleResumeUpload}
            className="w-full block py-2 bg-blue rounded-sm text-white cursor-pointer font-semibold"
          />
        </div>
      </div>

      {!isSubscribed && (
        <div className="mt-20">
          <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
            <FaEnvelopeOpenText /> Subscribe for Job Alerts
          </h3>
          <p className="text-primary/75 text-base mb-4">
            Not ready to create a profile, or upload your Resume?
          </p>
          <p className="text-primary/75 text-base mb-4">
            Stay updated with the latest job opportunities by subscribing to our
            email notifications.
          </p>
          <p className="text-primary/75 text-base mb-4">
            Never miss a chance to advance your career.
          </p>
          <form onSubmit={handleEmailSubmit} className="w-full space-y-4 ">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="w-full block py-2 pl-3 border border-blue focus:outline-none"
            />
            <input
              type="submit"
              value="Subscribe"
              className="w-full block py-2 bg-blue rounded-sm text-white cursor-pointer font-semibold"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default Newsletter;
