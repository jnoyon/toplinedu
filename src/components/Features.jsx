import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

function FeatureCard({ title, description, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.04 }}
      className="group relative bg-white/90 backdrop-blur-xl border border-gray-200 rounded-3xl p-7 shadow-xl hover:shadow-2xl transition-all overflow-hidden"
    >
      <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-[#e84118] to-[#192a56] rounded-l-3xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

      <div className="flex items-start gap-3">
        <CheckCircle className="text-[#e84118] mt-1 group-hover:scale-110 transition-transform duration-300" />
        <div>
          <h3 className="font-bold text-xl text-[#192a56] group-hover:text-[#e84118] transition-colors mb-1">
            {title}
          </h3>
          {description && (
            <p className="text-gray-700 leading-relaxed text-base">
              {description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Features() {
  const features = [
    {
      title: "ইংরেজি ও গণিতে শক্ত ভিত্তি গড়ে তোলা",
      description:
        "শিশুদের ইংরেজি এবং গনিতের ভিত্তি শক্ত করার জন্য বিশেষ গুরত্ব দেওয়া হয়",
    },
    {
      title: "শুদ্ধভাবে কোরআন শিক্ষা",
      description:
        "অভিজ্ঞ হাফেজের তত্বাবধানে প্রতিটি মুসলিম শিশুকে শুদ্ধভাবে কোরআন শিক্ষা দেওয়া হয়",
    },
    {
      title: "মাল্টিমিডিয়া ও স্মার্ট ক্লাস",
      description:
        "অ্যানিমেশন, ভিডিও ও স্মার্ট বোর্ডে শেখানোর ফলে শিশুরা দ্রুত বুঝতে পারে।",
    },
    {
      title: "মাসিক মূল্যায়নে অগ্রগতি যাচাই",
      description:
        "নিয়মিত পরীক্ষার মাধ্যমে শিশুর শেখার স্তর ও উন্নতি অভিভাবক সহজেই বুঝতে পারেন",
    },
    {
      title: "মূল্যবোধ ও আচরণ শিক্ষায় বিশেষ গুরুত্ব",
      description:
        "ভদ্রতা, আদব-কায়দা, দায়িত্ববোধ ও নৈতিকতা গড়ে তোলা হয় নিয়মিত চর্চার মাধ্যমে",
    },
    {
      title: "সুন্দর হাতের লেখা উন্নয়ন",
      description:
        "প্রতিদিনের বিশেষ রাইটিং প্র্যাকটিসে হাতের লেখা হয়ে ওঠে পরিষ্কার ও আকর্ষণীয়",
    },
    {
      title: "দুর্বল শিক্ষার্থীর জন্য অতিরিক্ত সহায়তা",
      description: "পিছিয়ে পড়া শিশুদের জন্য রয়েছে আলাদা কেয়ার ক্লাস",
    },
    {
      title: "প্রাইভেট পড়ার প্রয়োজন নেই",
      description: "ক্লাসেই বিষয়ভিত্তিক পরিষ্কার ব্যাখ্যা ও অনুশীলন করানো হয়",
    },
    {
      title: "ব্যক্তিগত অগ্রগতি মনিটরিং",
      description:
        "প্রত্যেক শিশুর অগ্রগতি পর্যবেক্ষণে আলাদা দায়িত্বপ্রাপ্ত শিক্ষক রয়েছেন",
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-[#fdfbfb] via-[#f3f7ff] to-[#ffeaea] overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#e84118]/10 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#192a56]/10 blur-[130px] rounded-full animate-float"></div>

      <div className="relative mx-auto w-11/12 max-w-7xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-extrabold mb-5 text-[#192a56]"
        >
          কেন <span className="text-[#e84118]">টপলাইন একাডেমিতে</span> ভর্তি
          করবেন?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-600 max-w-2xl mx-auto mb-14 text-lg"
        >
          আমরা শিশুদের একাডেমিক উৎকর্ষতা, নৈতিক মূল্যবোধ, চরিত্র গঠন এবং স্মার্ট
          জীবনদক্ষতা অর্জনে সহায়তা করি।
        </motion.p>

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
