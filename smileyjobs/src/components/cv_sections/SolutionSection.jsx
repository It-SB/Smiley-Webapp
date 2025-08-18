import React from "react";
import { CheckCircle, Star, Target } from "lucide-react";

const SolutionSection = () => {
  const benefits = [
    {
      icon: CheckCircle,
      title: "Land a learnership or job that actually fits"
    },
    {
      icon: Star,
      title: "Stand out with a recruiter-ready CV and video pitch"
    },
    {
      icon: Target,
      title: "Apply for the right roles, for the right reasons"
    }
  ];

  return (
    <section className="py-16 bg-yellow-400 text-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            We're Changing That—For Good
          </h2>
          <p className="text-xl mb-8">
            This is not just another "how to write a CV" session. It's a
            premium workshop for young people and first-time job seekers who
            want to:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="bg-slate-800 text-white p-6 rounded-lg">
                  <IconComponent className="w-8 h-8 mb-4 mx-auto text-yellow-400" />
                  <p className="font-semibold">{benefit.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;