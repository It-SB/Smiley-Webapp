import React from "react";
import { Users } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-black">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center bg-slate-800 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Users className="w-4 h-4 mr-2" />
            Powered by Smiley Jobs & Skills Bureau
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            For First-Time Job Seekers & Learners
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-semibold">
            Land the Right Opportunity—Not Just Any Job
          </p>
          <div className="bg-slate-800 text-white p-6 rounded-lg inline-block">
            <p className="text-lg font-medium">
              Premium Workshop • R299 per learner
            </p>
            <p className="text-sm text-gray-300 mt-1">
              Secure payment via PayFast
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;