import React, { useState } from "react";
import {
  Shield,
  CreditCard,
  Lock,
  AlertCircle,
  Loader,
  ExternalLink,
} from "lucide-react";
import { md5 } from "../utils/md5.js";

const PayFastPaymentComponent = ({
  course = {
    id: "job-seekers-workshop",
    title: "Job Seekers Premium Workshop",
    price: 299,
    currency: "ZAR",
    description: "Land the Right Opportunity—Not Just Any Job",
  },
  userDetails = {},
  onPaymentSuccess = () => {},
  onPaymentError = () => {},
  onClose = () => {},
  // PayFast credentials - replace with your actual merchant details
  merchantId = "31247903",
  merchantKey = "yc5yhiddqxjlk",
  passphrase = "", // Optional passphrase for additional security
  sandbox = false, // Set to false for production
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const [errors, setErrors] = useState([]);
  
  const payfastUrl = sandbox
    ? "https://sandbox.payfast.co.za/eng/process"
    : "https://www.payfast.co.za/eng/process";

  // Validate form data
  const validateFormData = () => {
    const validationErrors = [];
    
    if (!userDetails.name || userDetails.name.trim().length < 2) {
      validationErrors.push("Name is required and must be at least 2 characters");
    }
    
    if (!userDetails.email || !/\S+@\S+\.\S+/.test(userDetails.email)) {
      validationErrors.push("Valid email address is required");
    }
    
    if (!userDetails.phone || userDetails.phone.replace(/\D/g, "").length < 10) {
      validationErrors.push("Valid phone number with at least 10 digits is required");
    }

    return validationErrors;
  };

  const getPayfastConfig = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://yoursite.com';
    
    // Clean phone number - remove all non-digits
    const cleanPhone = userDetails.phone ? userDetails.phone.replace(/\D/g, "") : "";
    
    // Split name properly
    const nameParts = (userDetails.name || "").trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    const config = {
      // Merchant details
      merchant_id: String(merchantId).trim(),
      merchant_key: String(merchantKey).trim(),
      
      // URLs
      return_url: `${baseUrl}/payment-success`,
      cancel_url: `${baseUrl}/payment-cancelled`, 
      notify_url: `${baseUrl}/api/payfast-notify`,
      
      // Payment details
      amount: parseFloat(course.price).toFixed(2),
      item_name: course.title.substring(0, 100), // PayFast has length limits
      item_description: course.description.substring(0, 255),
      
      // Customer details
      name_first: firstName.substring(0, 100),
      name_last: lastName.substring(0, 100),
      email_address: (userDetails.email || "").trim(),
      
      // Custom fields (optional)
      custom_str1: course.id.substring(0, 100),
      custom_str2: (userDetails.lookingFor || "").substring(0, 100),
      custom_str3: String(userDetails.age || "").substring(0, 100),
    };

    // Only add cell_number if we have a valid one (10+ digits)
    if (cleanPhone && cleanPhone.length >= 10) {
      config.cell_number = cleanPhone;
    }

    // Only add custom fields if they have values
    if (!config.custom_str2) delete config.custom_str2;
    if (!config.custom_str3) delete config.custom_str3;

    return config;
  };

  const generateSignature = (data, passphrase = "") => {
    // Create clean data object - remove empty values and merchant_key
    const cleanData = {};
    
    Object.keys(data).forEach((key) => {
      const value = data[key];
      // Include all non-empty values, but exclude merchant_key from signature calculation
      if (value !== "" && value !== null && value !== undefined ) {
        cleanData[key] = String(value).trim();
      }
    });

    console.log("Clean data for signature:", cleanData);

    // Sort keys alphabetically (PayFast requirement)
    const sortedKeys = Object.keys(cleanData).sort();
    console.log("Sorted keys:", sortedKeys);

    // Build query string - PayFast requires NO URL encoding in signature string
    let queryString = sortedKeys
      .map((key) => {
        const value = cleanData[key];
        // PayFast signature string should NOT be URL encoded
        return `${key}=${value}`;
      })
      .join("&");

    // Add passphrase if provided (also not URL encoded)
    if (passphrase && passphrase.trim() !== "") {
      queryString += `&passphrase=${passphrase.trim()}`;
    }

    console.log("PayFast signature string (raw):", queryString);

    // Generate MD5 hash
    const signature = md5(queryString);
    console.log("Generated signature:", signature);
    
    return signature;
  };

  const handlePayFastPayment = () => {
    // Validate form data first
    const validationErrors = validateFormData();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    setIsProcessing(true);
    setPaymentStatus("processing");

    try {
      const config = getPayfastConfig();
      console.log("PayFast config before signature:", config);

      // Validate required fields
      if (!config.merchant_id || !config.merchant_key) {
        throw new Error("Merchant ID and Key are required");
      }

      if (!config.amount || parseFloat(config.amount) <= 0) {
        throw new Error("Invalid amount");
      }

      if (!config.item_name) {
        throw new Error("Item name is required");
      }

      // Final config includes merchant_key (NOT used in signature but IS sent to PayFast)
      const finalConfig = {
        ...config,  // This includes merchant_key
      };

      console.log("Final PayFast config (with merchant_key for submission):", finalConfig);

      // Create form and submit to PayFast
      const form = document.createElement("form");
      form.method = "POST";
      form.action = payfastUrl;
      form.target = "_blank";
      form.style.display = "none";

      // Add all parameters as hidden inputs (including merchant_key)
      Object.keys(finalConfig).forEach((key) => {
        const value = finalConfig[key];
        if (value !== "" && value !== null && value !== undefined) {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = String(value);
          form.appendChild(input);
          console.log(`Added field: ${key} = ${key === 'merchant_key' ? '[HIDDEN]' : value}`);
        }
      });

      document.body.appendChild(form);
      
      // Debug: log form data before submission (hide sensitive data)
      console.log("Form being submitted to PayFast:");
      const formData = new FormData(form);
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${key === 'merchant_key' ? '[HIDDEN]' : value}`);
      }
      
      form.submit();
      document.body.removeChild(form);

      setTimeout(() => {
        setPaymentStatus("redirected");
        setIsProcessing(false);
      }, 1000);
    } catch (error) {
      console.error("PayFast payment error:", error);
      setPaymentStatus("error");
      setIsProcessing(false);
      setErrors([error.message || "Payment setup failed"]);
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

  // Show redirect confirmation
  if (paymentStatus === "redirected") {
    return (
      <div className="text-center">
        <ExternalLink className="h-16 w-16 text-blue-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Redirected to PayFast
        </h3>
        <p className="text-gray-600 mb-6">
          Complete your payment on the PayFast secure payment page that just opened.
        </p>
        <div className="space-y-3">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Next steps:</strong>
            </p>
            <ul className="text-sm text-blue-700 mt-2 space-y-1">
              <li>• Complete payment on the PayFast page</li>
              <li>• You'll be redirected back after payment</li>
              <li>• Check your email for workshop access details</li>
            </ul>
          </div>
          <button
            className="w-full bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            onClick={onClose}
          >
            Close This Window
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Course Details */}
      <div className="mb-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900">{course.title}</h4>
          <p className="text-sm text-gray-600 mt-1">{course.description}</p>
          <p className="text-2xl font-bold text-yellow-600 mt-2">
            R{course.price.toFixed(2)} {course.currency}
          </p>
        </div>
      </div>

      <SecurityIndicator />

      {/* Validation Errors */}
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-800 mb-2">
            <AlertCircle className="h-4 w-4" />
            <span className="font-semibold">Please fix the following:</span>
          </div>
          <ul className="text-sm text-red-700 space-y-1">
            {errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* User Details Summary */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Booking Details</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Name:</span>
            <span className="font-medium">
              {userDetails.name || "Not provided"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Email:</span>
            <span className="font-medium">
              {userDetails.email || "Not provided"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Phone:</span>
            <span className="font-medium">
              {userDetails.phone || "Not provided"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Looking for:</span>
            <span className="font-medium capitalize">
              {userDetails.lookingFor || "Not specified"}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">
          Accepted Payment Methods
        </h4>
        <div className="grid grid-cols-3 gap-3 text-xs text-center">
          <div className="bg-white p-2 rounded border">
            <CreditCard className="h-4 w-4 mx-auto mb-1 text-blue-600" />
            <span>Credit Cards</span>
          </div>
          <div className="bg-white p-2 rounded border">
            <div className="h-4 w-4 mx-auto mb-1 bg-green-600 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">DC</span>
            </div>
            <span>Debit Cards</span>
          </div>
          <div className="bg-white p-2 rounded border">
            <div className="h-4 w-4 mx-auto mb-1 bg-blue-600 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">EFT</span>
            </div>
            <span>EFT</span>
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-2 text-center">
          All major South African banks supported • Visa • Mastercard
        </p>
      </div>

      {/* Error Display */}
      {paymentStatus === "error" && (
        <div className="flex items-center gap-2 text-red-600 text-sm p-3 bg-red-50 rounded-lg">
          <AlertCircle className="h-4 w-4" />
          Payment setup failed. Please check your details and try again.
        </div>
      )}

      {/* Important Notes */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h5 className="font-semibold text-amber-800 mb-2">Important Notes:</h5>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>• This will open PayFast in a new window</li>
          <li>• Complete payment details will be sent to your email</li>
          <li>• Workshop access will be provided within 24 hours</li>
          <li>• Contact support if you don't receive confirmation</li>
        </ul>
      </div>

      {/* Payment Button */}
      <button
        onClick={handlePayFastPayment}
        disabled={isProcessing || paymentStatus === "processing"}
        className="w-full bg-yellow-400 text-black py-3 px-4 rounded-lg font-semibold hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <Loader className="h-4 w-4 animate-spin" />
            Opening PayFast...
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" />
            Pay Securely with PayFast - R{course.price.toFixed(2)}
          </>
        )}
      </button>

      {/* Trust Indicators */}
      <div className="mt-4 text-xs text-gray-500 text-center space-y-1">
        <p>🔒 Powered by PayFast - PCI DSS Level 1 compliant</p>
        <p>💳 All major credit cards, debit cards, and EFT supported</p>
        <p>✅ Used by thousands of South African businesses</p>
        <p className="text-xs text-gray-400 mt-2">
          By completing this purchase, you agree to our Terms of Service
        </p>
      </div>

      {/* Sandbox Notice with Enhanced Debugging */}
      {sandbox && (
        <div className="bg-orange-100 border border-orange-300 rounded-lg p-3">
          <p className="text-xs text-orange-800 mb-2">
            <strong>Development Mode:</strong> Using PayFast sandbox for testing.
          </p>
          <details className="text-xs text-orange-700">
            <summary className="cursor-pointer hover:text-orange-900">Show Debug Info & Signature Test</summary>
            <div className="mt-2 p-2 bg-orange-50 rounded border font-mono text-xs">
              <p><strong>Merchant ID:</strong> {merchantId}</p>
              <p><strong>Sandbox URL:</strong> {payfastUrl}</p>
              <p><strong>User Email:</strong> {userDetails.email}</p>
              <p><strong>Amount:</strong> R{course.price}</p>
              <p><strong>Has Passphrase:</strong> {passphrase ? 'Yes' : 'No'}</p>
              
              <button 
                onClick={() => {
                  const config = getPayfastConfig();
                  const sig = generateSignature(config, passphrase);
                  console.log("Test signature generation:");
                  console.log("Config:", config);
                  console.log("Generated signature:", sig);
                  alert(`Signature generated: ${sig}\nCheck console for details.`);
                }}
                className="mt-2 px-2 py-1 bg-orange-200 text-orange-800 rounded text-xs hover:bg-orange-300"
              >
                Test Signature Generation
              </button>
            </div>
          </details>
          <p className="text-xs text-orange-600 mt-2">
            💡 <strong>PayFast Integration Rules:</strong>
            <br />• merchant_key is REQUIRED in form submission
            <br />• merchant_key is EXCLUDED from signature calculation
            <br />• Signature uses raw values (no URL encoding)
            <br />• All fields must be alphabetically sorted for signature
            <br />• Check console logs for exact signature string
          </p>
        </div>
      )}
    </div>
  );
};

export default PayFastPaymentComponent;