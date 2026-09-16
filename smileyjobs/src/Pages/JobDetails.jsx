import React, { useEffect, useState } from "react";
import { FiMapPin, FiShare2, FiClock, FiDollarSign } from "react-icons/fi";
import PageHeader from "../components/PageHeader";
import { useParams } from "react-router-dom";
import { FaBriefcase, FaRegBuilding } from "react-icons/fa6";
import Swal from "sweetalert2";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

/* Small presentational helpers -------------------------------------------- */

const Section = ({ title, children }) => (
  <section className="border-b border-blue/15 pb-8 last:border-0 last:pb-0">
    <h2 className="text-lg font-semibold text-primary mb-4">{title}</h2>
    {children}
  </section>
);

const MetaChip = ({ icon, children }) => (
  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
    {icon}
    {children}
  </span>
);

const SummaryRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 py-3">
    <span className="mt-0.5 text-blue">{icon}</span>
    <div className="min-w-0">
      <p className="text-xs text-primary/50">{label}</p>
      <p className="text-sm font-medium text-primary break-words">{value}</p>
    </div>
  </div>
);

const Skeleton = () => (
  <div className="mt-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 animate-pulse">
    <div className="space-y-6">
      <div className="h-40 rounded-xl bg-blue/10" />
      <div className="h-4 w-2/3 rounded bg-blue/10" />
      <div className="h-4 w-full rounded bg-blue/10" />
      <div className="h-4 w-5/6 rounded bg-blue/10" />
      <div className="h-56 rounded-xl bg-blue/10" />
    </div>
    <div className="h-64 rounded-xl bg-blue/10" />
  </div>
);

/* ------------------------------------------------------------------------- */

const JobDetails = () => {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);

        const docRef = doc(db, "Otherjobs", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setJob({ id: docSnap.id, ...docSnap.data() });
        } else {
          setJob(null);
        }
      } catch (error) {
        console.error("Error loading job:", error);
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchJob();
  }, [id]);

  // One short reveal once the job lands, rather than motion on every element.
  useEffect(() => {
    if (!loading && job) {
      const frame = requestAnimationFrame(() => setRevealed(true));
      return () => cancelAnimationFrame(frame);
    }
  }, [loading, job]);

  const handleJobApply = async (name, surname, phoneNumber) => {
    const subject =
      "Regarding " + (job?.jobTitle || "Job Application") + " Job Post";

    const body =
      `Hi ${job?.username || "Recruiter"},\n\n` +
      `I am interested in applying for this job.\n\n` +
      `Name: ${name} ${surname}\n` +
      `Phone Number: ${phoneNumber}`;

    const ccEmail = "recruite@skillsbureau.co.za";

    window.location.href = `mailto:${
      job?.postedBy || ""
    }?cc=${ccEmail}&subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleApplyClick = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Apply for this job",
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="First name">
        <input id="swal-input2" class="swal2-input" placeholder="Surname">
        <input id="swal-input3" class="swal2-input" placeholder="Phone number">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Continue",
      preConfirm: () => {
        const name = document.getElementById("swal-input1").value.trim();
        const surname = document.getElementById("swal-input2").value.trim();
        const phoneNumber = document.getElementById("swal-input3").value.trim();

        if (!name || !surname || !phoneNumber) {
          Swal.showValidationMessage("Fill in all three fields to continue");
          return;
        }

        return [name, surname, phoneNumber];
      },
    });

    if (formValues) {
      const [name, surname, phoneNumber] = formValues;
      handleJobApply(name, surname, phoneNumber);
    }
  };

  const handleShareJob = async () => {
    const jobUrl = `${window.location.origin}/jobs/${id}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: job?.jobTitle || "Job Opportunity",
          text: `Check out this job opportunity: ${job?.jobTitle || "Job"}`,
          url: jobUrl,
        });
      } else {
        await navigator.clipboard.writeText(jobUrl);

        Swal.fire({
          icon: "success",
          title: "Link copied",
          text: "The job link is on your clipboard.",
          timer: 1800,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Failed to share job:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
        <PageHeader title="Job Details Page" path="Job" />
        <Skeleton />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
        <PageHeader title="Job Details Page" path="Job" />

        <div className="mt-10 mb-20 rounded-xl border border-blue/20 px-6 py-20 text-center">
          <h2 className="text-2xl font-semibold mb-2">Job not found</h2>
          <p className="text-primary/70 mb-6">
            This post was removed or the link is out of date.
          </p>
          <a
            href="/"
            className="inline-block rounded-md bg-blue px-6 py-2.5 text-white transition hover:opacity-90"
          >
            Browse open jobs
          </a>
        </div>
      </div>
    );
  }

  /* NORMALISE DATA -------------------------------------------------------- */

  const skills = Array.isArray(job.skills)
    ? job.skills.filter((skill) => skill !== null && String(skill).trim() !== "")
    : typeof job.skills === "string" && job.skills.trim()
    ? [job.skills.trim()]
    : [];

  const benefits = Array.isArray(job.benefits)
    ? job.benefits.filter(
        (benefit) => benefit !== null && String(benefit).trim() !== ""
      )
    : typeof job.benefits === "string" && job.benefits.trim()
    ? job.benefits
        .split("\n")
        .map((benefit) => benefit.trim())
        .filter(Boolean)
    : [];

  const description =
    typeof job.description === "string" && job.description.trim()
      ? job.description.trim()
      : typeof job.desc === "string" && job.desc.trim()
      ? job.desc.trim()
      : "";

  const additionalComments =
    typeof job.additionalComments === "string"
      ? job.additionalComments.trim()
      : "";

  const growthPotential =
    typeof job.growthPotential === "string" ? job.growthPotential.trim() : "";

  const hasSkills = skills.length > 0;
  const hasBenefits = benefits.length > 0;
  const hasDescription = Boolean(description);
  const hasAdditionalComments = Boolean(additionalComments);
  const hasGrowthPotential = Boolean(growthPotential);

  const jobTitle =
    typeof job.jobTitle === "string" && job.jobTitle.trim()
      ? job.jobTitle.trim()
      : "";

  const jobLocation =
    typeof job.jobLocation === "string" && job.jobLocation.trim()
      ? job.jobLocation.trim()
      : "";

  const jobType =
    typeof job.jobType === "string" && job.jobType.trim()
      ? job.jobType.trim()
      : "";

  /* SALARY ---------------------------------------------------------------- */

  let salaryText = "";

  const hasMinPrice =
    job.minPrice !== undefined &&
    job.minPrice !== null &&
    String(job.minPrice).trim() !== "";

  const hasMaxPrice =
    job.maxPrice !== undefined &&
    job.maxPrice !== null &&
    String(job.maxPrice).trim() !== "";

  const salarySuffix = job.salaryType ? ` ${job.salaryType}` : "";

  if (hasMinPrice && hasMaxPrice) {
    salaryText = `${job.minPrice} - ${job.maxPrice}${salarySuffix}`;
  } else if (hasMinPrice) {
    salaryText = `${job.minPrice}${salarySuffix}`;
  } else if (hasMaxPrice) {
    salaryText = `${job.maxPrice}${salarySuffix}`;
  } else if (job.range) {
    salaryText = String(job.range).trim();
  }

  const hasSalary = Boolean(salaryText);

  /* IMAGES ---------------------------------------------------------------- */

  const companyLogo =
    typeof job.companyLogo === "string" && job.companyLogo.trim()
      ? job.companyLogo.trim()
      : "";

  const postImage =
    typeof job.postImage === "string" && job.postImage.trim()
      ? job.postImage.trim()
      : "";

  const companyName =
    typeof job.companyName === "string" && job.companyName.trim()
      ? job.companyName.trim()
      : "";

  const hasBody =
    hasDescription ||
    hasSkills ||
    hasBenefits ||
    hasGrowthPotential ||
    hasAdditionalComments ||
    Boolean(postImage);

  const reveal = `transition-all duration-500 ease-out ${
    revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
  }`;

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <PageHeader title="Job Details Page" path="Job" />

      <div className={`mt-10 mb-20 ${reveal}`}>
        {/* HERO ------------------------------------------------------------ */}

        <header className="rounded-2xl bg-blue px-6 py-8 sm:px-10 sm:py-10 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            {companyLogo && (
              <img
                src={companyLogo}
                alt={companyName || "Company logo"}
                className="h-20 w-20 shrink-0 rounded-xl bg-white object-contain p-2"
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            )}

            <div className="min-w-0 space-y-4">
              {companyName && (
                <p className="text-sm text-white/70">{companyName}</p>
              )}

              <h1 className="text-3xl sm:text-4xl font-semibold leading-tight tracking-tight">
                {jobTitle || "Job opportunity"}
              </h1>

              <div className="flex flex-wrap gap-2">
                {jobLocation && (
                  <MetaChip icon={<FiMapPin />}>{jobLocation}</MetaChip>
                )}
                {jobType && (
                  <MetaChip icon={<FaBriefcase />}>{jobType}</MetaChip>
                )}
                {hasSalary && (
                  <MetaChip icon={<FiDollarSign />}>{salaryText}</MetaChip>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            {job.postedBy && (
              <button
                onClick={handleApplyClick}
                className="rounded-md bg-white px-8 py-3 font-medium text-blue transition duration-200 hover:bg-white/90 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Apply now
              </button>
            )}

            <button
              onClick={handleShareJob}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/40 px-8 py-3 font-medium text-white transition duration-200 hover:bg-white/10 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <FiShare2 />
              Share job
            </button>
          </div>
        </header>

        {/* BODY ------------------------------------------------------------ */}

        {hasBody && (
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-10 lg:gap-14 items-start">
            <main className="space-y-10">
              {postImage && (
                <figure className="overflow-hidden rounded-xl border border-blue/20">
                  <img
                    src={postImage}
                    alt={jobTitle || "Job post"}
                    className="w-full max-h-[480px] object-cover transition duration-500 hover:scale-[1.02]"
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.parentElement.style.display = "none";
                    }}
                  />
                </figure>
              )}

              {hasDescription && (
                <Section title="About the role">
                  <p className="max-w-[68ch] whitespace-pre-line leading-relaxed text-primary/80">
                    {description}
                  </p>
                </Section>
              )}

              {hasSkills && (
                <Section title="Skills you'll need">
                  <ul className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <li
                        key={index}
                        className="rounded-full border border-blue/30 bg-blue/5 px-4 py-1.5 text-sm text-primary/80"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

              {hasBenefits && (
                <Section title="What you get">
                  <ul className="max-w-[68ch] space-y-3">
                    {benefits.map((benefit, index) => (
                      <li
                        key={index}
                        className="flex gap-3 leading-relaxed text-primary/80"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

              {hasGrowthPotential && (
                <Section title="Where this role can lead">
                  <p className="max-w-[68ch] whitespace-pre-line leading-relaxed text-primary/80">
                    {growthPotential}
                  </p>
                </Section>
              )}

              {hasAdditionalComments && (
                <Section title="Good to know">
                  <p className="max-w-[68ch] whitespace-pre-line leading-relaxed text-primary/80">
                    {additionalComments}
                  </p>
                </Section>
              )}
            </main>

            {/* SUMMARY RAIL ------------------------------------------------ */}

            <aside className="lg:sticky lg:top-24">
              <div className="rounded-xl border border-blue/20 p-6">
                <h2 className="text-sm font-semibold text-primary mb-2">
                  Job summary
                </h2>

                <div className="divide-y divide-blue/10">
                  {hasSalary && (
                    <SummaryRow
                      icon={<FiDollarSign />}
                      label="Salary"
                      value={salaryText}
                    />
                  )}
                  {jobType && (
                    <SummaryRow
                      icon={<FiClock />}
                      label="Job type"
                      value={jobType}
                    />
                  )}
                  {jobLocation && (
                    <SummaryRow
                      icon={<FiMapPin />}
                      label="Location"
                      value={jobLocation}
                    />
                  )}
                  {companyName && (
                    <SummaryRow
                      icon={<FaRegBuilding />}
                      label="Company"
                      value={companyName}
                    />
                  )}
                </div>

                {job.postedBy && (
                  <button
                    onClick={handleApplyClick}
                    className="mt-6 w-full rounded-md bg-blue px-6 py-3 font-medium text-white transition duration-200 hover:opacity-90 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
                  >
                    Apply now
                  </button>
                )}
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;