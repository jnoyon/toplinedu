import React from "react";
import { Link } from "react-router";
import {
  FaUserPlus,
  FaChalkboardTeacher,
  FaClipboardCheck,
  FaBell,
  FaEdit,
  FaBookReader,
  FaMoneyBillWave,
} from "react-icons/fa";
import { Book } from "lucide-react";

export default function DashboardHome() {
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const isAdmin = userData.role === "admin";

  return (
    <div className="w-11/12 mx-auto py-8 space-y-6">
      {/* ▶ Dashboard Menu */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        <Link
          to="/dashboard/attendance"
          className="group bg-white rounded-xl p-6 shadow hover:shadow-xl transition transform hover:-translate-y-1 text-center"
        >
          <FaClipboardCheck className="text-5xl text-blue-600 mx-auto mb-3 group-hover:scale-110 transition" />
          <h3 className="font-bold text-lg">উপস্থিতি যোগ করুন</h3>
        </Link>

        <Link
          to="/dashboard/exams"
          className="group bg-white rounded-xl p-6 shadow hover:shadow-xl transition transform hover:-translate-y-1 text-center"
        >
          <FaBookReader className="text-5xl text-indigo-600 mx-auto mb-3 group-hover:scale-110 transition" />
          <h3 className="font-bold text-lg">পরীক্ষার ফলাফল দিন</h3>
        </Link>

        <Link
          to="/dashboard/admission"
          className="group bg-white rounded-xl p-6 shadow hover:shadow-xl transition transform hover:-translate-y-1 text-center"
        >
          <FaUserPlus className="text-5xl text-indigo-600 mx-auto mb-3 group-hover:scale-110 transition" />
          <h3 className="font-bold text-lg">শিক্ষার্থী যুক্ত করুন</h3>
        </Link>

        {/* Admin Only Menu Items */}
        {isAdmin && (
          <>
            <Link
              to="/dashboard/addfee"
              className="group bg-white rounded-xl p-6 shadow hover:shadow-xl transition transform hover:-translate-y-1 text-center"
            >
              <FaMoneyBillWave className="text-5xl text-green-600 mx-auto mb-3 group-hover:scale-110 transition" />
              <h3 className="font-bold text-lg">ফি যুক্ত করুন</h3>
            </Link>

            <Link
              to="/dashboard/maktab-reports"
              className="group bg-white rounded-xl p-6 shadow hover:shadow-xl transition transform hover:-translate-y-1 text-center"
            >
              <Book className="text-5xl text-green-600 mx-auto mb-3 group-hover:scale-110 transition" />
              <h3 className="font-bold text-lg">মক্তব রিপোর্ট</h3>
            </Link>

            <Link
              to="/dashboard/statistics"
              className="group bg-white rounded-xl p-6 shadow hover:shadow-xl transition transform hover:-translate-y-1 text-center"
            >
              <FaClipboardCheck className="text-5xl text-red-500 mx-auto mb-3 group-hover:scale-110 transition" />
              <h3 className="font-bold text-lg">পরিসংখ্যান</h3>
            </Link>

            <Link
              to="/dashboard/notices"
              className="group bg-white rounded-xl p-6 shadow hover:shadow-xl transition transform hover:-translate-y-1 text-center"
            >
              <FaBell className="text-5xl text-yellow-500 mx-auto mb-3 group-hover:scale-110 transition" />
              <h3 className="font-bold text-lg">নোটিশ দিন</h3>
            </Link>

            <Link
              to="/dashboard/add-teacher"
              className="group bg-white rounded-xl p-6 shadow hover:shadow-xl transition transform hover:-translate-y-1 text-center"
            >
              <FaUserPlus className="text-5xl text-green-600 mx-auto mb-3 group-hover:scale-110 transition" />
              <h3 className="font-bold text-lg">শিক্ষক যোগ করুন</h3>
            </Link>

            <Link
              to="/dashboard/teacher-list"
              className="group bg-white rounded-xl p-6 shadow hover:shadow-xl transition transform hover:-translate-y-1 text-center"
            >
              <FaChalkboardTeacher className="text-5xl text-red-500 mx-auto mb-3 group-hover:scale-110 transition" />
              <h3 className="font-bold text-lg">শিক্ষকের তালিকা</h3>
            </Link>
          </>
        )}

        <Link
          to="/dashboard/students"
          className="group bg-white rounded-xl p-6 shadow hover:shadow-xl transition transform hover:-translate-y-1 text-center"
        >
          <FaEdit className="text-5xl text-purple-600 mx-auto mb-3 group-hover:scale-110 transition" />
          <h3 className="font-bold text-lg">সকল শিক্ষার্থী</h3>
        </Link>
      </div>
    </div>
  );
}
