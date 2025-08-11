import React, { useState } from 'react';
import { Star, CheckCircle, Users, Award, Clock, MapPin, Phone, Mail, User, Target, ArrowRight, Play, Download, CreditCard, Lock, Shield, AlertCircle, Loader, X, ExternalLink } from 'lucide-react';

// PayFast Payment Component
const PayFastPaymentComponent = ({ 
  course = {
    id: 'job-seekers-workshop',
    title: 'Job Seekers Premium Workshop',
    price: 299,
    currency: 'ZAR',
    description: 'Land the Right Opportunity—Not Just Any Job'
  },
  userDetails = {},
  onPaymentSuccess = () => {},
  onPaymentError = () => {},
  onClose = () => {},
  // PayFast credentials - replace with your actual merchant details
  merchantId = '10000100',
  merchantKey = '46f0cd694581a',
  sandbox = true // Set to false for production
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle');

  // PayFast configuration
  const payfastConfig = {
    merchant_id: merchantId,
    merchant_key: merchantKey,
    return_url: `${window.location.origin}/payment-success`,
    cancel_url: `${window.location.origin}/payment-cancelled`,
    notify_url: `${window.location.origin}/api/payfast-notify`, // Your server endpoint
    
    // Payment details
    amount: course.price.toFixed(2),
    item_name: course.title,
    item_description: course.description,
    
    // User details
    name_first: userDetails.name?.split(' ')[0] || '',
    name_last: userDetails.name?.split(' ').slice(1).join(' ') || '',
    email_address: userDetails.email || '',
    cell_number: userDetails.phone || '',
    
    // Custom fields
    custom_str1: course.id,
    custom_str2: userDetails.lookingFor || '',
    custom_str3: userDetails.age || '',
    
    // Payment method
    payment_method: 'cc,eft,dc', // Credit card, EFT, Debit card
  };

  // PayFast URL (sandbox or live)
  const payfastUrl = sandbox 
    ? 'https://sandbox.payfast.co.za/eng/process'
    : 'https://www.payfast.co.za/eng/process';

  // Generate signature for PayFast (simplified version)
  const generateSignature = (data, passphrase = '') => {
    // In production, this should be done server-side for security
    const sortedParams = Object.keys(data)
      .sort()
      .map(key => `${key}=${encodeURIComponent(data[key])}`)
      .join('&');
    
    // For security, signature generation should be done server-side
    // This is a simplified client-side version for demo purposes
    return btoa(sortedParams).replace(/[^a-zA-Z0-9]/g, '').substring(0, 32);
  };

  const handlePayFastPayment = () => {
    setIsProcessing(true);
    setPaymentStatus('processing');

    try {
      // Add signature to config
      const configWithSignature = {
        ...payfastConfig,
        signature: generateSignature(payfastConfig)
      };

      // Create a form and submit to PayFast
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = payfastUrl;
      form.target = '_blank'; // Open in new window

      // Add all parameters as hidden inputs
      Object.keys(configWithSignature).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = configWithSignature[key];
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);

      // For demo purposes, simulate success after a delay
      setTimeout(() => {
        setPaymentStatus('redirected');
        setIsProcessing(false);
      }, 2000);

    } catch (error) {
      setPaymentStatus('error');
      setIsProcessing(false);
      onPaymentError(error);
    }
  };

  const SecurityIndicator = () => (
    <div className="flex items-center gap-2 text-sm text-green-600 mb-4">
      <Shield className="h-4 w-4" />
      <span>Secured by PayFast - South Africa's trusted payment gateway</span>
      <div className="flex gap-1 ml-2">
        <div className="h-2 w-2 rounded-full bg-green-500" title="SSL Verified" />
        <div className="h-2 w-2 rounded-full bg-green-500" title="PCI DSS Compliant" />
        <div className="h-2 w-2 rounded-full bg-green-500" title="Bank Grade Security" />
      </div>
    </div>
  );

  if (paymentStatus === 'redirected') {
    return (
      <div className="text-center">
        <ExternalLink className="h-16 w-16 text-blue-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Redirected to PayFast</h3>
        <p className="text-gray-600 mb-6">
          Complete your payment on the PayFast secure payment page.
        </p>
        <div className="space-y-3">
          <p className="text-sm text-gray-500">
            You'll be redirected back here after payment completion.
          </p>
          <button 
            className="w-full bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900">{course.title}</h4>
          <p className="text-sm text-gray-600 mt-1">{course.description}</p>
          <p className="text-2xl font-bold text-yellow-600 mt-2">
            R{course.price} {course.currency}
          </p>
        </div>
      </div>

      <SecurityIndicator />

      {/* User Details Summary */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Booking Details</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Name:</span>
            <span className="font-medium">{userDetails.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Email:</span>
            <span className="font-medium">{userDetails.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Phone:</span>
            <span className="font-medium">{userDetails.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Looking for:</span>
            <span className="font-medium capitalize">{userDetails.lookingFor}</span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Accepted Payment Methods</h4>
        <div className="grid grid-cols-3 gap-3 text-xs text-center">
          <div className="bg-white p-2 rounded border">
            <CreditCard className="h-4 w-4 mx-auto mb-1 text-blue-600" />
            <span>Credit Cards</span>
          </div>
          <div className="bg-white p-2 rounded border">
            <div className="h-4 w-4 mx-auto mb-1 bg-green-600 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">₹</span>
            </div>
            <span>Debit Cards</span>
          </div>
          <div className="bg-white p-2 rounded border">
            <div className="h-4 w-4 mx-auto mb-1 bg-blue-600 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">E</span>
            </div>
            <span>EFT</span>
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-2 text-center">
          All major South African banks supported
        </p>
      </div>

      {paymentStatus === 'error' && (
        <div className="flex items-center gap-2 text-red-600 text-sm p-3 bg-red-50 rounded-lg">
          <AlertCircle className="h-4 w-4" />
          Payment setup failed. Please try again or contact support.
        </div>
      )}

      <button
        onClick={handlePayFastPayment}
        disabled={isProcessing || paymentStatus === 'processing'}
        className="w-full bg-yellow-400 text-black py-3 px-4 rounded-lg font-semibold hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <Loader className="h-4 w-4 animate-spin" />
            Preparing PayFast Payment...
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" />
            Pay Securely with PayFast - R{course.price}
          </>
        )}
      </button>

      <div className="mt-4 text-xs text-gray-500 text-center space-y-1">
        <p>🔒 Powered by PayFast - PCI DSS Level 1 compliant</p>
        <p>💳 All major credit cards, debit cards, and EFT supported</p>
        <p>By completing this purchase, you agree to our Terms of Service</p>
      </div>
    </div>
  );
};

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
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone && formData.age && formData.lookingFor && formData.careerGoals) {
      setShowBooking(true);
    } else {
      alert('Please fill in all fields before submitting.');
    }
  };

  const handleBookWorkshop = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (result) => {
    console.log('Payment successful:', result);
    setShowPaymentModal(false);
    // Handle success - could redirect to dashboard or show confirmation
    alert('Payment successful! Check your email for workshop access details.');
  };

  const handlePaymentError = (error) => {
    console.error('Payment failed:', error);
    alert('Payment failed. Please try again or contact support.');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* PayFast Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-slate-800 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Complete Your Workshop Booking</h2>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <PayFastPaymentComponent
                course={{
                  id: 'job-seekers-workshop',
                  title: 'Job Seekers Premium Workshop',
                  price: 299,
                  currency: 'ZAR',
                  description: 'Land the Right Opportunity—Not Just Any Job'
                }}
                userDetails={formData}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
                onClose={() => setShowPaymentModal(false)}
                // PayFast settings - replace with your actual credentials
                merchantId="10000100"
                merchantKey="46f0cd694581a"
                sandbox={true} // Set to false for production
              />
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
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
              <p className="text-lg font-medium">Premium Workshop • R299 per learner</p>
              <p className="text-sm text-gray-300 mt-1">Secure payment via PayFast</p>
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
              <div className="bg-slate-800 text-white p-6 rounded-lg">
                <CheckCircle className="w-8 h-8 mb-4 mx-auto text-yellow-400" />
                <p className="font-semibold">Land a learnership or job that actually fits</p>
              </div>
              <div className="bg-slate-800 text-white p-6 rounded-lg">
                <Star className="w-8 h-8 mb-4 mx-auto text-yellow-400" />
                <p className="font-semibold">Stand out with a recruiter-ready CV and video pitch</p>
              </div>
              <div className="bg-slate-800 text-white p-6 rounded-lg">
                <Target className="w-8 h-8 mb-4 mx-auto text-yellow-400" />
                <p className="font-semibold">Apply for the right roles, for the right reasons</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            <button
              className="bg-yellow-400 text-black p-6 rounded-lg inline-block font-semibold hover:bg-yellow-500 transition duration-200"
              onClick={() => alert("This only available after you have completed the workshop.")}
              type="button"
            >
              <Download className="w-6 h-6 inline mr-2" />
              <strong>Plus:</strong> Downloadable Templates & Cheat Sheets
            </button>
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
                <p className="text-xs mt-1 text-gray-700">💳 Secure PayFast checkout</p>
              </div>
              <div className="bg-slate-100 p-6 rounded-lg">
                <MapPin className="w-8 h-8 mb-2 mx-auto text-slate-700" />
                <p className="font-semibold">Online </p>
                <p className="text-sm text-gray-600">Choose your fit</p>
              </div>
              <div className="bg-slate-100 p-6 rounded-lg">
                <Clock className="w-8 h-8 mb-2 mx-auto text-slate-700" />
                <p className="font-semibold">Half-day</p>
                <p className="text-sm text-gray-600">Intensive workshop</p>
              </div>
              <div className="bg-slate-100 p-6 rounded-lg">
                <Shield className="w-8 h-8 mb-2 mx-auto text-slate-700" />
                <p className="font-semibold">Secure Payment</p>
                <p className="text-sm text-gray-600">PCI DSS compliant</p>
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
              <div className="bg-slate-800 text-white p-8 rounded-lg">
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
              <div className="bg-slate-800 text-white p-8 rounded-lg">
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
                <h3 className="text-2xl font-semibold mb-6">Step 2: Book and pay securely with PayFast</h3>
                <p className="text-lg mb-8">Secure your seat and get ready to stand out!</p>
                <button 
                  onClick={handleBookWorkshop}
                  className="bg-yellow-400 text-black py-4 px-8 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition duration-200 flex items-center justify-center mx-auto gap-2"
                >
                  <Shield className="w-5 h-5" />
                  Book Your Workshop - R299
                </button>
                <p className="text-sm text-gray-400 mt-2">
                  💳 Secure payment via PayFast • All major SA banks supported
                </p>
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
              <div className="bg-slate-800 text-white p-6 rounded-lg">
                <CheckCircle className="w-8 h-8 mb-4 mx-auto text-yellow-400" />
                <p className="font-semibold">Outsource to quality recruiters</p>
              </div>
              <div className="bg-slate-800 text-white p-6 rounded-lg">
                <Users className="w-8 h-8 mb-4 mx-auto text-yellow-400" />
                <p className="font-semibold">Get the right people</p>
              </div>
              <div className="bg-slate-800 text-white p-6 rounded-lg">
                <Award className="w-8 h-8 mb-4 mx-auto text-yellow-400" />
                <p className="font-semibold">Improve pass rates</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-slate-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-slate-800 transition duration-200">
                Find out more
              </button>
              <button className="bg-slate-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-slate-700 transition duration-200">
                Book Meeting For Learner Recruitment Solutions
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
            <a
              href="https://www.youtube.com/@skillsbureau/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900 text-white py-3 px-8 rounded-lg font-semibold hover:bg-slate-800 transition duration-200 inline-block"
            >
              Try Free CV Workshop
            </a>
          </div>
        </div>
      </section>

      {/* PayFast Trust Footer */}
      <section className="py-8 bg-slate-50 border-t">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <Shield className="h-4 w-4 text-green-600" />
              <span>Payments secured by PayFast</span>
              <span>•</span>
              <span>PCI DSS Level 1 Compliant</span>
              <span>•</span>
              <span>All major South African banks</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              PayFast is South Africa's most trusted payment gateway, processing millions of transactions for thousands of businesses.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}