import Lottie from "lottie-react";
import topper from "../assets/topper.json";
import pattern from "../assets/images/memphis-colorful.png";
import { Link } from "react-router";

export default function Hero() {
  return (
    <section className="relative flex flex-col justify-center overflow-hidden py-10">
      {/* Soft overlay */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>

      {/* Decorative shapes */}
      <div className="absolute -top-16 -left-16 w-40 h-40 bg-[#e74c3c]/30 rounded-full animate-spin-slow"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#2c3e50]/20 rounded-xl rotate-45 animate-float-slow"></div>
      <div className="absolute top-20 right-1/4 w-24 h-24 bg-yellow-400/20 rounded-full animate-ping-slow"></div>

      {/* Content */}
      <div className="relative z-10 w-11/12 mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* Left - Text */}
        <div className="md:w-1/2 flex flex-col gap-6 relative">
          {/* Smart Admission Banner */}
          <div className="relative w-full max-w-md mx-auto mb-6">
            {/* Background layered shapes */}
            <div className="absolute -top-4 -left-6 w-6 h-6 bg-[#f39c12] rounded-full animate-spin-slow opacity-80"></div>
            <div className="absolute -bottom-4 right-0 w-10 h-10 bg-[#e74c3c] rounded-lg rotate-12 animate-float-slow opacity-70"></div>
            <div className="absolute -bottom-6 left-1/2 w-5 h-5 bg-[#3498db] rounded-full animate-pulse-slow"></div>

            <div className="relative w-full max-w-lg mx-auto">
              {/* Animated background glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#e74c3c] via-[#f1c40f] to-[#e74c3c] rounded-3xl blur-xl opacity-70 animate-animateGlow"></div>
            </div>
          </div>

          {/* Main Heading */}
          <div className="bg-white md:bg-inherit p-5 md:p-0 shadow md:shadow-none rounded-md">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-[#2c3e50]">
              আপনার সন্তান —
              <span className="block mt-2 bg-linear-to-r from-[#2c3e50] via-[#e74c3c] to-[#2c3e50] bg-clip-text text-transparent animate-pulse">
                আমাদের যত্ন ও প্রতিশ্রুতি
              </span>
            </h1>

            <p className="text-gray-700 md:text-lg leading-relaxed">
              <span className="font-semibold text-[#2c3e50]">
                বিরুনীয়া বাজারে
              </span>{" "}
              অবস্থিত, নিরাপদ ও সৃজনশীল পরিবেশে শিশুদের গড়ে তোলা হয় আদর্শ ও
              নৈতিক মানসম্পন্ন নাগরিক হিসেবে।
              <span className="secondary-text">
                টপলাইন একাডেমি শুধু পড়াশোনায় নয়, নৈতিকতাতেও নেতৃত্ব দেয়।
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mt-6">
              <Link
                to="/login"
                className="px-8 py-3 bg-linear-to-r from-[#e74c3c] to-[#c0392b] text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-500"
              >
                লগিন করুন
              </Link>
              <Link
                to="/about"
                className="px-8 py-3 border-2 border-[#e74c3c] text-[#e74c3c] font-semibold rounded-xl hover:bg-[#e74c3c]/10 hover:scale-105 shadow-md transition-transform duration-500"
              >
                আরও জানুন
              </Link>
            </div>
          </div>
        </div>

        {/* Right - Lottie Animation */}
        <div className="md:w-1/2 flex justify-center items-center animate-slideInRight">
          <div className="w-4/5 md:w-full animate-float-smooth drop-shadow-md">
            <Lottie animationData={topper} loop={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
