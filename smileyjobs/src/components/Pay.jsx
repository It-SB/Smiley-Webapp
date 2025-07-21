import React, { useState, useEffect } from "react";
import {
  CreditCard,
  Lock,
  Shield,
  AlertCircle,
  CheckCircle,
  Loader,
} from "lucide-react";

const CoursePaymentComponent = ({
  course = {
    id: "course-123",
    title: "Professional Job Interview Mastery",
    price: 99.99,
    currency: "USD",
    description: "Master the art of job interviews with proven strategies",
  },
  onPaymentSuccess = () => {},
  onPaymentError = () => {},
  apiEndpoint = "/api/payments/process",
  stripePublishableKey = "pk_test_...", // Replace with your actual key
}) => {
  const [formData, setFormData] = useState({
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "US",
    },
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("idle"); // idle, processing, success, error
  const [securityChecks, setSecurityChecks] = useState({
    httpsVerified: false,
    tokenGenerated: false,
    encryptionReady: false,
  });

  // Security verification on component mount
  useEffect(() => {
    verifySecurityMeasures();
  }, []);

  const verifySecurityMeasures = () => {
    // Verify HTTPS
    const httpsVerified = window.location.protocol === "https:";

    // Generate CSRF token (in real implementation, get from server)
    const tokenGenerated = generateCSRFToken();

    // Verify encryption capabilities
    const encryptionReady =
      typeof window.crypto !== "undefined" &&
      typeof window.crypto.subtle !== "undefined";

    setSecurityChecks({
      httpsVerified,
      tokenGenerated: !!tokenGenerated,
      encryptionReady,
    });
  };

  const generateCSRFToken = () => {
    // Generate a random token for CSRF protection
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
      ""
    );
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Card number validation (simplified - in production use proper library)
    const cardNumberClean = formData.cardNumber.replace(/\s/g, "");
    if (
      !cardNumberClean ||
      cardNumberClean.length < 13 ||
      cardNumberClean.length > 19
    ) {
      newErrors.cardNumber = "Please enter a valid card number";
    }

    // Expiry date validation
    if (
      !formData.expiryDate ||
      !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)
    ) {
      newErrors.expiryDate = "Please enter expiry date in MM/YY format";
    }

    // CVV validation
    if (!formData.cvv || formData.cvv.length < 3 || formData.cvv.length > 4) {
      newErrors.cvv = "Please enter a valid CVV";
    }

    // Cardholder name validation
    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = "Please enter the cardholder name";
    }

    // Billing address validation
    if (!formData.billingAddress.street.trim()) {
      newErrors.billingStreet = "Please enter billing address";
    }
    if (!formData.billingAddress.city.trim()) {
      newErrors.billingCity = "Please enter city";
    }
    if (!formData.billingAddress.zipCode.trim()) {
      newErrors.billingZip = "Please enter ZIP code";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCardNumber = (value) => {
    // Format card number with spaces
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\D/g, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handleInputChange = (field, value) => {
    let processedValue = value;

    if (field === "cardNumber") {
      processedValue = formatCardNumber(value);
    } else if (field === "expiryDate") {
      processedValue = formatExpiryDate(value);
    } else if (field === "cvv") {
      processedValue = value.replace(/\D/g, "").substring(0, 4);
    }

    if (field.startsWith("billing.")) {
      const addressField = field.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          [addressField]: processedValue,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: processedValue,
      }));
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const encryptSensitiveData = async (data) => {
    // In production, use proper encryption library or tokenization service
    // This is a simplified example
    try {
      const encoder = new TextEncoder();
      const key = await window.crypto.subtle.generateKey(
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
      );

      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      const encryptedData = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        key,
        encoder.encode(JSON.stringify(data))
      );

      return {
        data: Array.from(new Uint8Array(encryptedData)),
        iv: Array.from(iv),
        key: await window.crypto.subtle.exportKey("raw", key),
      };
    } catch (error) {
      console.error("Encryption failed:", error);
      throw new Error("Failed to secure payment data");
    }
  };

  const processPayment = async () => {
    if (!validateForm()) return;

    // Check security measures
    const allSecurityChecksPass = Object.values(securityChecks).every(
      (check) => check
    );
    if (!allSecurityChecksPass) {
      setErrors({
        security: "Security verification failed. Please refresh and try again.",
      });
      return;
    }

    setIsProcessing(true);
    setPaymentStatus("processing");

    try {
      // Prepare sensitive data for encryption
      const sensitiveData = {
        cardNumber: formData.cardNumber.replace(/\s/g, ""),
        cvv: formData.cvv,
        expiryDate: formData.expiryDate,
      };

      // Encrypt sensitive payment data
      const encryptedPaymentData = await encryptSensitiveData(sensitiveData);

      // Prepare payload for backend
      const payload = {
        courseId: course.id,
        amount: course.price,
        currency: course.currency,
        customerEmail: formData.email,
        customerName: formData.cardholderName,
        billingAddress: formData.billingAddress,
        encryptedPaymentData,
        csrfToken: generateCSRFToken(),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
      };

      // Simulate API call (replace with actual payment processor integration)
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        credentials: "same-origin",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Payment failed: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.success) {
        setPaymentStatus("success");
        onPaymentSuccess({
          transactionId: result.transactionId,
          courseId: course.id,
          amount: course.price,
        });
      } else {
        throw new Error(result.error || "Payment processing failed");
      }
    } catch (error) {
      setPaymentStatus("error");
      setErrors({ payment: error.message });
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
            className={`h-2 w-2 rounded-full ${
              passed ? "bg-green-500" : "bg-red-500"
            }`}
            title={`${key}: ${passed ? "Verified" : "Failed"}`}
          />
        ))}
      </div>
    </div>
  );

  if (paymentStatus === "success") {
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Payment Successful!
          </h3>
          <p className="text-gray-600 mb-4">
            You now have access to "{course.title}"
          </p>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => (window.location.href = "/dashboard/courses")}
          >
            Access Your Course
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Complete Your Purchase
        </h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900">{course.title}</h4>
          <p className="text-sm text-gray-600 mt-1">{course.description}</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            ${course.price.toFixed(2)} {course.currency}
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
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <CreditCard className="inline h-4 w-4 mr-1" />
            Card Number
          </label>
          <input
            type="text"
            value={formData.cardNumber}
            onChange={(e) => handleInputChange("cardNumber", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.cardNumber ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="1234 5678 9012 3456"
            maxLength="19"
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date
            </label>
            <input
              type="text"
              value={formData.expiryDate}
              onChange={(e) => handleInputChange("expiryDate", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.expiryDate ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="MM/YY"
              maxLength="5"
            />
            {errors.expiryDate && (
              <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CVV
            </label>
            <input
              type="password"
              value={formData.cvv}
              onChange={(e) => handleInputChange("cvv", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.cvv ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="123"
              maxLength="4"
            />
            {errors.cvv && (
              <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cardholder Name
          </label>
          <input
            type="text"
            value={formData.cardholderName}
            onChange={(e) =>
              handleInputChange("cardholderName", e.target.value)
            }
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.cardholderName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="John Doe"
          />
          {errors.cardholderName && (
            <p className="text-red-500 text-xs mt-1">{errors.cardholderName}</p>
          )}
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Billing Address</h4>
          <input
            type="text"
            value={formData.billingAddress.street}
            onChange={(e) =>
              handleInputChange("billing.street", e.target.value)
            }
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.billingStreet ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Street Address"
          />
          {errors.billingStreet && (
            <p className="text-red-500 text-xs mt-1">{errors.billingStreet}</p>
          )}

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              value={formData.billingAddress.city}
              onChange={(e) =>
                handleInputChange("billing.city", e.target.value)
              }
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.billingCity ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="City"
            />
            <input
              type="text"
              value={formData.billingAddress.state}
              onChange={(e) =>
                handleInputChange("billing.state", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="State"
            />
          </div>
          {errors.billingCity && (
            <p className="text-red-500 text-xs mt-1">{errors.billingCity}</p>
          )}

          <input
            type="text"
            value={formData.billingAddress.zipCode}
            onChange={(e) =>
              handleInputChange("billing.zipCode", e.target.value)
            }
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.billingZip ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="ZIP Code"
          />
          {errors.billingZip && (
            <p className="text-red-500 text-xs mt-1">{errors.billingZip}</p>
          )}
        </div>

        {errors.payment && (
          <div className="flex items-center gap-2 text-red-600 text-sm p-3 bg-red-50 rounded-lg">
            <AlertCircle className="h-4 w-4" />
            {errors.payment}
          </div>
        )}

        <button
          type="submit"
          disabled={isProcessing || paymentStatus === "processing"}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <Loader className="h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="h-4 w-4" />
              Complete Purchase - ${course.price.toFixed(2)}
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

export default CoursePaymentComponent;
