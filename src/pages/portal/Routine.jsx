import React from "react";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

export default function Routine() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-10 max-w-xl w-full flex flex-col items-center text-center hover:scale-[1.02] transition-transform duration-500">
        {/* Decorative Circle */}
        <div className="absolute -top-10 w-20 h-20 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 rounded-full animate-pulse opacity-70"></div>

        {/* Icon */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center shadow-lg mb-6 text-white text-4xl">
          <FaCalendarAlt />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4">
          পরীক্ষার শিডিউল
        </h1>

        {/* Message */}
        <p className="text-gray-600 text-base sm:text-lg mb-6">
          আমাদের শিক্ষার্থীদের জন্য পরীক্ষার সময়সূচী খুব শীঘ্রই প্রকাশ করা হবে।
        </p>

        {/* Clock Icon for visual flair */}
        <FaClock className="text-gray-400 text-3xl animate-bounce" />

        {/* Call-to-action (optional) */}
        <div className="mt-6">
          <p className="text-sm text-gray-500">
            টপলাইন একাডেমিতে ভর্তি হওয়ার জন্য আপনাকে ধন্যবাদ
          </p>
        </div>
      </div>
    </section>
  );
}
