import React from "react";
import { Button } from "@relume_io/relume-ui";

const solutions = [
  {
    name: "Permanent Placements",
    image: {
      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
      alt: "Permanent Placements",
    },
    summary:
      "Connecting you with top-tier talent for your permanent hiring needs.",
    details:
      "We specialize in sourcing, screening, and placing candidates who not only meet the technical requirements but also align with your company culture, ensuring long-term success.",
  },
  {
    name: "Contracting",
    image: {
      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
      alt: "Contracting",
    },
    summary:
      "Providing skilled contract professionals to meet your short-term and project-based demands.",
    details:
      "Our flexible contracting solutions allow you to quickly access experienced talent for defined periods, helping you manage workload fluctuations and special projects efficiently.",
  },
  {
    name: "Executive Search",
    image: {
      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
      alt: "Executive Search",
    },
    summary:
      "Identifying and attracting exceptional leaders for your key executive roles.",
    details:
      "Through a discreet and targeted search process, we connect your organization with senior-level candidates who have the vision and expertise to drive your business forward.",
  },
  {
    name: "Payroll",
    image: {
      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
      alt: "Payroll",
    },
    summary:
      "Simplifying your payroll process for timely and compliant employee payments.",
    details:
      "Our payroll service ensures accurate processing, compliance with tax regulations, and confidentiality, freeing your HR team to focus on strategic priorities.",
  },
  {
    name: "HR Software",
    image: {
      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
      alt: "HR Software",
    },
    summary:
      "Cutting-edge HR technology to streamline recruitment and employee management.",
    details:
      "Our software solutions integrate recruitment, onboarding, performance management, and reporting to enhance efficiency and employee experience.",
  },
  {
    name: "EEA Reporting",
    image: {
      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
      alt: "EEA Reporting",
    },
    summary:
      "Supporting your compliance with Employment Equity Act through precise reporting.",
    details:
      "We assist with data gathering, analysis, and submission to help your organization meet regulatory standards and foster an inclusive workplace.",
  },
  {
    name: "Multi-Hire",
    image: {
      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
      alt: "Multi-Hire",
    },
    summary:
      "Efficient recruitment solutions for filling multiple positions simultaneously.",
    details:
      "Our multi-hire service accelerates bulk hiring processes without compromising on candidate quality, ideal for rapid scaling or seasonal workforce needs.",
  },
  {
    name: "Career Development",
    image: {
      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
      alt: "Career Development",
    },
    summary:
      "Empowering employees with tailored growth and skill enhancement programs.",
    details:
      "We offer coaching, training workshops, and mentoring to help individuals advance their careers while contributing more effectively to your organization.",
  },
];

const footer = {
  //   heading: "Ready to transform your business?",
  description:
    "Contact us today to learn more about our solutions and how we can help you achieve your goals.",
  button: { title: "Get in Touch", variant: "secondary", link: "/contact" },
};
export const SolutionsPage = (props) => {
  const { tagline, heading, description } = {
    tagline: "Our Solutions",
    heading: "Empowering Your Success",
    description:
      "Discover how our innovative solutions can transform your business and drive growth.",
    ...props,
  };

  return (
    <section id="solutions" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4 lg:text-5xl">{tagline}</p>
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-5xl">
            {heading}
          </h2>
          {/* <p className="md:text-md">{description}</p> */}
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          {solutions.map((solution, index) => (
            <SolutionCard key={index} solution={solution} />
          ))}
        </div>

        <div className="mx-auto mt-14 w-full max-w-md text-center md:mt-20 lg:mt-24">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            {footer.heading}
          </h4>
          <p className="md:text-md">{footer.description}</p>
          <div className="mt-6 flex items-center justify-center gap-x-4 text-center md:mt-8">
            {footer.button.link ? (
              <a
                href={footer.button.link}
                className="inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button {...footer.button}>{footer.button.title}</Button>
              </a>
            ) : (
              <Button {...footer.button}>{footer.button.title}</Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const SolutionCard = ({ solution }) => {
  return (
    <div className="flex flex-col text-center">
      <div className="mb-5 flex w-full items-center justify-center md:mb-6">
        {/* <img
          src={solution.image.src}
          alt={solution.image.alt}
          className="h-20 w-20 rounded-full object-cover"
        /> */}
      </div>
      <div className="mb-3 md:mb-4">
        <h5 className="text-md font-semibold md:text-lg">{solution.name}</h5>
        {/* <p className="font-medium text-sm md:text-md">{solution.summary}</p> */}
      </div>
      <p>{solution.details}</p>
    </div>
  );
};
