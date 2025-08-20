import React, { useState } from "react";
import {
  Star,
  CheckCircle,
  Users,
  Award,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  Target,
  ArrowRight,
  Briefcase,
  TrendingUp,
  Heart,
  Globe,
  Code,
  Cpu,
  Wrench,
  Search,
  UserCheck,
  Building,
  BookOpen,
  MessageSquare,
  ExternalLink,
  Shield,
  Zap,
  FileText,
  Calendar,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
  });

  const toggleService = (serviceId) => {
    setActiveService(activeService === serviceId ? null : serviceId);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your inquiry! We'll get back to you within 24 hours.");
    setShowContactForm(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-WHITE">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white bg-opacity-20 text-WHITE px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4 mr-2" />
              Connecting Potential with Opportunity
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Empowering tech careers through potential-focused recruitment
            </p>
            <div className="bg-white text-black p-6 rounded-lg inline-block">
              <p className="text-lg font-medium">
                🌟 Prioritizing Growth Over Experience
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Serving South Africa & International Markets
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              SmileyJobs is dedicated to helping individuals, especially those
              entering the tech industry, find meaningful employment
              opportunities by connecting first-time tech applicants with
              employers who value growth and potential.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <Target className="w-8 h-8 mb-4 mx-auto text-blue-600 text-[#fbbf24]" />
                <h3 className="font-semibold text-lg mb-2 text-black">
                  Potential Over Experience
                </h3>
                <p className="text-gray-600 text-sm">
                  We believe in your ability to grow and learn, not just what's
                  on your CV
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <Users className="w-8 h-8 mb-4 mx-auto text-blue-600 text-[#fbbf24]" />
                <h3 className="font-semibold text-lg mb-2 text-black">
                  Meaningful Connections
                </h3>
                <p className="text-gray-600 text-sm ">
                  Strategic partnerships with companies that value growth-minded
                  candidates
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <Globe className="w-8 h-8 mb-4 mx-auto text-blue-600 text-[#fbbf24]" />
                <h3 className="font-semibold text-lg mb-2 text-black">
                  Global Reach
                </h3>
                <p className="text-gray-600 text-sm">
                  Based in Cape Town, serving South Africa and international
                  markets
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-slate-900">
              Our Core Services
            </h2>

            <div className="space-y-6">
              {/* Job Seeker Services */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-600 p-3 rounded-lg">
                      <Search className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      Job Seeker Services
                    </h3>
                  </div>
                  <button
                    onClick={() => toggleService("job-seekers")}
                    className="p-2 hover:bg-blue-200 rounded-full transition-colors"
                  >
                    {activeService === "job-seekers" ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <p className="text-gray-700 mb-4">
                  Comprehensive support for individuals seeking their first tech
                  role or transitioning into the industry.
                </p>

                {activeService === "job-seekers" && (
                  <div className="mt-6 grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg">
                      <UserCheck className="w-6 h-6 mb-3 text-blue-600" />
                      <h4 className="font-semibold mb-2">
                        Profile Development
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• User-friendly application process</li>
                        <li>• Portfolio optimization guidance</li>
                        <li>• Skill assessment and matching</li>
                        <li>• Personal brand development</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <Target className="w-6 h-6 mb-3 text-blue-600" />
                      <h4 className="font-semibold mb-2">Career Matching</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Potential-based job matching</li>
                        <li>• Entry-level opportunity alerts</li>
                        <li>• Growth-focused employer connections</li>
                        <li>• International placement support</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <BookOpen className="w-6 h-6 mb-3 text-blue-600" />
                      <h4 className="font-semibold mb-2">Career Guidance</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Industry insights and trends</li>
                        <li>• Interview preparation support</li>
                        <li>• Career path consultation</li>
                        <li>• Skills development recommendations</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <Shield className="w-6 h-6 mb-3 text-blue-600" />
                      <h4 className="font-semibold mb-2">Ongoing Support</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Post-placement follow-up</li>
                        <li>• Career progression support</li>
                        <li>• Professional development resources</li>
                        <li>• Community access and networking</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Employer Services */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-600 p-3 rounded-lg">
                      <Building className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      Employer Services
                    </h3>
                  </div>
                  <button
                    onClick={() => toggleService("employers")}
                    className="p-2 hover:bg-green-200 rounded-full transition-colors"
                  >
                    {activeService === "employers" ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <p className="text-gray-700 mb-4">
                  Strategic partnerships with companies that value potential and
                  growth over just experience.
                </p>

                {activeService === "employers" && (
                  <div className="mt-6 grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg">
                      <Users className="w-6 h-6 mb-3 text-green-600" />
                      <h4 className="font-semibold mb-2">Talent Sourcing</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Entry-level talent pipeline</li>
                        <li>• Potential-focused candidate screening</li>
                        <li>• Diverse candidate pool access</li>
                        <li>• International talent sourcing</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <Zap className="w-6 h-6 mb-3 text-green-600" />
                      <h4 className="font-semibent mb-2">Fast Recruitment</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Streamlined hiring process</li>
                        <li>• Quality candidate pre-screening</li>
                        <li>• Reduced time-to-hire metrics</li>
                        <li>• Efficient candidate management</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <Award className="w-6 h-6 mb-3 text-green-600" />
                      <h4 className="font-semibold mb-2">Employer Branding</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Growth-focused company positioning</li>
                        <li>• Talent attraction strategies</li>
                        <li>• Employer brand development</li>
                        <li>• Market presence enhancement</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <MessageSquare className="w-6 h-6 mb-3 text-green-600" />
                      <h4 className="font-semibold mb-2">Consultation</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Hiring strategy consultation</li>
                        <li>• Market insights and trends</li>
                        <li>• Compensation benchmarking</li>
                        <li>• Retention strategy guidance</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Specialized Tech Services */}
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-600 p-3 rounded-lg">
                      <Code className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      Tech Industry Focus
                    </h3>
                  </div>
                  <button
                    onClick={() => toggleService("tech-focus")}
                    className="p-2 hover:bg-purple-200 rounded-full transition-colors"
                  >
                    {activeService === "tech-focus" ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <p className="text-gray-700 mb-4">
                  Specialized expertise in tech, engineering, and computer
                  sector recruitment.
                </p>

                {activeService === "tech-focus" && (
                  <div className="mt-6 grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg text-center">
                      <Code className="w-8 h-8 mb-3 mx-auto text-purple-600" />
                      <h4 className="font-semibold mb-2">
                        Software Development
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1 text-left">
                        <li>• Junior Developer positions</li>
                        <li>• Full-stack opportunities</li>
                        <li>• Mobile app development</li>
                        <li>• Web development roles</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg text-center">
                      <Cpu className="w-8 h-8 mb-3 mx-auto text-purple-600" />
                      <h4 className="font-semibold mb-2">Tech Engineering</h4>
                      <ul className="text-sm text-gray-600 space-y-1 text-left">
                        <li>• Systems engineering</li>
                        <li>• DevOps and infrastructure</li>
                        <li>• Quality assurance testing</li>
                        <li>• Technical support roles</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg text-center">
                      <Wrench className="w-8 h-8 mb-3 mx-auto text-purple-600" />
                      <h4 className="font-semibold mb-2">Computer Sectors</h4>
                      <ul className="text-sm text-gray-600 space-y-1 text-left">
                        <li>• IT support specialists</li>
                        <li>• Data analysis positions</li>
                        <li>• Cybersecurity entry-level</li>
                        <li>• Network administration</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Salary Ranges & Market Insight */}
      {/* <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Market Insights & Opportunities
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-800 p-6 rounded-lg">
                <TrendingUp className="w-8 h-8 mb-4 text-blue-400" />
                <h3 className="font-semibold text-lg mb-4">Salary Ranges</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Test Analyst (Entry)</span>
                    <span className="font-medium text-blue-400">R35,000 - R65,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Junior Developer</span>
                    <span className="font-medium text-blue-400">R25,000 - R45,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">IT Support Specialist</span>
                    <span className="font-medium text-blue-400">R20,000 - R35,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">QA Tester</span>
                    <span className="font-medium text-blue-400">R30,000 - R50,000</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-4">
                  * Ranges vary based on experience and company size
                </p>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg">
                <MapPin className="w-8 h-8 mb-4 text-green-400" />
                <h3 className="font-semibold text-lg mb-4">Geographic Reach</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Cape Town (Primary Hub)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Johannesburg & Gauteng</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Durban & KwaZulu-Natal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Remote opportunities nationwide</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-400" />
                    <span>International placements</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Why Choose Us */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
              Why Choose SmileyJobs
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg border border-blue-200">
                <Heart className="w-8 h-8 mb-4 mx-auto text-red-500" />
                <h3 className="font-semibold text-lg mb-2 text-black">
                  Potential-Focused
                </h3>
                <p className="text-gray-600 text-sm">
                  We see your potential, not just your past. Perfect for career
                  starters and career changers.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-blue-200">
                <Zap className="w-8 h-8 mb-4 mx-auto text-yellow-500" />
                <h3 className="font-semibold text-lg mb-2  text-black">
                  User-Friendly
                </h3>
                <p className="text-gray-600 text-sm">
                  Straightforward application process designed to reduce anxiety
                  and increase success rates.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-blue-200">
                <Users className="w-8 h-8 mb-4 mx-auto text-blue-500 text-[#fbbf24]" />
                <h3 className="font-semibold text-lg mb-2  text-black">
                  Strategic Partnerships
                </h3>
                <p className="text-gray-600 text-sm">
                  Exclusive relationships with employers who actively seek fresh
                  talent and growth mindsets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12 text-slate-900">
              Success Stories
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-lg mb-4 text-gray-700">
                  "SmileyJobs helped me land my first developer role with no
                  prior experience. They saw my potential and connected me with
                  a company that values growth."
                </p>
                <p className="text-sm text-gray-600">
                  - Thabo M., Junior Full Stack Developer, Cape Town
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-lg mb-4 text-gray-700">
                  "After months of rejections elsewhere, SmileyJobs found me a
                  Test Analyst position. They understood that I was ready to
                  learn and grow."
                </p>
                <p className="text-sm text-gray-600">
                  - Sarah K., QA Test Analyst, Johannesburg
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              Ready to Start Your Tech Career?
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Whether you're a job seeker or employer, we're here to help you
              succeed
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-slate-800 p-6 rounded-lg">
                <Search className="w-8 h-8 mb-4 mx-auto text-blue-400" />
                <h3 className="font-semibold text-lg mb-2">Job Seekers</h3>
                <p className="text-gray-300 mb-4 text-sm">
                  Ready to launch your tech career? Let us help you find the
                  perfect opportunity.
                </p>
                <a
                  href="https://www.smileyjobs.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 border border-white text-white py-2 px-4 rounded-lg font-medium hover:bg-white hover:text-black transition-colors inline-flex items-center gap-2"
                >
                  Browse Jobs
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg">
                <Building className="w-8 h-8 mb-4 mx-auto text-green-400" />
                <h3 className="font-semibold text-lg mb-2">Employers</h3>
                <p className="text-gray-300 mb-4 text-sm">
                  Looking for fresh talent with growth potential? Partner with
                  us today.
                </p>
                <button
                  onClick={() => setShowContactForm(true)}
                  className="bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Partner With Us
                </button>
              </div>
            </div>

            <div className="bg-blue-600 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Follow Our Journey</h3>
              <p className="text-blue-100 mb-4 text-sm">
                Stay updated with the latest opportunities and success stories
              </p>
              <a
                href="https://www.instagram.com/smileyjobs"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                Follow on Instagram
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={() => setShowContactForm(false)}
              aria-label="Close"
              type="button"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold mb-2 text-slate-900 text-center">
              Partner With Us
            </h3>
            <p className="text-gray-600 mb-6 text-center text-sm">
              Fill in your details and we'll get in touch within 24 hours.
            </p>
            <form
              action="https://formbold.com/s/3wgvA"
              method="POST"
              encType="multipart/form-data"
              className="space-y-4"
            >
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  className="w-1/2 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  name="phone"
                  className="w-1/2 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Company / Organisation"
                name="company"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Subject"
                name="subject"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <textarea
                name="message"
                placeholder="How can we help you?"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                required
              />
              {/* <div className="flex items-center justify-between">
                <label className="block text-sm text-gray-500">
                  <span className="mr-2">Attach File:</span>
                  <input
                    type="file"
                    name="file"
                    className="inline-block"
                  />
                </label>
              </div> */}
              <button
                type="submit"
                className="bg-blue-600 text-black py-3 px-6 rounded-lg border border-black font-semibold hover:bg-blue-700 transition-colors w-full text-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
      <footer className="py-8 bg-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="font-semibold text-lg mb-4 text-blue-400">
                  SmileyJobs
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Connecting potential with opportunity in the tech industry.
                </p>
                <div className="flex items-center gap-4">
                  <a
                    href="https://www.smileyjobs.co/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.instagram.com/smileyjobs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4 text-green-400">
                  Quick Links
                </h3>
                <div className="space-y-2 text-sm">
                  <a
                    href="https://www.smileyjobs.co/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-300 hover:text-white transition-colors"
                  >
                    Browse Jobs
                  </a>
                  <a
                    href="https://www.smileyjobs.co/contact"
                    className="block text-gray-300 hover:text-white transition-colors text-left"
                  >
                    Contact Us
                  </a>
                  <a
                    href="#services"
                    className="block text-gray-300 hover:text-white transition-colors"
                  >
                    Our Services
                  </a>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4 text-purple-400">
                  Focus Areas
                </h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-purple-400" />
                    <span>Software Development</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-purple-400" />
                    <span>Tech Engineering</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-purple-400" />
                    <span>Computer Sectors</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-700 pt-8 text-center">
              <div className="flex items-center justify-center gap-4 mb-4 text-sm text-gray-400 flex-wrap">
                {/* <span>🌍 Based in Cape Town, South Africa</span> */}
                {/* <span>•</span> */}
                <span>🌐 Serving International Markets</span>
                <span>•</span>
                <span>💝 Potential Over Experience</span>
              </div>
              <p className="text-xs text-gray-500">
                © 2025 SmileyJobs.co. All rights reserved. Empowering tech
                careers through meaningful connections.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
