import React from "react";
import pattern from "../../assets/images/memphis-colorful.png";
import { FaCheckCircle } from "react-icons/fa";

export default function Guideline() {
  const guidelines = [
    "প্রতিদিন শিশুকে পর্যাপ্ত সময় দিন, গল্প করুন, বই দেখান এবং তার সঙ্গে কথা বলুন।",
    "শিশুর সামনে অতিরিক্ত মোবাইল ব্যবহার থেকে বিরত থাকুন — তারা বড়দের দেখেই শিখে।",
    "শিশুর হাতে স্মার্টফোন দেবেন না — খেলনা হিসেবে মোবাইল দেওয়ার অভ্যাস সম্পূর্ণ পরিহার করুন।",
    "শিশু যেন টিকটক, ইউটিউব ভিডিও বা মোবাইল গেমে আসক্ত না হয়ে পড়ে, সেদিকে সর্বোচ্চ নজর রাখুন। এগুলো সাময়িক আনন্দ দিলেও দীর্ঘমেয়াদে ক্ষতিকর।",
    "শিশুকে প্রতিদিন কিছু সময় মুক্তভাবে খেলতে দিন, যাতে সে স্বাভাবিকভাবে বেড়ে উঠতে পারে।",
    "শিশুর কথা মনোযোগ দিয়ে শুনুন এবং ধৈর্যের সঙ্গে তাকে বুঝিয়ে বলুন।",
    "শিশুর সামনে উচ্চস্বরে ঝগড়া বা রাগান্বিত আচরণ থেকে বিরত থাকুন।",
    "শিশুকে অবশ্যই নির্ধারিত ড্রেস পরিধান করিয়ে স্কুলে পাঠাবেন।",
    "শিশুর সামনে কখনো মিথ্যা কথা, গালিগালাজ বা খারাপ ভাষা ব্যবহার করবেন না — তারা খুব দ্রুত অনুকরণ করে।",
  ];

  return (
    <section
      className="relative min-h-screen py-16 flex flex-col items-center bg-gradient-to-br from-blue-50 via-white to-red-50 overflow-hidden"
      style={{
        backgroundImage: `url(${pattern})`,
        backgroundRepeat: "repeat",
        backgroundSize: "350px 350px",
      }}
    >
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>

      <div className="relative z-10 w-11/12 md:w-2/3 lg:w-1/2 flex flex-col gap-8">
        {/* Header */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#2c3e50] text-center">
          অভিভাবকদের প্রতি নির্দেশনা
        </h1>

        {/* Guidelines List */}
        <div className="flex flex-col gap-4">
          {guidelines.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 bg-white/80 p-4 md:p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
              <p className="text-gray-700 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
