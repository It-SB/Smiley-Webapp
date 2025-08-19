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
    <section className="bg-[#001B38] py-12 px-4 text-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Approach</h2>

      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Central logo or icon */}
        

        {/* Responsive grid for approach items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
          {approachItems.map((item, i) => (
            <button
              key={i}
              onClick={() => setSelectedItem(item)}
              className="bg-[#003366] hover:bg-[#00509e] text-white px-5 py-4 rounded-2xl border border-white/20 shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#00bfff] text-base font-semibold min-h-[90px] flex items-center justify-center text-center"
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
