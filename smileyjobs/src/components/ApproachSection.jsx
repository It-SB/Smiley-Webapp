import { useState } from "react";
import { InfoModal } from "./InfoModal";

const approachItems = [
  {
    title: "Live Pulse",
    description:
      "Gain real-time insights into workforce dynamics to make agile, data-driven decisions that keep your business ahead.",
  },
  {
    title: "Life-Long Career Development",
    description:
      "Support ongoing career growth with personalized development tools and continuous learning opportunities for candidates.",
  },
  {
    title: "Alignment And Transparency",
    description:
      "Maintain clear communication of role expectations and hiring outcomes to build trust between candidates and employers.",
  },
  {
    title: "Cultural Fit",
    description:
      "Focus on connecting talent that truly embodies your company’s core values and mission, ensuring long-term success.",
  },
  {
    title: "Talent Pool",
    description:
      "Access a diverse and constantly refreshed database of qualified professionals ready to meet your staffing needs.",
  },
  {
    title: "Quality Assurance",
    description:
      "Apply rigorous standards and quality controls to guarantee excellence in every placement and recruitment process.",
  },
  {
    title: "Risk Absorption",
    description:
      "We mitigate hiring risks and streamline onboarding, reducing your operational burden and ensuring smooth transitions.",
  },
  {
    title: "Payment Terms",
    description:
      "Enjoy flexible, client-friendly payment options tailored to suit your budget and recruitment timelines.",
  },
];

export const ApproachSection = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <section className="bg-[#001B38] py-16 text-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-12">Our Approach</h2>

      <div className="relative w-full max-w-5xl mx-auto flex justify-center items-center">
        <div className=" text-[#001B38] rounded-full w-48 h-48 flex items-center justify-center font-bold text-xl shadow-md z-10">
          {/* smiley <br /> JOBS */}
        </div>

        <div className="absolute inset-0 flex flex-wrap justify-center items-center gap-6">
          {approachItems.map((item, i) => (
            <button
              key={i}
              onClick={() => setSelectedItem(item)}
              className="bg-[#001B38] text-white px-4 py-2 rounded-full border border-white shadow-md hover:scale-105 transition-transform"
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      {selectedItem && (
        <InfoModal
          isOpen={true}
          onClose={() => setSelectedItem(null)}
          title={selectedItem.title}
          description={selectedItem.description}
        />
      )}
    </section>
  );
};
