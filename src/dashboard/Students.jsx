import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase.init.js";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { Link } from "react-router";
import { FaUser } from "react-icons/fa";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const isAdmin = userData.role === "admin";

  const classes = ["প্লে-এ", "প্লে-বি", "নার্সারি", "ওয়ান"];

  // Fetch students by class
  useEffect(() => {
    if (!selectedClass) return;

    const fetchStudents = async () => {
      const q = query(
        collection(db, "users"),
        where("grade", "==", selectedClass),
        where("role", "==", "student")
      );
      const snapshot = await getDocs(q);
      const sorted = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => Number(a.studentId) - Number(b.studentId));
      setStudents(sorted);
    };

    fetchStudents();
  }, [selectedClass]);

  // Toggle Active / Deactive
  const toggleStatus = async (student) => {
    const docRef = doc(db, "users", student.id);
    await updateDoc(docRef, { active: !student.active });
    setStudents((prev) =>
      prev.map((s) => (s.id === student.id ? { ...s, active: !s.active } : s))
    );
  };

  // Delete Student
  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "আপনি কি নিশ্চিতভাবে এই শিক্ষার্থীকে মুছে ফেলতে চান?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "users", id));
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <section className="bg-gradient-to-br from-[#fdfbfb] via-[#f3f7ff] to-[#ffeaea] min-h-screen py-8 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          শিক্ষার্থী তালিকা
        </h2>

        {/* Class Selector */}
        <div className="flex justify-center mb-6 bg-white shadow p-3 rounded-md">
          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text font-semibold">শ্রেণী</span>
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="select select-bordered"
            >
              <option value="">-- নির্বাচন করুন --</option>
              {classes.map((cls, idx) => (
                <option key={idx} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* No Students */}
        {students.length === 0 && selectedClass && (
          <p className="text-center text-gray-500 text-lg">
            কোন শিক্ষার্থী পাওয়া যায়নি
          </p>
        )}

        {/* Students Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {students.map((s) => (
            <div
              key={s.id}
              className="card bg-white shadow-md hover:shadow-xl transition rounded-xl overflow-hidden"
            >
              <div className="p-4 flex flex-col gap-2">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-300 pb-2">
                  <div className="flex items-center gap-2">
                    {s.imageUrl ? (
                      <img
                        src={s.imageUrl}
                        alt={s.name}
                        className="w-12 h-12 rounded-full object-cover border"
                      />
                    ) : (
                      <FaUser className="text-3xl text-gray-400" />
                    )}

                    <div>
                      <h3 className="text-lg font-bold">{s.name}</h3>
                      <p className="text-sm text-gray-500">
                        স্টুডেন্ট আইডি: {s.studentId}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      s.active
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {s.active ? "Active" : "Inactive"}
                  </span>
                </div>

                <p>
                  <span className="font-semibold">পিতা:</span> {s.fatherName}
                </p>
                <p>
                  <span className="font-semibold">মাতা:</span> {s.motherName}
                </p>

                {/* Monthly Fee */}
                {isAdmin && (
                  <p>
                    <span className="font-semibold">মাসিক বেতন:</span>{" "}
                    {s.monthlyFee ? `${s.monthlyFee}৳` : "অনির্ধারিত"}
                  </p>
                )}

                {/* Admin Actions */}
                {isAdmin && (
                  <div className="flex justify-between items-center mt-2">
                    <p>
                      <span className="font-semibold">পাসকোড:</span>{" "}
                      {s.passcode}
                    </p>

                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleStatus(s)}
                        className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${
                          s.active
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                      >
                        {s.active ? "Deactivate" : "Activate"}
                      </button>

                      <button
                        onClick={() => deleteStudent(s.id)}
                        className="px-2 py-1 rounded-full bg-gray-800 hover:bg-black text-white text-xs font-semibold"
                      >
                        ডিলিট
                      </button>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-center gap-2 mt-3">
                  <a
                    href={`tel:${s.mobile}`}
                    className="btn btn-sm btn-secondary"
                  >
                    কল করুন
                  </a>

                  <Link
                    className="btn btn-sm btn-primary"
                    to={`/dashboard/student-profile/${s.studentId}`}
                    onClick={() =>
                      localStorage.setItem("studentData", JSON.stringify(s))
                    }
                  >
                    তথ্য দেখুন
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
