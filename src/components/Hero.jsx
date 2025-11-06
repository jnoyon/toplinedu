import Lottie from "lottie-react";
import topper from "../assets/topper.json";
import pattern from "../assets/images/memphis-colorful.png";
import { Link } from "react-router";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden py-10 bg-gradient-to-br from-blue-50 via-white to-red-50"
      style={{
        backgroundImage: `url(${pattern})`,
        backgroundRepeat: "repeat",
        backgroundSize: "400px 400px",
        backgroundBlendMode: "soft-light",
      }}
    >
      {/* Soft gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/40 to-transparent backdrop-blur-[2px]"></div>

      {/* Decorative Orbs */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-[#e74c3c]/15 blur-3xl rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#2c3e50]/15 blur-3xl rounded-full animate-float-slow"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 w-11/12 mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* Left Side - Text */}
        <div className="flex flex-col gap-6 md:w-1/2 bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.15)] transition-all duration-700 animate-slideInLeft">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-[#2c3e50]">
            আপনার সন্তান,{" "}
            <span className="text-[#e74c3c] drop-shadow-sm">
              আমাদের দায়িত্ব
            </span>{" "}
            —
            <span className="block mt-2 bg-gradient-to-r from-[#2c3e50] via-[#e74c3c] to-[#2c3e50] bg-clip-text text-transparent animate-pulse">
              ভালো মানুষ গড়ার প্রতিশ্রুতি
            </span>
          </h1>

          <p className="text-gray-700 md:text-lg leading-relaxed">
            <span className="font-semibold text-[#2c3e50]">টপলাইন একাডেমি</span>{" "}
            শিশুদের গড়ে তোলে আদব, কোরআন শিক্ষা ও সাধারণ জ্ঞানে সমৃদ্ধ প্রজন্ম
            হিসেবে। নিরাপদ ও অনুপ্রেরণামূলক পরিবেশে তারা শেখে, বেড়ে ওঠে এবং
            আলোকিত ভবিষ্যতের জন্য প্রস্তুত হয়।{" "}
            <span className="italic text-[#e74c3c]">
              টপলাইন একাডেমি শুধু পড়াশোনায় নয়, নৈতিকতাতেও নেতৃত্ব দেয়।
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">
            <Link
              to="/admission"
              className="px-8 py-3 bg-gradient-to-r from-[#e74c3c] to-[#c0392b] text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-500"
            >
              ভর্তি ফরম
            </Link>
            <Link
              to="/about"
              className="px-8 py-3 border-2 border-[#e74c3c] text-[#e74c3c] font-semibold rounded-xl hover:bg-[#e74c3c]/10 hover:scale-105 shadow-md transition-transform duration-500"
            >
              আরও জানুন
            </Link>
          </div>
        </div>

        {/* Right Side - Lottie Animation */}
        <div className="md:w-1/2 flex justify-center items-center animate-slideInRight">
          <div className="w-4/5 md:w-full animate-float-smooth drop-shadow-md">
            <Lottie animationData={topper} loop={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
