import React, { useState } from 'react';
import { Star, CheckCircle, Users, Award, Clock, MapPin, Phone, Mail, User, Target, ArrowRight, Play, Download, CreditCard, Lock, Shield, AlertCircle, Loader, X } from 'lucide-react';

// Payment Component
const CoursePaymentComponent = ({ 
  course = {
    id: 'job-seekers-workshop',
    title: 'Job Seekers Premium Workshop',
    price: 299,
    currency: 'ZAR',
    description: 'Land the Right Opportunity—Not Just Any Job'
  },
  onPaymentSuccess = () => {},
  onPaymentError = () => {},
  onClose = () => {},
  apiEndpoint = '/api/payments/process'
}) => {
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'ZA'
    }
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle');
  const [securityChecks, setSecurityChecks] = useState({
    httpsVerified: false,
    tokenGenerated: false,
    encryptionReady: false
  });

  React.useEffect(() => {
    verifySecurityMeasures();
  }, []);

  const verifySecurityMeasures = () => {
    const httpsVerified = window.location.protocol === 'https:';
    const tokenGenerated = generateCSRFToken();
    const encryptionReady = typeof window.crypto !== 'undefined' && 
                           typeof window.crypto.subtle !== 'undefined';

    setSecurityChecks({
      httpsVerified,
      tokenGenerated: !!tokenGenerated,
      encryptionReady
    });
  };

  const generateCSRFToken = () => {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  };

  const validateForm = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const cardNumberClean = formData.cardNumber.replace(/\s/g, '');
    if (!cardNumberClean || cardNumberClean.length < 13 || cardNumberClean.length > 19) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }

    if (!formData.expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Please enter expiry date in MM/YY format';
    }

    if (!formData.cvv || formData.cvv.length < 3 || formData.cvv.length > 4) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = 'Please enter the cardholder name';
    }

    if (!formData.billingAddress.street.trim()) {
      newErrors.billingStreet = 'Please enter billing address';
    }
    if (!formData.billingAddress.city.trim()) {
      newErrors.billingCity = 'Please enter city';
    }
    if (!formData.billingAddress.zipCode.trim()) {
      newErrors.billingZip = 'Please enter postal code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleInputChange = (field, value) => {
    let processedValue = value;

    if (field === 'cardNumber') {
      processedValue = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      processedValue = formatExpiryDate(value);
    } else if (field === 'cvv') {
      processedValue = value.replace(/\D/g, '').substring(0, 4);
    }

    if (field.startsWith('billing.')) {
      const addressField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          [addressField]: processedValue
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: processedValue
      }));
    }

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const processPayment = async () => {
    if (!validateForm()) return;

    const allSecurityChecksPass = Object.values(securityChecks).every(check => check);
    if (!allSecurityChecksPass) {
      setErrors({ security: 'Security verification failed. Please refresh and try again.' });
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('processing');

    try {
      // Simulate API call - replace with actual payment processor
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate success
      setPaymentStatus('success');
      onPaymentSuccess({
        transactionId: 'TXN-' + Math.random().toString(36).substr(2, 9),
        courseId: course.id,
        amount: course.price
      });
    } catch (error) {
      setPaymentStatus('error');
      setErrors({ payment: 'Payment processing failed. Please try again.' });
      onPaymentError(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const SecurityIndicator = () => (
    <div className="flex items-center gap-2 text-sm text-green-600 mb-4">
      <Shield className="h-4 w-4" />
      <span>Secured by 256-bit SSL encryption</span>
      <div className="flex gap-1 ml-2">
        {Object.entries(securityChecks).map(([key, passed]) => (
          <div
            key={key}
            className={`h-2 w-2 rounded-full ${passed ? 'bg-green-500' : 'bg-red-500'}`}
            title={`${key}: ${passed ? 'Verified' : 'Failed'}`}
          />
        ))}
      </div>
    </div>
  );

  if (paymentStatus === 'success') {
    return (
      <div className="text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment Successful!</h3>
        <p className="text-gray-600 mb-6">
          Welcome to the Job Seekers Premium Workshop!
        </p>
        <div className="space-y-3">
          <button 
            className="w-full bg-yellow-400 text-black px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors font-semibold"
            onClick={() => window.location.href = '/dashboard/workshops'}
          >
            Access Workshop Materials
          </button>
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

      {errors.security && (
        <div className="flex items-center gap-2 text-red-600 text-sm mb-4 p-3 bg-red-50 rounded-lg">
          <AlertCircle className="h-4 w-4" />
          {errors.security}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="your.email@example.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <CreditCard className="inline h-4 w-4 mr-1" />
            Card Number
          </label>
          <input
            type="text"
            value={formData.cardNumber}
            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 ${
              errors.cardNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="1234 5678 9012 3456"
            maxLength="19"
          />
          {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date
            </label>
            <input
              type="text"
              value={formData.expiryDate}
              onChange={(e) => handleInputChange('expiryDate', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 ${
                errors.expiryDate ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="MM/YY"
              maxLength="5"
            />
            {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CVV
            </label>
            <input
              type="password"
              value={formData.cvv}
              onChange={(e) => handleInputChange('cvv', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 ${
                errors.cvv ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="123"
              maxLength="4"
            />
            {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cardholder Name
          </label>
          <input
            type="text"
            value={formData.cardholderName}
            onChange={(e) => handleInputChange('cardholderName', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 ${
              errors.cardholderName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="John Doe"
          />
          {errors.cardholderName && <p className="text-red-500 text-xs mt-1">{errors.cardholderName}</p>}
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Billing Address</h4>
          <input
            type="text"
            value={formData.billingAddress.street}
            onChange={(e) => handleInputChange('billing.street', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 ${
              errors.billingStreet ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Street Address"
          />
          {errors.billingStreet && <p className="text-red-500 text-xs mt-1">{errors.billingStreet}</p>}

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              value={formData.billingAddress.city}
              onChange={(e) => handleInputChange('billing.city', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 ${
                errors.billingCity ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="City"
            />
            <input
              type="text"
              value={formData.billingAddress.state}
              onChange={(e) => handleInputChange('billing.state', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="Province"
            />
          </div>
          {errors.billingCity && <p className="text-red-500 text-xs mt-1">{errors.billingCity}</p>}

          <input
            type="text"
            value={formData.billingAddress.zipCode}
            onChange={(e) => handleInputChange('billing.zipCode', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 ${
              errors.billingZip ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Postal Code"
          />
          {errors.billingZip && <p className="text-red-500 text-xs mt-1">{errors.billingZip}</p>}
        </div>

        {errors.payment && (
          <div className="flex items-center gap-2 text-red-600 text-sm p-3 bg-red-50 rounded-lg">
            <AlertCircle className="h-4 w-4" />
            {errors.payment}
          </div>
        )}

        <button
          onClick={processPayment}
          disabled={isProcessing || paymentStatus === 'processing'}
          className="w-full bg-yellow-400 text-black py-3 px-4 rounded-lg font-semibold hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <Loader className="h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="h-4 w-4" />
              Complete Purchase - R{course.price}
            </>
          )}
        </button>
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>🔒 Your payment information is encrypted and secure</p>
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

  const handlePaymentSuccess = (result) => {
    console.log('Payment successful:', result);
    setShowPaymentModal(false);
    // You can add success handling here (redirect, show confirmation, etc.)
    alert('Payment successful! Check your email for workshop details.');
  };

  const handlePaymentError = (error) => {
    console.error('Payment failed:', error);
    // Handle error (show message, log, etc.)
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
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
              <CoursePaymentComponent
                course={{
                  id: 'job-seekers-workshop',
                  title: 'Job Seekers Premium Workshop',
                  price: 299,
                  currency: 'ZAR',
                  description: 'Land the Right Opportunity—Not Just Any Job'
                }}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
                onClose={() => setShowPaymentModal(false)}
              />
            </div>
          </div>
        </div>
      )}

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
                <p className="font-semibold">Outsource to quality recruiters</p>
              </div>
              <div className="bg-black text-white p-6 rounded-lg">
                <Users className="w-8 h-8 mb-4 mx-auto text-yellow-400" />
                <p className="font-semibold">Get the right people</p>
              </div>
              <div className="bg-black text-white p-6 rounded-lg">
                <Award className="w-8 h-8 mb-4 mx-auto text-yellow-400" />
                <p className="font-semibold">Improve pass rates</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-slate-800 transition duration-200">
                Find out more
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
    </div>
  );
}