import React from "react";

const ProblemSection = () => {
  const problems = [
    "Apply everywhere, hoping something sticks (\"spray and pray\")",
    "Use generic, weak CVs and application emails",
    "Don't know how to show real motivation or the right attitude",
    "Miss out because they can't tell their story confidently"
  ];

  return (
    <section className="py-16 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Why Do Most First-Time Applicants Struggle?
          </h2>
          <p className="text-xl mb-8 text-center text-gray-300">
            It's not just about qualifications. Most learners and job seekers:
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {problems.map((problem, index) => (
              <div key={index} className="bg-slate-800 p-6 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <p>{problem}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-red-900 border-l-4 border-red-500 p-6 rounded-lg">
            <p className="text-lg font-semibold">
              <strong>Result?</strong> They disappear into the pile—or end up
              in roles that don't suit them or their future.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;