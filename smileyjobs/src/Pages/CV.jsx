import React, { useState } from 'react';
import { Star, CheckCircle, Users, Award, Clock, MapPin, Phone, Mail, User, Target, ArrowRight, Play, Download } from 'lucide-react';

export default function JobSeekersLanding() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    lookingFor: '',
    careerGoals: ''
  });

  const [showBooking, setShowBooking] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if all required fields are filled
    if (formData.name && formData.email && formData.phone && formData.age && formData.lookingFor && formData.careerGoals) {
      setShowBooking(true);
    } else {
      alert('Please fill in all fields before submitting.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-black">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-black text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Users className="w-4 h-4 mr-2" />
              Powered by Smiley Jobs & Skills Bureau
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              For First-Time Job Seekers & Learners
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-semibold">
              Land the Right Opportunity—Not Just Any Job
            </p>
            <div className="bg-black text-white p-6 rounded-lg inline-block">
              <p className="text-lg font-medium">Premium Workshop • R299 per learner</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
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
              <div className="bg-slate-800 p-6 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <p>Apply everywhere, hoping something sticks ("spray and pray")</p>
                </div>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <p>Use generic, weak CVs and application emails</p>
                </div>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <p>Don't know how to show real motivation or the right attitude</p>
                </div>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <p>Miss out because they can't tell their story confidently</p>
                </div>
              </div>
            </div>
            <div className="bg-red-900 border-l-4 border-red-500 p-6 rounded-lg">
              <p className="text-lg font-semibold">
                <strong>Result?</strong> They disappear into the pile—or end up in roles that don't suit them or their future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 bg-yellow-400 text-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              We're Changing That—For Good
            </h2>
            <p className="text-xl mb-8">
              This is not just another "how to write a CV" session. It's a premium workshop for young people and first-time job seekers who want to:
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-black text-white p-6 rounded-lg">
                <CheckCircle className="w-8 h-8 mb-4 mx-auto text-yellow-400" />
                <p className="font-semibold">Land a learnership or job that actually fits</p>
              </div>
              <div className="bg-black text-white p-6 rounded-lg">
                <Star className="w-8 h-8 mb-4 mx-auto text-yellow-400" />
                <p className="font-semibold">Stand out with a recruiter-ready CV and video pitch</p>
              </div>
              <div className="bg-black text-white p-6 rounded-lg">
                <Target className="w-8 h-8 mb-4 mx-auto text-yellow-400" />
                <p className="font-semibold">Apply for the right roles, for the right reasons</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-slate-900">
              What You'll Learn & Get:
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-yellow-400">
                <Award className="w-8 h-8 mb-4 text-yellow-500" />
                <h3 className="font-bold text-lg mb-2">CV Masterclass</h3>
                <p className="text-gray-700">Craft your first real, recruiter-approved CV using SA templates and best practices</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-yellow-400">
                <Target className="w-8 h-8 mb-4 text-yellow-500" />
                <h3 className="font-bold text-lg mb-2">Purposeful Application Strategy</h3>
                <p className="text-gray-700">Research and target opportunities that fit your interests, geography, and potential</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-yellow-400">
                <Mail className="w-8 h-8 mb-4 text-yellow-500" />
                <h3 className="font-bold text-lg mb-2">Motivational Letter & Email Skills</h3>
                <p className="text-gray-700">Write short, authentic letters that show why you want this role</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-yellow-400">
                <Play className="w-8 h-8 mb-4 text-yellow-500" />
                <h3 className="font-bold text-lg mb-2">Video Pitch Confidence</h3>
                <p className="text-gray-700">Record a short, winning video intro—even if you're nervous</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-yellow-400">
                <Users className="w-8 h-8 mb-4 text-yellow-500" />
                <h3 className="font-bold text-lg mb-2">Interview Readiness</h3>
                <p className="text-gray-700">Practice common questions and build confidence for your first real interview</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-yellow-400">
                <CheckCircle className="w-8 h-8 mb-4 text-yellow-500" />
                <h3 className="font-bold text-lg mb-2">Psychometric & Self-Knowledge Tools</h3>
                <p className="text-gray-700">Discover your strengths and present yourself with honesty and pride</p>
              </div>
            </div>
            <div className="mt-12 text-center">
              <div className="bg-yellow-400 text-black p-6 rounded-lg inline-block">
                <Download className="w-6 h-6 inline mr-2" />
                <strong>Plus:</strong> Downloadable Templates & Cheat Sheets
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Why Training Providers Trust Us
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-800 p-6 rounded-lg">
                <CheckCircle className="w-8 h-8 mb-4 mx-auto text-yellow-400" />
                <p className="font-semibold">Our learners get interviews and finish programmes</p>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg">
                <Users className="w-8 h-8 mb-4 mx-auto text-yellow-400" />
                <p className="font-semibold">Fewer dropouts, more success stories</p>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg">
                <Award className="w-8 h-8 mb-4 mx-auto text-yellow-400" />
                <p className="font-semibold">Build a reputation for quality, not quantity</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900">
              Workshop Details
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-yellow-400 text-black p-6 rounded-lg">
                <div className="text-2xl font-bold mb-2">R299</div>
                <p className="text-sm">per learner (includes all resources & templates)</p>
              </div>
              <div className="bg-slate-100 p-6 rounded-lg">
                <MapPin className="w-8 h-8 mb-2 mx-auto text-slate-700" />
                <p className="font-semibold">Online & In-person</p>
                <p className="text-sm text-gray-600">Choose your fit</p>
              </div>
              <div className="bg-slate-100 p-6 rounded-lg">
                <Clock className="w-8 h-8 mb-2 mx-auto text-slate-700" />
                <p className="font-semibold">Half-day</p>
                <p className="text-sm text-gray-600">Intensive workshop</p>
              </div>
              <div className="bg-slate-100 p-6 rounded-lg">
                <div className="font-semibold">Next Dates</div>
                <p className="text-sm text-gray-600">See booking form</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-yellow-400 text-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              Hear from First-Time Success Stories
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-black text-white p-8 rounded-lg">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-lg mb-4">
                  "I didn't just get a CV—I learned how to tell my story and get the job I actually wanted."
                </p>
                <p className="text-sm text-gray-300">- Sarah M., Marketing Learner</p>
              </div>
              <div className="bg-black text-white p-8 rounded-lg">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-lg mb-4">
                  "I stopped wasting time on jobs that didn't fit me. Now I know what I want, and how to go for it."
                </p>
                <p className="text-sm text-gray-300">- David K., IT Intern</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Ready to Start Your Career the Right Way?
            </h2>
            
            {!showBooking ? (
              <div>
                <h3 className="text-xl font-semibold mb-6 text-center">
                  Step 1: Fill in your details to unlock booking
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-yellow-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-yellow-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-yellow-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-yellow-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Are you looking for a learnership, internship, or job?</label>
                    <select
                      name="lookingFor"
                      value={formData.lookingFor}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-yellow-400"
                      required
                    >
                      <option value="">Select an option</option>
                      <option value="learnership">Learnership</option>
                      <option value="internship">Internship</option>
                      <option value="job">Job</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Area of interest / career goals</label>
                    <textarea
                      name="careerGoals"
                      value={formData.careerGoals}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-yellow-400"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-yellow-400 text-black py-3 px-6 rounded-lg font-semibold hover:bg-yellow-500 transition duration-200 flex items-center justify-center"
                  >
                    Submit & Unlock Next Step
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center">
                <CheckCircle className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
                <h3 className="text-2xl font-semibold mb-6">Step 2: Book and pay online</h3>
                <p className="text-lg mb-8">Secure your seat and get ready to stand out!</p>
                <button className="bg-yellow-400 text-black py-4 px-8 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition duration-200">
                  Book Your Workshop - R299
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Training Provider Section */}
      <section className="py-16 bg-yellow-400 text-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Training Provider? Get in Touch to Empower Your Next Intake
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-black text-white p-6 rounded-lg">
                <CheckCircle className="w-8 h-8 mb-4 mx-auto text-yellow-400" />
                <p className="font-semibold">Pre-workshop consultation</p>
              </div>
              <div className="bg-black text-white p-6 rounded-lg">
                <Users className="w-8 h-8 mb-4 mx-auto text-yellow-400" />
                <p className="font-semibold">Workshop for all first-time applicants</p>
              </div>
              <div className="bg-black text-white p-6 rounded-lg">
                <Award className="w-8 h-8 mb-4 mx-auto text-yellow-400" />
                <p className="font-semibold">Follow-up support and progress tracking</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-slate-800 transition duration-200">
                Contact Us
              </button>
              <button className="bg-slate-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-slate-700 transition duration-200">
                Book Provider Workshop
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Free Workshop CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-900">
              Want a free taster first?
            </h2>
            <p className="text-lg mb-8 text-gray-600">
              Try our Free CV Workshop to get a taste of what we offer!
            </p>
            <button className="bg-slate-900 text-white py-3 px-8 rounded-lg font-semibold hover:bg-slate-800 transition duration-200">
              Try Free CV Workshop
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}