import React from "react";
import { CheckCircle, Users, Award } from "lucide-react";

const TrustSection = () => {
  const trustPoints = [
    {
      icon: CheckCircle,
      title: "Our learners get interviews and finish programmes"
    },
    {
      icon: Users,
      title: "Fewer dropouts, more success stories"
    },
    {
      icon: Award,
      title: "Build a reputation for quality, not quantity"
    }
  ];

  return (
    <section className="py-16 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Why Training Providers Trust Us
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {trustPoints.map((point, index) => {
              const IconComponent = point.icon;
              return (
                <div key={index} className="bg-slate-800 p-6 rounded-lg">
                  <IconComponent className="w-8 h-8 mb-4 mx-auto text-yellow-400" />
                  <p className="font-semibold">{point.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;