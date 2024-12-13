import {
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiMapPin,
  FiSearch,
} from "react-icons/fi";
import { Link } from "react-router-dom";

// Helper function to truncate text to a specific number of words
const truncateDescription = (description, maxLength) => {
  // Provide a fallback value if description is undefined or null
  if (!description) return "";

  return description.length > maxLength
    ? description.split(" ").slice(0, maxLength).join(" ") + "..."
    : description;
};

const Card = ({ data }) => {
  const {
    id,
    description,
    postedBy,
    jobTitle,
    minPrice,
    maxPrice,
    category, // Assuming category is an array now
    userImage,
    userName,
    jobLocation,
    createdAt,
    companyLogo,
  } = data;

  return (
    <div>
      <section className="card border border-blue hover:shadow-yellow-300 backdrop-blur-sm bg-white/55 rounded shadow-2xl shadow-yellow-300/15">
        <Link
          to={`/jobs/${id}`}
          className="flex gap-4 flex-col sm:flex-row items-start"
        >
          <img
            src={companyLogo || "/Smiley Jobs Logo.png"}
            alt={jobTitle || "Company Logo"}
            className="w-16 h-16 mb-4 object-cover"
          />
          <div className="card-details">
            {/* Display categories as a comma-separated list */}
            <h4 className="text-primary mb-1">
              {Array.isArray(category) ? category.join(', ') : category}
            </h4>
            <h3 className="text-lg font-semibold mb-2">{jobTitle}</h3>

            <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
              <span className="flex items-center gap-2">
                <FiMapPin /> {jobLocation}{" "}
              </span>
              <span className="flex items-center gap-2">
                {minPrice} - {maxPrice}
              </span>
              <span className="flex items-center gap-2">
                <FiCalendar /> {createdAt}
              </span>
            </div>

            <p className="text-base text-primary/70">
              {truncateDescription(description, 20)}
            </p>
          </div>
        </Link>
      </section>
    </div>
  );
};

export default Card;
