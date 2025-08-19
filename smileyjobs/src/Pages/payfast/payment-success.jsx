import React, { useState } from "react";
import {
  CheckCircle,
  Mail,
  Clock,
  BookOpen,
  Mic,
  Users,
  Download,
  ArrowRight,
  Play,
  Shield,
  Star,
  FileText,
  MessageSquare,
  Calendar,
  ExternalLink,
  Home,
} from "lucide-react";

export default function PaymentSuccess() {
  const [activePanel, setActivePanel] = useState(null);

  const togglePanel = (panelId) => {
    setActivePanel(activePanel === panelId ? null : panelId);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Success Header */}
      <section className="bg-gradient-to-br from-green-400 to-green-500 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <CheckCircle className="w-20 h-20 mx-auto mb-6 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Payment Successful!
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Welcome to the Job Seekers Premium Workshop
            </p>
            <div className="bg-white text-green-600 p-6 rounded-lg inline-block">
              <p className="text-lg font-semibold mb-2">
                ✅ Payment Confirmed - R299.00
              </p>
              <p className="text-sm text-gray-600">
                Transaction processed securely via PayFast
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Next Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              What Happens Next?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-800 p-6 rounded-lg text-center">
                <Mail className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
                <h3 className="font-semibold text-lg mb-2">Check Your Email</h3>
                <p className="text-gray-300 text-sm">
                  Workshop details and access links have been sent to your inbox
                </p>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
                <h3 className="font-semibold text-lg mb-2">Book Your Slot</h3>
                <p className="text-gray-300 text-sm">
                  Choose a workshop time that works for your schedule
                </p>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg text-center">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
                <h3 className="font-semibold text-lg mb-2">Get Prepared</h3>
                <p className="text-gray-300 text-sm">
                  Download pre-workshop materials and templates
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Tools Preview Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-slate-900">
              Exclusive AI-Powered Career Tools
            </h2>
            <p className="text-lg text-center text-gray-600 mb-12">
              As a premium workshop participant, you'll soon get access to our cutting-edge AI coaching tools
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* CV Coaching AI */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-500 p-3 rounded-lg">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    Coming Soon
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  AI CV Coach
                </h3>
                <p className="text-gray-700 mb-4">
                  Get instant, personalized feedback on your CV from our AI coach. 
                  Upload your draft and receive specific suggestions for improvement.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Real-time CV analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Industry-specific suggestions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>ATS optimization tips</span>
                  </div>
                </div>
                <button
                  onClick={() => togglePanel('cv-coach')}
                  className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                  disabled
                >
                  <Mic className="w-4 h-4" />
                  Preview Coming Soon
                </button>
                {activePanel === 'cv-coach' && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800 mb-2">
                      <strong>Preview:</strong> The AI CV Coach will analyze your CV and provide:
                    </p>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• Instant feedback on format and content</li>
                      <li>• Keyword optimization for your target industry</li>
                      <li>• Voice coaching for better self-presentation</li>
                      <li>• Real-time scoring and improvement tracking</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Interview Simulation */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-purple-500 p-3 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                    Coming Soon
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Interview Simulator
                </h3>
                <p className="text-gray-700 mb-4">
                  Practice interviews with our AI interviewer. Get comfortable 
                  with common questions and receive feedback on your responses.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Common interview questions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Voice response analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Confidence building exercises</span>
                  </div>
                </div>
                <button
                  onClick={() => togglePanel('interview-sim')}
                  className="w-full mt-4 bg-purple-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
                  disabled
                >
                  <Play className="w-4 h-4" />
                  Preview Coming Soon
                </button>
                {activePanel === 'interview-sim' && (
                  <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-800 mb-2">
                      <strong>Preview:</strong> The Interview Simulator will offer:
                    </p>
                    <ul className="text-xs text-purple-700 space-y-1">
                      <li>• AI-powered mock interviews</li>
                      <li>• Real-time speech analysis and feedback</li>
                      <li>• Customized questions based on your career goals</li>
                      <li>• Progress tracking and improvement metrics</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Learner Library */}
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-yellow-500 p-3 rounded-lg">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                    Coming Soon
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Learner Library
                </h3>
                <p className="text-gray-700 mb-4">
                  Access our comprehensive library of career resources, templates, 
                  and industry insights tailored for first-time job seekers.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>CV & cover letter templates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Industry career guides</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Job search strategies</span>
                  </div>
                </div>
                <button
                  onClick={() => togglePanel('learner-library')}
                  className="w-full mt-4 bg-yellow-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2"
                  disabled
                >
                  <Download className="w-4 h-4" />
                  Preview Coming Soon
                </button>
                {activePanel === 'learner-library' && (
                  <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-800 mb-2">
                      <strong>Preview:</strong> The Learner Library will provide:
                    </p>
                    <ul className="text-xs text-yellow-700 space-y-1">
                      <li>• AI-curated job market insights</li>
                      <li>• Personalized skill development paths</li>
                      <li>• Interactive career exploration tools</li>
                      <li>• Success stories and case studies</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Early Access Notice */}
            <div className="mt-12 bg-slate-800 text-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-yellow-400">
                🚀 You're on the Early Access List!
              </h3>
              <p className="mb-4">
                As a premium workshop participant, you'll be the first to try these AI tools when they launch. 
                We'll notify you via email as soon as they're ready.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-300 flex-wrap">
                <span>Expected launch: Q3 2025</span>
                <span>•</span>
                <span>Free for workshop participants</span>
                <span>•</span>
                <span>Lifetime access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Access Section */}
      <section className="py-16 bg-yellow-400 text-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              Your Workshop Access
            </h2>
            <div className="bg-slate-800 text-white p-8 rounded-lg">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-4 text-yellow-400">
                    What's Included:
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Half-day intensive workshop
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Professional CV templates
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Interview preparation materials
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Video pitch coaching
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Downloadable resources
                    </li>
                  </ul>
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-4 text-yellow-400">
                    Next Steps:
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <p className="text-gray-300">Check your email for workshop schedule</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <p className="text-gray-300">Book your preferred time slot</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      <p className="text-gray-300">Join the workshop and transform your job search</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-slate-900">
              Need Help or Have Questions?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-6 rounded-lg">
                <Mail className="w-8 h-8 mx-auto mb-4 text-blue-500" />
                <h3 className="font-semibold text-lg mb-2">Email Support</h3>
                <p className="text-gray-600 mb-4">
                  Get help with workshop access or technical issues
                </p>
                <a
                  href="mailto:support@skillsbureau.co.za"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  support@skillsbureau.co.za
                </a>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg">
                <Calendar className="w-8 h-8 mx-auto mb-4 text-green-500" />
                <h3 className="font-semibold text-lg mb-2">Book a Call</h3>
                <p className="text-gray-600 mb-4">
                  Speak directly with our team about your career goals
                </p>
                <a
                  href="https://outlook.office.com/book/SkillsBureauBookingsForm@skillsbureau.co.za/?ismsaljsauthenabled=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 font-medium inline-flex items-center gap-1"
                >
                  Schedule Meeting
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-sm">Secure payment processed by PayFast</span>
            </div>
            <p className="text-xs text-gray-400">
              © 2025 Smiley Jobs & Skills Bureau. All rights reserved.
            </p>
            <div className="mt-4">
              <a
                href="/job-seekers"
                className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                <Home className="w-4 h-4" />
                Back to Main Page
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}