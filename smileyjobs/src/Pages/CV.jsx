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
  Play,
  Download,
  CreditCard,
  Lock,
  Shield,
  AlertCircle,
  Loader,
  X,
  ExternalLink,
} from "lucide-react";

// Simple MD5 implementation (replace CryptoJS dependency)
const md5 = (string) => {
  function rotateLeft(value, amount) {
    const lbits = (value << amount) | (value >>> (32 - amount));
    return lbits;
  }

  function addUnsigned(x, y) {
    const x4 = (x & 0x40000000);
    const y4 = (y & 0x40000000);
    const x8 = (x & 0x80000000);
    const y8 = (y & 0x80000000);
    const result = (x & 0x3FFFFFFF) + (y & 0x3FFFFFFF);
    if (x4 & y4) {
      return (result ^ 0x80000000 ^ x8 ^ y8);
    }
    if (x4 | y4) {
      if (result & 0x40000000) {
        return (result ^ 0xC0000000 ^ x8 ^ y8);
      } else {
        return (result ^ 0x40000000 ^ x8 ^ y8);
      }
    } else {
      return (result ^ x8 ^ y8);
    }
  }

  function f(x, y, z) { return (x & y) | ((~x) & z); }
  function g(x, y, z) { return (x & z) | (y & (~z)); }
  function h(x, y, z) { return (x ^ y ^ z); }
  function i(x, y, z) { return (y ^ (x | (~z))); }

  function ff(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(f(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function gg(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(g(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function hh(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(h(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function ii(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(i(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function convertToWordArray(string) {
    let lWordCount;
    const lMessageLength = string.length;
    const lNumberOfWords_temp1 = lMessageLength + 8;
    const lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
    const lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
    const lWordArray = Array(lNumberOfWords - 1);
    let lBytePosition = 0;
    let lByteCount = 0;
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
      lByteCount++;
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  }

  function wordToHex(lValue) {
    let wordToHexValue = '', wordToHexValue_temp = '', lByte, lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255;
      wordToHexValue_temp = '0' + lByte.toString(16);
      wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2);
    }
    return wordToHexValue;
  }

  const x = convertToWordArray(string);
  let a = 0x67452301;
  let b = 0xEFCDAB89;
  let c = 0x98BADCFE;
  let d = 0x10325476;

  for (let k = 0; k < x.length; k += 16) {
    const AA = a;
    const BB = b;
    const CC = c;
    const DD = d;
    a = ff(a, b, c, d, x[k + 0], 7, 0xD76AA478);
    d = ff(d, a, b, c, x[k + 1], 12, 0xE8C7B756);
    c = ff(c, d, a, b, x[k + 2], 17, 0x242070DB);
    b = ff(b, c, d, a, x[k + 3], 22, 0xC1BDCEEE);
    a = ff(a, b, c, d, x[k + 4], 7, 0xF57C0FAF);
    d = ff(d, a, b, c, x[k + 5], 12, 0x4787C62A);
    c = ff(c, d, a, b, x[k + 6], 17, 0xA8304613);
    b = ff(b, c, d, a, x[k + 7], 22, 0xFD469501);
    a = ff(a, b, c, d, x[k + 8], 7, 0x698098D8);
    d = ff(d, a, b, c, x[k + 9], 12, 0x8B44F7AF);
    c = ff(c, d, a, b, x[k + 10], 17, 0xFFFF5BB1);
    b = ff(b, c, d, a, x[k + 11], 22, 0x895CD7BE);
    a = ff(a, b, c, d, x[k + 12], 7, 0x6B901122);
    d = ff(d, a, b, c, x[k + 13], 12, 0xFD987193);
    c = ff(c, d, a, b, x[k + 14], 17, 0xA679438E);
    b = ff(b, c, d, a, x[k + 15], 22, 0x49B40821);
    a = gg(a, b, c, d, x[k + 1], 5, 0xF61E2562);
    d = gg(d, a, b, c, x[k + 6], 9, 0xC040B340);
    c = gg(c, d, a, b, x[k + 11], 14, 0x265E5A51);
    b = gg(b, c, d, a, x[k + 0], 20, 0xE9B6C7AA);
    a = gg(a, b, c, d, x[k + 5], 5, 0xD62F105D);
    d = gg(d, a, b, c, x[k + 10], 9, 0x2441453);
    c = gg(c, d, a, b, x[k + 15], 14, 0xD8A1E681);
    b = gg(b, c, d, a, x[k + 4], 20, 0xE7D3FBC8);
    a = gg(a, b, c, d, x[k + 9], 5, 0x21E1CDE6);
    d = gg(d, a, b, c, x[k + 14], 9, 0xC33707D6);
    c = gg(c, d, a, b, x[k + 3], 14, 0xF4D50D87);
    b = gg(b, c, d, a, x[k + 8], 20, 0x455A14ED);
    a = gg(a, b, c, d, x[k + 13], 5, 0xA9E3E905);
    d = gg(d, a, b, c, x[k + 2], 9, 0xFCEFA3F8);
    c = gg(c, d, a, b, x[k + 7], 14, 0x676F02D9);
    b = gg(b, c, d, a, x[k + 12], 20, 0x8D2A4C8A);
    a = hh(a, b, c, d, x[k + 5], 4, 0xFFFA3942);
    d = hh(d, a, b, c, x[k + 8], 11, 0x8771F681);
    c = hh(c, d, a, b, x[k + 11], 16, 0x6D9D6122);
    b = hh(b, c, d, a, x[k + 14], 23, 0xFDE5380C);
    a = hh(a, b, c, d, x[k + 1], 4, 0xA4BEEA44);
    d = hh(d, a, b, c, x[k + 4], 11, 0x4BDECFA9);
    c = hh(c, d, a, b, x[k + 7], 16, 0xF6BB4B60);
    b = hh(b, c, d, a, x[k + 10], 23, 0xBEBFBC70);
    a = hh(a, b, c, d, x[k + 13], 4, 0x289B7EC6);
    d = hh(d, a, b, c, x[k + 0], 11, 0xEAA127FA);
    c = hh(c, d, a, b, x[k + 3], 16, 0xD4EF3085);
    b = hh(b, c, d, a, x[k + 6], 23, 0x4881D05);
    a = hh(a, b, c, d, x[k + 9], 4, 0xD9D4D039);
    d = hh(d, a, b, c, x[k + 12], 11, 0xE6DB99E5);
    c = hh(c, d, a, b, x[k + 15], 16, 0x1FA27CF8);
    b = hh(b, c, d, a, x[k + 2], 23, 0xC4AC5665);
    a = ii(a, b, c, d, x[k + 0], 6, 0xF4292244);
    d = ii(d, a, b, c, x[k + 7], 10, 0x432AFF97);
    c = ii(c, d, a, b, x[k + 14], 15, 0xAB9423A7);
    b = ii(b, c, d, a, x[k + 5], 21, 0xFC93A039);
    a = ii(a, b, c, d, x[k + 12], 6, 0x655B59C3);
    d = ii(d, a, b, c, x[k + 3], 10, 0x8F0CCC92);
    c = ii(c, d, a, b, x[k + 10], 15, 0xFFEFF47D);
    b = ii(b, c, d, a, x[k + 1], 21, 0x85845DD1);
    a = ii(a, b, c, d, x[k + 8], 6, 0x6FA87E4F);
    d = ii(d, a, b, c, x[k + 15], 10, 0xFE2CE6E0);
    c = ii(c, d, a, b, x[k + 6], 15, 0xA3014314);
    b = ii(b, c, d, a, x[k + 13], 21, 0x4E0811A1);
    a = ii(a, b, c, d, x[k + 4], 6, 0xF7537E82);
    d = ii(d, a, b, c, x[k + 11], 10, 0xBD3AF235);
    c = ii(c, d, a, b, x[k + 2], 15, 0x2AD7D2BB);
    b = ii(b, c, d, a, x[k + 9], 21, 0xEB86D391);
    a = addUnsigned(a, AA);
    b = addUnsigned(b, BB);
    c = addUnsigned(c, CC);
    d = addUnsigned(d, DD);
  }

  const temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
  return temp.toLowerCase();
};

// PayFast Payment Component - Fixed Version
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

      // Generate signature (merchant_key is excluded from signature calculation)
      // const signature = generateSignature(config, passphrase);

      // Final config includes signature AND merchant_key
      // merchant_key is NOT used in signature but IS sent to PayFast
      const finalConfig = {
        ...config,  // This includes merchant_key
        // signature: signature,
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
        <div
          className="h-2 w-2 rounded-full bg-green-500"
          title="SSL Verified"
        />
        <div
          className="h-2 w-2 rounded-full bg-green-500"
          title="PCI DSS Compliant"
        />
        <div
          className="h-2 w-2 rounded-full bg-green-500"
          title="Bank Grade Security"
        />
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

export default function JobSeekersLanding() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    lookingFor: "",
    careerGoals: "",
  });

  const [showBooking, setShowBooking] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.age &&
      formData.lookingFor &&
      formData.careerGoals
    ) {
      setShowBooking(true);
    } else {
      alert("Please fill in all fields before submitting.");
    }
  };

  const handleBookWorkshop = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (result) => {
    console.log("Payment successful:", result);
    setShowPaymentModal(false);
    alert("Payment successful! Check your email for workshop access details.");
  };

  const handlePaymentError = (error) => {
    console.error("Payment failed:", error);
    alert("Payment failed. Please try again or contact support.");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* PayFast Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-slate-800 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Complete Your Workshop Booking
              </h2>
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
                  id: "job-seekers-workshop",
                  title: "Job Seekers Premium Workshop",
                  price: 299,
                  currency: "ZAR",
                  description: "Land the Right Opportunity—Not Just Any Job",
                }}
                userDetails={formData}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
                onClose={() => setShowPaymentModal(false)}
                // PayFast settings - replace with your actual credentials
                merchantId="31247903"  // Replace with your actual merchant_id
                merchantKey="yc5yhiddqxjlk"  // Replace with your actual merchant_key  
                passphrase=""  // Replace with your actual passphrase (leave empty if none)
                sandbox={false} // Set to false for production
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
                  <p>
                    Apply everywhere, hoping something sticks ("spray and pray")
                  </p>
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
                  <p>
                    Don't know how to show real motivation or the right attitude
                  </p>
                </div>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <p>
                    Miss out because they can't tell their story confidently
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-red-900 border-l-4 border-red-500 p-6 rounded-lg">
              <p className="text-lg font-semibold">
                <strong>Result?</strong> They disappear into the pile—or end up
                in roles that don't suit them or their future.
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
              This is not just another "how to write a CV" session. It's a
              premium workshop for young people and first-time job seekers who
              want to:
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-800 text-white p-6 rounded-lg">
                <CheckCircle className="w-8 h-8 mb-4 mx-auto text-yellow-400" />
                <p className="font-semibold">
                  Land a learnership or job that actually fits
                </p>
              </div>
              <div className="bg-slate-800 text-white p-6 rounded-lg">
                <Star className="w-8 h-8 mb-4 mx-auto text-yellow-400" />
                <p className="font-semibold">
                  Stand out with a recruiter-ready CV and video pitch
                </p>
              </div>
              <div className="bg-slate-800 text-white p-6 rounded-lg">
                <Target className="w-8 h-8 mb-4 mx-auto text-yellow-400" />
                <p className="font-semibold">
                  Apply for the right roles, for the right reasons
                </p>
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
                <p className="text-gray-700">
                  Craft your first real, recruiter-approved CV using SA
                  templates and best practices
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-yellow-400">
                <Target className="w-8 h-8 mb-4 text-yellow-500" />
                <h3 className="font-bold text-lg mb-2">
                  Purposeful Application Strategy
                </h3>
                <p className="text-gray-700">
                  Research and target opportunities that fit your interests,
                  geography, and potential
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-yellow-400">
                <Mail className="w-8 h-8 mb-4 text-yellow-500" />
                <h3 className="font-bold text-lg mb-2">
                  Motivational Letter & Email Skills
                </h3>
                <p className="text-gray-700">
                  Write short, authentic letters that show why you want this
                  role
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-yellow-400">
                <Play className="w-8 h-8 mb-4 text-yellow-500" />
                <h3 className="font-bold text-lg mb-2">
                  Video Pitch Confidence
                </h3>
                <p className="text-gray-700">
                  Record a short, winning video intro—even if you're nervous
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-yellow-400">
                <Users className="w-8 h-8 mb-4 text-yellow-500" />
                <h3 className="font-bold text-lg mb-2">Interview Readiness</h3>
                <p className="text-gray-700">
                  Practice common questions and build confidence for your first
                  real interview
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-yellow-400">
                <CheckCircle className="w-8 h-8 mb-4 text-yellow-500" />
                <h3 className="font-bold text-lg mb-2">
                  Psychometric & Self-Knowledge Tools
                </h3>
                <p className="text-gray-700">
                  Discover your strengths and present yourself with honesty and
                  pride
                </p>
              </div>
            </div>
            <div className="mt-12 text-center">
              <button
                className="bg-yellow-400 text-black p-6 rounded-lg inline-block font-semibold hover:bg-yellow-500 transition duration-200"
                onClick={() =>
                  alert(
                    "This is only available after you have completed the workshop."
                  )
                }
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
                <p className="font-semibold">
                  Our learners get interviews and finish programmes
                </p>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg">
                <Users className="w-8 h-8 mb-4 mx-auto text-yellow-400" />
                <p className="font-semibold">
                  Fewer dropouts, more success stories
                </p>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg">
                <Award className="w-8 h-8 mb-4 mx-auto text-yellow-400" />
                <p className="font-semibold">
                  Build a reputation for quality, not quantity
                </p>
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
                <p className="text-sm">
                  per learner (includes all resources & templates)
                </p>
                <p className="text-xs mt-1 text-gray-700">
                  💳 Secure PayFast checkout
                </p>
              </div>
              <div className="bg-slate-100 p-6 rounded-lg">
                <MapPin className="w-8 h-8 mb-2 mx-auto text-slate-700" />
                <p className="font-semibold">Online</p>
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
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-lg mb-4">
                  "I didn't just get a CV—I learned how to tell my story and get
                  the job I actually wanted."
                </p>
                <p className="text-sm text-gray-300">
                  - Sarah M., Marketing Learner
                </p>
              </div>
              <div className="bg-slate-800 text-white p-8 rounded-lg">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-lg mb-4">
                  "I stopped wasting time on jobs that didn't fit me. Now I know
                  what I want, and how to go for it."
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
                    <label className="block text-sm font-medium mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
                      placeholder="e.g. 012 345 6789"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Age *
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
                      placeholder="18"
                      min="16"
                      max="65"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Are you looking for a learnership, internship, or job? *
                    </label>
                    <select
                      name="lookingFor"
                      value={formData.lookingFor}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
                      required
                    >
                      <option value="">Select an option</option>
                      <option value="learnership">Learnership</option>
                      <option value="internship">Internship</option>
                      <option value="job">Job</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Area of interest / career goals *
                    </label>
                    <textarea
                      name="careerGoals"
                      value={formData.careerGoals}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
                      placeholder="Tell us about your interests and career aspirations..."
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
                <h3 className="text-2xl font-semibold mb-6">
                  Step 2: Book and pay securely with PayFast
                </h3>
                <p className="text-lg mb-8">
                  Secure your seat and get ready to stand out!
                </p>
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
              <a
                href="https://www.skillsbureau.co.za/training-providers"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-slate-700 transition duration-200"
              >
                Find out more
              </a>
              <a
                href="https://outlook.office.com/book/SkillsBureauBookingsForm@skillsbureau.co.za/?ismsaljsauthenabled=true"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-slate-700 transition duration-200"
              >
                Book Meeting For Learner Recruitment Solutions
              </a>
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
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600 flex-wrap">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span>Payments secured by PayFast</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <span>PCI DSS Level 1 Compliant</span>
              <span className="hidden sm:inline">•</span>
              <span>All major South African banks</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              PayFast is South Africa's most trusted payment gateway, processing
              millions of transactions for thousands of businesses.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}