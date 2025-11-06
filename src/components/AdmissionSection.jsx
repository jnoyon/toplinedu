import React from "react";
import { motion } from "framer-motion";
import uniformBoy from "../assets/images/boy.png";
import uniformGirl from "../assets/images/girl.png";

export default function AdmissionSection() {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{
        backgroundImage: `url('/assets/images/memphis-colorful.png')`,
        backgroundRepeat: "repeat",
        backgroundSize: "400px 400px",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/70 to-red-50/50 backdrop-blur-sm"></div>

      {/* Decorative Blurs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#e74c3c]/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] bg-[#2c3e50]/10 blur-[140px] rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12 items-stretch">
        {/* Left: Admission Info */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex-1 bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden"
        >
          {/* Floating Accent */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-100 rounded-full blur-2xl opacity-50 animate-float-slow"></div>

          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-[#2c3e50]">
            ভর্তি <span className="text-[#e74c3c]">সংক্রান্ত তথ্য</span>
          </h2>

          <ul className="list-disc list-inside space-y-3 text-gray-800 text-lg leading-relaxed">
            <li>
              <strong>ভর্তি যোগ্যতা:</strong> ৪-৭ বছর (প্লে গ্রুপ, নার্সারি এবং
              ওয়ান)
            </li>
            <li>
              <strong>প্রয়োজনীয় কাগজপত্র:</strong> জন্মনিবন্ধন সনদ, অভিভাবকের
              পরিচয়পত্র, শিশুর ছবি
            </li>
            <li>
              <strong>ভর্তি ফি ও মাসিক ফি:</strong> বিস্তারিত তথ্য অফিস থেকে
              পাওয়া যাবে
            </li>
            <li>
              <strong>ভর্তি প্রক্রিয়া:</strong> অফিস থেকে ভর্তি ফরম সংগ্রহ করে
              পূরণ করে জমা দিতে হবে।
            </li>
          </ul>

          {/* Student Kit Section */}
          <div className="mt-10 bg-gradient-to-r from-green-50 via-green-100/80 to-green-50 border-l-4 border-green-500 rounded-2xl shadow-inner p-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-40 h-40 bg-green-200/40 blur-3xl rounded-full"></div>
            <h3 className="font-semibold text-xl text-green-800 mb-3">
              ভর্তি হওয়ার পর প্রতিটি শিক্ষার্থীকে দেওয়া হবে —
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 text-base">
              <li>স্কুল ডায়েরি প্রদান করা হবে।</li>
              <li>ক্লাস শিডিউল ও রুটিন প্রদান করা হবে।</li>
              <li>অভিভাবকদের জন্য নির্দেশনা সংবলিত নোট থাকবে।</li>
            </ul>
          </div>
        </motion.div>

        {/* Right: Uniform Section */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex-1 bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden"
        >
          <div className="absolute -bottom-12 -right-12 w-52 h-52 bg-blue-100 rounded-full blur-2xl opacity-50 animate-pulse-slow"></div>

          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-[#2c3e50]">
            স্কুল <span className="text-[#e74c3c]">ড্রেস</span>
          </h2>

          <p className="text-gray-800 mb-8 text-lg leading-relaxed">
            আমাদের স্কুলে ছাত্র ও ছাত্রীদের জন্য নির্ধারিত ইউনিফর্ম রয়েছে। এটি
            আরামদায়ক, পরিচ্ছন্ন এবং সক্রিয়তা-বান্ধব। নিচে উদাহরণ দেখুন:
          </p>

          <div className="flex flex-col sm:flex-row gap-8 items-center justify-center">
            {/* Boy Uniform */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center bg-white rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <img
                src={uniformBoy}
                alt="Boy Uniform"
                className="w-40 mx-auto rounded-xl mb-3"
              />
              <p className="text-gray-700 font-semibold">ছেলের ড্রেস</p>
            </motion.div>

            {/* Girl Uniform */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center bg-white rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <img
                src={uniformGirl}
                alt="Girl Uniform"
                className="w-40 mx-auto rounded-xl mb-3"
              />
              <p className="text-gray-700 font-semibold">মেয়ের ড্রেস</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
