import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  FaUserPlus,
  FaChalkboardTeacher,
  FaClipboardCheck,
  FaBell,
  FaEdit,
  FaBookReader,
} from "react-icons/fa";
import { db } from "../firebase/firebase.init";
import {
  collection,
  query,
  where,
  getCountFromServer,
} from "firebase/firestore";

export default function DashboardHome() {
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const isAdmin = userData.role === "admin";

  // ▶ State to store student counts
  const [counts, setCounts] = useState({
    play: 0,
    nursery: 0,
    one: 0,
    two: 0,
  });

  // ▶ Fetch counts from Firestore
  useEffect(() => {
    const fetchCounts = async () => {
      const usersRef = collection(db, "users");

      const playSnap = await getCountFromServer(
        query(usersRef, where("grade", "==", "প্লে"))
      );

      const nurserySnap = await getCountFromServer(
        query(usersRef, where("grade", "==", "নার্সারি"))
      );

      const oneSnap = await getCountFromServer(
        query(usersRef, where("grade", "==", "ওয়ান"))
      );
      const twoSnap = await getCountFromServer(
        query(usersRef, where("grade", "==", "টু"))
      );

      setCounts({
        play: playSnap.data().count,
        nursery: nurserySnap.data().count,
        one: oneSnap.data().count,
        two: twoSnap.data().count,
      });
    };

    fetchCounts();
  }, []);

  return (
    <div className="w-11/12 mx-auto py-8">
      {/* ▶ Updated Stats Section */}
      <div className="stats w-full shadow mb-6">
        <div className="stat place-items-center">
          <div className="bg-error rounded-md px-2 py-1 text-white text-base">
            প্লে
          </div>
          <div className="stat-value">{counts.play}</div>
          <div className="stat-desc">জন</div>
        </div>

        <div className="stat place-items-center">
          <div className="bg-warning rounded-md px-2 py-1 text-base">
            নার্সারি
          </div>
          <div className="stat-value text-blue-950">{counts.nursery}</div>
          <div className="stat-desc text-blue-950">জন</div>
        </div>

        <div className="stat place-items-center">
          <div className="bg-blue-950 text-white rounded-md px-2 py-1 text-base">
            ১ম
          </div>
          <div className="stat-value">{counts.one}</div>
          <div className="stat-desc">জন</div>
        </div>
        <div className="stat place-items-center">
          <div className="bg-blue-500 text-white rounded-md px-2 py-1 text-base">
            ২য়
          </div>
          <div className="stat-value">{counts.two}</div>
          <div className="stat-desc">জন</div>
        </div>
      </div>

      {/* MENU */}
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
          <h3 className="font-bold text-lg"> শিক্ষার্থী যুক্ত করুন </h3>
        </Link>

        {isAdmin && (
          <Link
            to="/dashboard/notices"
            className="group bg-white rounded-xl p-6 shadow hover:shadow-xl transition transform hover:-translate-y-1 text-center"
          >
            <FaBell className="text-5xl text-yellow-500 mx-auto mb-3 group-hover:scale-110 transition" />
            <h3 className="font-bold text-lg">নোটিশ দিন</h3>
          </Link>
        )}

        {isAdmin && (
          <Link
            to="/dashboard/add-teacher"
            className="group bg-white rounded-xl p-6 shadow hover:shadow-xl transition transform hover:-translate-y-1 text-center"
          >
            <FaUserPlus className="text-5xl text-green-600 mx-auto mb-3 group-hover:scale-110 transition" />
            <h3 className="font-bold text-lg">শিক্ষক যোগ করুন</h3>
          </Link>
        )}

        {isAdmin && (
          <Link
            to="/dashboard/teacher-list"
            className="group bg-white rounded-xl p-6 shadow hover:shadow-xl transition transform hover:-translate-y-1 text-center"
          >
            <FaChalkboardTeacher className="text-5xl text-red-500 mx-auto mb-3 group-hover:scale-110 transition" />
            <h3 className="font-bold text-lg">শিক্ষকের তালিকা</h3>
          </Link>
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
