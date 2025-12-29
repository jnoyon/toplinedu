// src/dashboard/Teachers.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase.init.js";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { FaUser } from "react-icons/fa";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const isAdmin = userData.role === "admin";

  // Fetch teachers
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("role", "==", "teacher")
        );
        const snapshot = await getDocs(q);
        setTeachers(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
      setLoading(false);
    };

    fetchTeachers();
  }, []);

  // Delete teacher
  const handleDelete = async (teacherId) => {
    const confirmDelete = window.confirm(
      "আপনি কি নিশ্চিতভাবে এই শিক্ষককে মুছে ফেলতে চান?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "users", teacherId));
      setTeachers((prev) => prev.filter((t) => t.id !== teacherId));
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <section className="bg-gradient-to-br from-[#fdfbfb] via-[#f3f7ff] to-[#ffeaea] min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">শিক্ষক তালিকা</h2>

        {teachers.length === 0 && (
          <p className="text-center text-gray-500">কোন শিক্ষক পাওয়া যায়নি</p>
        )}

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {teachers.map((t) => (
            <div
              key={t.id}
              className="card bg-white shadow-md hover:shadow-xl transition rounded-xl"
            >
              <div className="p-4 flex flex-col gap-2">
                {/* Header */}
                <div className="flex items-center gap-3 border-b pb-2">
                  {t.imageUrl ? (
                    <img
                      src={t.imageUrl}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover border"
                    />
                  ) : (
                    <FaUser className="text-3xl text-gray-400" />
                  )}

                  <div>
                    <h3 className="font-bold text-lg">{t.name}</h3>
                    <p className="text-sm text-gray-500">বিষয়: {t.subject}</p>
                  </div>
                </div>

                <p>
                  <span className="font-semibold">মোবাইল:</span> {t.phone}
                </p>

                {t.altPhone && (
                  <p>
                    <span className="font-semibold">বিকল্প মোবাইল:</span>{" "}
                    {t.altPhone}
                  </p>
                )}

                <p>
                  <span className="font-semibold">ঠিকানা:</span> {t.address}
                </p>

                <p>
                  <span className="font-semibold">ক্লাস শিক্ষক:</span>{" "}
                  {t.classTeacher || "-"}
                </p>

                {/* Actions */}
                <div className="flex justify-between mt-3">
                  <a
                    href={`tel:${t.phone}`}
                    className="text-sm font-semibold px-3 py-1 rounded-md bg-blue-900 text-white hover:bg-blue-800"
                  >
                    কল করুন
                  </a>

                  {isAdmin && (
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="text-sm font-semibold px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600"
                    >
                      ডিলিট
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
