import React from "react";
import { motion } from "framer-motion";
import { FaPhoneSquareAlt } from "react-icons/fa";

export default function Director() {
  const directors = [
    {
      name: "জিল্লুর রহমান জীবন",
      phone: "01611-482848",
      photo: "jibon.png",
    },
    {
      name: "জিহাদুর রহমান নয়ন",
      phone: "01619-756262",
      photo: "noyon.png",
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-white via-blue-50/40 to-red-50/30 overflow-hidden">
      {/* Decorative Background Blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#e74c3c]/15 blur-3xl rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#2c3e50]/15 blur-[120px] rounded-full animate-float-slow"></div>

      <div className="relative z-10 mx-auto w-11/12 max-w-6xl text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-extrabold text-[#2c3e50]"
        >
          আমাদের <span className="text-[#e74c3c]">পরিচালকবৃন্দ</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-600 max-w-2xl mx-auto mt-3 mb-14 text-lg"
        >
          টপলাইন একাডেমির পরিচালনায় যারা নেতৃত্ব দিচ্ছেন
        </motion.p>

        {/* Director Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {directors.map((director, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="group bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 overflow-hidden relative"
            >
              {/* Accent Gradient Border on Hover */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#e74c3c] transition-all duration-500"></div>

              {/* Director Photo */}
              <div className="w-36 h-36 mx-auto rounded-full overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-500">
                <img
                  src={director.photo}
                  alt={director.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <h3 className="mt-6 text-2xl font-bold text-[#2c3e50] group-hover:text-[#e74c3c] transition-colors">
                {director.name}
              </h3>

              {/* Phone */}
              <p className="text-gray-700 flex items-center gap-1 justify-center mt-2 text-lg">
                <FaPhoneSquareAlt></FaPhoneSquareAlt>
                <span className="font-medium">{director.phone}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
