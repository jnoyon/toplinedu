import React from "react";
import { motion } from "framer-motion";

function FeatureCard({ title, description, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03 }}
      className="group relative bg-white/80 backdrop-blur-md border border-gray-100 rounded-3xl p-6 shadow-md hover:shadow-2xl transition-all overflow-hidden"
    >
      {/* Animated accent bar */}
      <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#e74c3c] to-[#2c3e50] rounded-l-3xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

      <h3 className="font-bold text-xl text-[#2c3e50] group-hover:text-[#e74c3c] mb-3 transition-colors">
        {title}
      </h3>
      <p className="text-gray-700 leading-relaxed text-base">{description}</p>
    </motion.div>
  );
}

export default function Features() {
  const features = [
    {
      title: "শুদ্ধভাবে ক‌োরআন শিক্ষা",
      description:
        "প্রতিটি মুসলিম শিক্ষার্থীকে বাধ্যতামূলক কোরআন শিক্ষা ক্লাসে অংশগ্রহণ করতে হয়। এতে শিক্ষার্থীরা একদিকে জেনেরেল পড়াশোনা শিখবে অন্যদিকে শুদ্ধভাবে কোরআন শিখবে।",
    },
    {
      title: "স্মার্ট স্টুডেন্ট রিপোর্ট",
      description:
        "প্রতিটি শিক্ষার্থীর অভিভাবক মোবাইলের মাধ্যমে শিক্ষার্থীর উপস্থিতি, মার্ক এবং অন্যান্যদের সাথে তুলনামূলক অবস্থান দেখতে পারবে।",
    },
    {
      title: "নিবেদিত শিক্ষকমন্ডলী",
      description:
        "আমাদের শিক্ষকমন্ডলী অত্যন্ত নিবেদিত ও অভিজ্ঞ, যারা শিক্ষার্থীদের প্রতিটি বিষয়ে ভালোভাবে গাইড করে।",
    },
    {
      title: "মূল্যবোধ ও আচরণ শিক্ষা",
      description:
        "শিক্ষার্থীদের নৈতিক শিক্ষা, মূল্যবোধ ও সঠিক আচরণের প্রতি মনোযোগ দেওয়া হয়।",
    },
    {
      title: "মাসিক পরীক্ষা",
      description:
        "শিক্ষার্থীদের প্রতিমাসে পরীক্ষা নেওয়া হয়, যা তাদের পড়াশোনার মান যাচাই করতে সাহায্য করে।",
    },
    {
      title: "সেমিস্টার পরীক্ষা ও পুরস্কার",
      description:
        "সেমিস্টার শেষে নিয়মিত পরীক্ষা এবং শ্রেষ্ঠ শিক্ষার্থীদের জন্য পুরস্কার প্রদান করা হয়।",
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-white via-blue-50/40 to-red-50/30 overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#e74c3c]/10 blur-3xl rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2c3e50]/10 blur-[120px] rounded-full animate-float-slow"></div>

      <div className="relative mx-auto w-11/12 max-w-7xl text-center">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-extrabold mb-4 text-[#2c3e50]"
        >
          আমাদের <span className="text-[#e74c3c]">বৈশিষ্ট্যসমূহ</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-600 max-w-2xl mx-auto mb-12 text-lg"
        >
          টপলাইন এডুতে আমরা শিক্ষার্থীদের একাডেমিক উৎকর্ষতা, নৈতিক মূল্যবোধ ও
          স্মার্ট জীবনদক্ষতা অর্জনে সহায়তা করি।
        </motion.p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <FeatureCard
              key={idx}
              title={feature.title}
              description={feature.description}
              delay={idx * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
