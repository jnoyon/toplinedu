import React, { useEffect, useState } from "react";
import { FaPaperclip, FaUser, FaBell } from "react-icons/fa";
import { Link } from "react-router";
import { db } from "../../firebase/firebase.init.js";
import { collection, getDocs } from "firebase/firestore";

export default function PortalHome() {
  const [notices, setNotices] = useState([]);
  const [studentData, setStudentData] = useState({});

  // Fetch notices
  useEffect(() => {
    const fetchNotices = async () => {
      const snapshot = await getDocs(collection(db, "notices"));
      setNotices(snapshot.docs.map((d) => d.data()));
    };
    fetchNotices();
  }, []);

  // Fetch student data
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("studentData")) || {};
    setStudentData(data);
  }, []);

  const menu = [
    {
      link: "/profile",
      label: "রিপোর্ট কার্ড",
      color: "from-red-500 to-red-700",
      icon: <FaPaperclip />,
    },
    {
      link: "/guideline",
      label: "অভিভাবকের প্রতি",
      color: "from-blue-700 to-blue-900",
      icon: <FaPaperclip />,
    },
    {
      link: "/results",
      label: "ফলাফল দেখুন",
      color: "from-green-500 to-green-700",
      icon: <FaPaperclip />,
    },
    {
      link: "/routine",
      label: "পরীক্ষার সময়সূচী",
      color: "from-purple-600 to-purple-900",
      icon: <FaPaperclip />,
    },
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-red-50 min-h-screen py-8 px-4 sm:px-6 lg:px-10">
      <div className="flex flex-col gap-6 max-w-5xl mx-auto">
        {/* Student Info Card */}
        <div className="relative bg-gradient-to-tr from-white via-blue-50/60 to-white rounded-2xl shadow-xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 hover:scale-[1.02] transition-transform duration-300">
          {/* Image */}
          {studentData.imageUrl ? (
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-blue-200 shadow-md flex-shrink-0">
              <img
                src={studentData.imageUrl}
                alt="Student"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <FaUser className="text-6xl sm:text-7xl text-gray-400 flex-shrink-0" />
          )}

          {/* Info */}
          <div className="flex-1 flex flex-col gap-1 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              {studentData.name || "-"}
            </h2>
            <p className="text-gray-600  sm:text-base">
              পিতা: {studentData.fatherName || "-"}
            </p>
            <p className="text-gray-600 sm:text-base">
              মাতা: {studentData.motherName || "-"}
            </p>
            <p className="text-gray-600  sm:text-base">
              শ্রেণী: {studentData.grade || "-"}
            </p>

            <Link
              to="/profile"
              className="mt-2 self-center sm:self-start bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-1 rounded-full text-lg shadow-md hover:scale-105 transform transition-all"
            >
              বিস্তারিত
            </Link>
          </div>
        </div>

        {/* Notice Card */}
        <div className="relative bg-white rounded-2xl shadow-xl border-l-4 border-red-500 p-3 sm:p-4 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center gap-2 mb-2">
            <FaBell className="text-xl text-red-500" />
            <h2 className="text-lg sm:text-xl font-bold text-red-600">নোটিশ</h2>
          </div>

          {notices.length > 0 ? (
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {notices.map((n, i) => (
                <li
                  key={i}
                  className="bg-red-50 p-2 rounded-md shadow-sm hover:shadow-md transition-all cursor-pointer sm:text-base"
                >
                  {n.title || n.message}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-2 sm:text-base">
              কোনও নোটিশ পাওয়া যায়নি।
            </p>
          )}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {menu.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className="group relative bg-white rounded-xl p-3 sm:p-4 flex flex-col items-center shadow hover:shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white bg-gradient-to-br ${item.color} mb-2 sm:mb-3 shadow-md group-hover:animate-bounce`}
              >
                {item.icon}
              </div>
              <p className="font-semibold text-gray-800 text-center  sm:text-sm md:text-base">
                {item.label}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
