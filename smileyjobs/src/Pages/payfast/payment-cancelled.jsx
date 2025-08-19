import React from "react";
import {
  X,
  ArrowLeft,
  Home,
  Shield,
  Clock,
  CheckCircle,
  Mail,
  Phone,
  ExternalLink,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

export default function PaymentCancelled() {
  const handleRetryPayment = () => {
    // This would redirect back to the main page or payment flow
    window.location.href = "/job-seekers";
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Cancelled Header */}
      <section className="bg-gradient-to-br from-[#0f172a] to-[#0f172a] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white bg-opacity-20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <X className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Payment Cancelled
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              No worries—your workshop spot is still available!
            </p>
            <div className="bg-white text-[#0f172a] p-6 rounded-lg inline-block">
              <p className="text-lg font-semibold mb-2">
                Your payment was not processed
              </p>
              <p className="text-sm text-gray-600">
                You can try again anytime or contact us for assistance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Happened Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              What Happened?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-800 p-6 rounded-lg text-center">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 text-orange-400" />
                <h3 className="font-semibold text-lg mb-2">
                  Payment Cancelled
                </h3>
                <p className="text-gray-300 text-sm">
                  You chose to cancel the payment or closed the payment window
                </p>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg text-center">
                <Shield className="w-12 h-12 mx-auto mb-4 text-green-400" />
                <h3 className="font-semibold text-lg mb-2">No Charges Made</h3>
                <p className="text-gray-300 text-sm">
                  Your card/account was not charged—you're completely safe
                </p>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg text-center">
                <Clock className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                <h3 className="font-semibold text-lg mb-2">Spot Reserved</h3>
                <p className="text-gray-300 text-sm">
                  Your workshop spot is still available for the next 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900">
              Ready to Try Again?
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Your information is saved—just complete the payment to secure your
              spot
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {/* Quick Retry */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8">
                <div className="bg-yellow-400 p-4 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <RefreshCw className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Complete Your Booking
                </h3>
                <p className="text-gray-700 mb-6">
                  Return to the main page and complete your payment. All your
                  details are still saved.
                </p>
                <button
                  onClick={handleRetryPayment}
                  className="w-full bg-yellow-400 text-black py-3 px-6 rounded-lg font-semibold hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Try Payment Again
                </button>
              </div>

              {/* Alternative Options */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-8">
                <div className="bg-slate-700 p-4 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Need Help?
                </h3>
                <p className="text-gray-700 mb-6">
                  Contact our team if you experienced any technical issues or
                  need payment assistance.
                </p>
                <div className="space-y-3">
                  <a
                    href="mailto:it@skillsbureau.co.za"
                    className="w-full bg-slate-700 text-white py-2 px-4 rounded-lg font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Email Support
                  </a>
                  {/* <a
                    href="https://outlook.office.com/book/SkillsBureauBookingsForm@skillsbureau.co.za/?ismsaljsauthenabled=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-slate-200 text-slate-700 py-2 px-4 rounded-lg font-medium hover:bg-slate-300 transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Book a Call
                    <ExternalLink className="w-3 h-3" />
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Reminder Section */}
      <section className="py-16 bg-yellow-400 text-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              Don't Miss Out on Transforming Your Career
            </h2>
            <p className="text-lg mb-8">
              Remember what you're getting with the Premium Workshop:
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-800 text-white p-6 rounded-lg">
                <CheckCircle className="w-8 h-8 mb-4 mx-auto text-yellow-400" />
                <p className="font-semibold text-sm">
                  Professional CV Templates
                </p>
              </div>
              <div className="bg-slate-800 text-white p-6 rounded-lg">
                <CheckCircle className="w-8 h-8 mb-4 mx-auto text-yellow-400" />
                <p className="font-semibold text-sm">Video Pitch Coaching</p>
              </div>
              <div className="bg-slate-800 text-white p-6 rounded-lg">
                <CheckCircle className="w-8 h-8 mb-4 mx-auto text-yellow-400" />
                <p className="font-semibold text-sm">Interview Preparation</p>
              </div>
              <div className="bg-slate-800 text-white p-6 rounded-lg">
                <CheckCircle className="w-8 h-8 mb-4 mx-auto text-yellow-400" />
                <p className="font-semibold text-sm">Early AI Tools Access</p>
              </div>
            </div>

            <div className="mt-8">
              <div className="bg-slate-800 text-white p-6 rounded-lg inline-block">
                <p className="text-lg font-bold text-yellow-400 mb-2">
                  Premium Workshop - R299
                </p>
                <p className="text-sm text-gray-300">
                  Transform your job search • Stand out from the crowd
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Payment Issues */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Common Payment Issues & Solutions
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-400 mb-4">
                  Payment Window Closed?
                </h3>
                <p className="text-gray-300 text-sm mb-3">
                  If the PayFast window closed accidentally, simply try the
                  payment process again. Your details are saved.
                </p>
                <div className="text-xs text-gray-400">
                  💡 Tip: Keep the payment window open until completion
                </div>
              </div>

              <div className="bg-slate-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-400 mb-4">
                  Card Issues?
                </h3>
                <p className="text-gray-300 text-sm mb-3">
                  PayFast accepts all major SA cards. If your card was declined,
                  check with your bank or try a different card.
                </p>
                <div className="text-xs text-gray-400">
                  💡 Tip: Ensure online payments are enabled on your account
                </div>
              </div>

              <div className="bg-slate-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-400 mb-4">
                  Technical Problems?
                </h3>
                <p className="text-gray-300 text-sm mb-3">
                  If you experienced any technical issues during payment, our
                  support team can assist you directly.
                </p>
                <div className="text-xs text-gray-400">
                  💡 Tip: Screenshot any error messages to help us assist you
                </div>
              </div>

              <div className="bg-slate-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-400 mb-4">
                  Changed Your Mind?
                </h3>
                <p className="text-gray-300 text-sm mb-3">
                  No problem! You can complete the payment anytime within 24
                  hours to secure your workshop spot.
                </p>
                <div className="text-xs text-gray-400">
                  💡 Tip: Set a reminder so you don’t miss out
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Home className="w-12 h-12 mx-auto mb-6 text-orange-500" />
            <h2 className="text-3xl font-bold mb-4 text-slate-900">
              Back to Home
            </h2>
            <p className="text-gray-600 mb-8">
              You can always return to the main page and restart the process
              whenever you’re ready.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Go to Homepage
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Skills Bureau. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
