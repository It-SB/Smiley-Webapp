import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PayfastGuard = ({ children }) => {
  const location = useLocation();

  // ✅ Check PayFast query params
  const searchParams = new URLSearchParams(location.search);
  const hasPayfastParams = searchParams.has("pf_payment_id");

  // ✅ Safe check for referrer (only runs in browser)
  let fromPayfast = false;
  if (typeof document !== "undefined" && document.referrer) {
    fromPayfast = document.referrer.includes("payfast.io");
  }

  if (hasPayfastParams || fromPayfast) {
    return children; // allow access
  }

  // ❌ block direct/manual access
  return <Navigate to="/" replace />;
};

export default PayfastGuard;
