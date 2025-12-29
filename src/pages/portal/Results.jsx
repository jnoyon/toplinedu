import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase.init.js";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Results() {
  const studentData = JSON.parse(localStorage.getItem("studentData")) || {};
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const studentClass = studentData.grade;

  // Fetch all exams for this student
  useEffect(() => {
    if (!studentData.studentId) return;

    const fetchExams = async () => {
      const q = query(
        collection(db, "examResults"),
        where("studentId", "==", studentData.studentId)
      );
      const snapshot = await getDocs(q);
      const uniqueExams = [
        ...new Set(snapshot.docs.map((d) => d.data().examName)),
      ];
      setExams(uniqueExams);
    };
    fetchExams();
  }, [studentData.studentId]);

  // Fetch results for selected exam
  useEffect(() => {
    if (!selectedExam || !studentData.studentId) return;

    const fetchResults = async () => {
      setLoading(true);
      const q = query(
        collection(db, "examResults"),
        where("studentId", "==", studentData.studentId),
        where("examName", "==", selectedExam)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((d) => d.data());
      setResults(data);
      setLoading(false);
    };
    fetchResults();
  }, [selectedExam, studentData.studentId]);

  if (!studentData.studentId) {
    return <p className="text-center mt-10">কোনও শিক্ষার্থী লগইন নেই।</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">ফলাফল</h2>

      {/* Exam selector */}
      <div className="mb-6">
        <label className="block mb-1 font-semibold">
          পরীক্ষা নির্বাচন করুন:
        </label>
        <select
          className="select select-bordered w-full max-w-xs"
          value={selectedExam}
          onChange={(e) => setSelectedExam(e.target.value)}
        >
          <option value="">-- নির্বাচন করুন --</option>
          {exams.map((exam) => (
            <option key={exam} value={exam}>
              {exam}
            </option>
          ))}
        </select>
      </div>

      {/* Results Table */}
      {loading ? (
        <p>লোড হচ্ছে...</p>
      ) : results.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>আইডি</th>
                <th>নাম</th>
                <th>অভিভাবক</th>
                <th>প্রাপ্ত নম্বর</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.studentId}>
                  <td>{r.studentId}</td>
                  <td>{r.name}</td>
                  <td>{r.guardianName || "-"}</td>
                  <td>{r.obtainedMark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : selectedExam ? (
        <p>কোনও ফলাফল পাওয়া যায়নি।</p>
      ) : null}
    </div>
  );
}
