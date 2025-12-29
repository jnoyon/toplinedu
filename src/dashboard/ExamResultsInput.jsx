import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase.init.js";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ExamResultsInput() {
  const [grade, setGrade] = useState("");
  const [students, setStudents] = useState([]);
  const [examType, setExamType] = useState("");
  const [month, setMonth] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [highestMark, setHighestMark] = useState("");
  const [marksData, setMarksData] = useState({});

  useEffect(() => {
    if (!grade) return;

    const fetchStudents = async () => {
      try {
        const studentsRef = collection(db, "users");
        const q = query(
          studentsRef,
          where("grade", "==", grade),
          where("role", "==", "student")
        );
        const snapshot = await getDocs(q);
        const studentList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStudents(studentList);

        const initialMarks = {};
        studentList.forEach((s) => {
          initialMarks[s.studentId] = "";
        });
        setMarksData(initialMarks);
      } catch (err) {
        console.error(err);
        toast.error("Student fetch failed!");
      }
    };

    fetchStudents();
  }, [grade]);

  const handleMarkChange = (studentId, value) => {
    setMarksData((prev) => ({ ...prev, [studentId]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !examType ||
      !highestMark ||
      (examType === "monthly" && !month) ||
      (examType === "semester" && (!semester || !subject))
    ) {
      toast.error("সব তথ্য পূরণ করুন!");
      return;
    }

    try {
      const examRef = collection(db, "examResults");
      const today = new Date().toISOString().split("T")[0];

      const batchPromises = students.map((s) =>
        addDoc(examRef, {
          studentId: s.studentId,
          name: s.name,
          grade: s.grade,
          type: examType,
          month: examType === "monthly" ? month : "",
          semester: examType === "semester" ? semester : "",
          subject: examType === "semester" ? subject : "",
          highestMark: Number(highestMark),
          obtainedMark: Number(marksData[s.studentId] || 0),
          date: today,
          timestamp: serverTimestamp(),
        })
      );

      await Promise.all(batchPromises);
      toast.success("Exam results submitted successfully!");
      setMarksData(
        students.reduce((acc, s) => ({ ...acc, [s.studentId]: "" }), {})
      );
      setSubject("");
      setHighestMark("");
      setMonth("");
      setSemester("");
      setExamType("");
    } catch (err) {
      console.error(err);
      toast.error("Submission failed!");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        পরীক্ষার ফলাফল যোগ করুন
      </h2>

      <div className="mb-6 flex flex-wrap justify-center gap-4">
        <select
          className="select select-bordered w-full max-w-xs"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        >
          <option value="">শ্রেণি নির্বাচন করুন</option>
          <option value="প্লে">প্লে</option>
          <option value="নার্সারি">নার্সারি</option>
          <option value="ওয়ান">ওয়ান</option>
          <option value="টু">টু</option>
        </select>

        <select
          className="select select-bordered w-full max-w-xs"
          value={examType}
          onChange={(e) => setExamType(e.target.value)}
        >
          <option value="">পরীক্ষার ধরন</option>
          <option value="monthly">মাসিক পরীক্ষা</option>
          <option value="semester">সেমিস্টার পরীক্ষা</option>
        </select>

        {examType === "monthly" && (
          <select
            className="select select-bordered w-full max-w-xs"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="">মাস নির্বাচন করুন</option>
            <option value="জানুয়ারি">জানুয়ারি</option>
            <option value="ফেব্রুয়ারি">ফেব্রুয়ারি</option>
            <option value="মার্চ">মার্চ</option>
            <option value="এপ্রিল">এপ্রিল</option>
            <option value="মে">মে</option>
            <option value="জুন">জুন</option>
            <option value="জুলাই">জুলাই</option>
            <option value="অগাস্ট">অগাস্ট</option>
            <option value="সেপ্টেম্বর">সেপ্টেম্বর</option>
            <option value="অক্টোবর">অক্টোবর</option>
            <option value="নভেম্বর">নভেম্বর</option>
            <option value="ডিসেম্বর">ডিসেম্বর</option>
          </select>
        )}

        {examType === "semester" && (
          <>
            <select
              className="select select-bordered w-full max-w-xs"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
              <option value="">সেমিস্টার নির্বাচন করুন</option>
              <option value="১ম">১ম</option>
              <option value="২য়">২য়</option>
              <option value="বার্ষিক">বার্ষিক</option>
            </select>

            <input
              type="text"
              placeholder="বিষয়ের নাম"
              className="input input-bordered w-full max-w-xs"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </>
        )}

        <input
          type="number"
          placeholder="সর্বোচ্চ মার্ক"
          className="input input-bordered w-full max-w-xs"
          value={highestMark}
          onChange={(e) => setHighestMark(e.target.value)}
        />
      </div>

      {students.length > 0 && (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {students.map((s) => (
              <div
                key={s.studentId}
                className="bg-white p-4 rounded-2xl shadow hover:shadow-xl transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-700">
                  {s.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">রোল: {s.studentId}</p>

                <input
                  type="number"
                  min="0"
                  max={highestMark || 100}
                  placeholder="প্রাপ্ত মার্ক"
                  className="input input-bordered w-full"
                  value={marksData[s.studentId]}
                  onChange={(e) =>
                    handleMarkChange(s.studentId, e.target.value)
                  }
                  required
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="btn btn-primary px-10 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              জমা দিন
            </button>
          </div>
        </form>
      )}

      {students.length === 0 && grade && (
        <p className="text-center text-gray-600 mt-4">
          এই শ্রেণিতে কোনো শিক্ষার্থী নেই।
        </p>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
