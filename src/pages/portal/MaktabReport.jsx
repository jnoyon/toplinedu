import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { db } from "../../firebase/firebase.init";
import { FaMosque } from "react-icons/fa";

export default function MaktabReport() {
  const studentData = JSON.parse(localStorage.getItem("userData"));
  const [report, setReport] = useState({});

  // 29 Arabic letters in proper Maktab order
  const arabicLetters = [
    "ا",
    "ب",
    "ت",
    "ث",
    "ج",
    "ح",
    "خ",
    "د",
    "ذ",
    "ر",
    "ز",
    "س",
    "ش",
    "ص",
    "ض",
    "ط",
    "ظ",
    "ع",
    "غ",
    "ف",
    "ق",
    "ك",
    "ل",
    "م",
    "ن",
    "و",
    "ه",
    "ء",
    "ي",
  ];

  useEffect(() => {
    if (!studentData?.id) return;

    const fetchReport = async () => {
      try {
        const ref = doc(db, "maktabReports", studentData.id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setReport(snap.data().report);
        } else {
          const emptyReport = {};
          arabicLetters.forEach((_, index) => {
            emptyReport[index + 1] = {};
          });
          setReport(emptyReport);
        }
      } catch (err) {
        console.error("Error fetching report:", err);
      }
    };

    fetchReport();
  }, [studentData]);

  if (!studentData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-yellow-50">
        <p className="text-xl font-semibold text-gray-700">
          কোনও শিক্ষার্থী লগইন নেই।
        </p>
      </div>
    );
  }

  return (
    <section className="p-2 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <FaMosque className="text-8xl text-green-700 mx-auto"></FaMosque>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1D3557] mb-2">
          আমার মক্তব রিপোর্ট
        </h2>
        <p className="text-gray-600 text-lg">
          <span className="font-semibold">{studentData.name || "-"}</span> |
          শ্রেণী:{" "}
          <span className="font-semibold">{studentData.grade || "-"}</span> |
          আইডি:{" "}
          <span className="font-semibold">{studentData.studentId || "-"}</span>
        </p>
      </div>

      {/* Report Table Card */}
      <div className="bg-gradient-to-br from-blue-50/70 via-white/70 to-yellow-50/70  md:p-10 rounded-3xl shadow-xl border border-blue-100 overflow-x-auto">
        <table className="table-auto w-full text-center border-collapse">
          <thead>
            <tr className="bg-blue-100 text-[#1D3557] font-semibold text-lg rounded-lg">
              <th className="py-3 px-4 border border-blue-200">হরফ</th>
              <th className="py-3 px-4 border border-blue-200">চেনা</th>
              <th className="py-3 px-4 border border-blue-200">উচ্চারণ</th>
              <th className="py-3 px-4 border border-blue-200">লেখা</th>
              <th className="py-3 px-4 border border-blue-200">মাখরাজ</th>
            </tr>
          </thead>
          <tbody>
            {arabicLetters.map((letter, index) => (
              <tr
                key={letter}
                className="hover:bg-blue-50 transition-colors duration-200"
              >
                <td className="py-3 px-4 border border-blue-100 text-xl font-bold text-[#457B9D]">
                  {letter}
                </td>
                {["identify", "say", "write", "pronunciation"].map((field) => (
                  <td key={field} className="py-3 px-4 border border-blue-100">
                    {report[index + 1]?.[field] && (
                      <IoCheckmarkDoneCircleSharp className="text-green-500 mx-auto text-2xl" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
