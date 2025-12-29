import React, { useEffect, useState } from "react";
import { Link } from "react-router";

export default function AutoAlert() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user closed alert within last 7 days
    const lastClosed = localStorage.getItem("alertClosedAt");

    if (lastClosed) {
      const daysPassed =
        (Date.now() - parseInt(lastClosed, 10)) / (1000 * 60 * 60 * 24);

      if (daysPassed < 7) return; // Do not show alert
    }

    // Show alert after 3 seconds
    const timer = setTimeout(() => {
      setShow(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const closeAlert = () => {
    setShow(false);
    localStorage.setItem("alertClosedAt", Date.now().toString());
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fadeIn">
      <div
        role="alert"
        className="alert alert-vertical sm:alert-horizontal bg-white/90 shadow-xl border border-gray-200 backdrop-blur-md rounded-xl relative"
      >
        {/* CLOSE BUTTON */}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-info h-6 w-6 shrink-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>

        <div>
          <h3 className="font-bold text-[#2c3e50]">স্মার্ট রিপোর্ট কার্ড</h3>
          <div className="text-xs text-gray-600">
            শিক্ষার্থীর তথ্য দেখতে লগিন করুন
          </div>
        </div>

        <div className="flex gap-2">
          <Link to="/portal" className="btn btn-sm btn-primary">
            বিস্তারিত
          </Link>
          <button
            onClick={closeAlert}
            className=" btn btn-sm btn-error transition"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
