import React, { useEffect, useState, useMemo } from "react";
import pattern from "../../assets/images/memphis-colorful.png";
import { FaUser, FaCalendarAlt, FaPhoneAlt, FaStar } from "react-icons/fa";
import { db } from "../../firebase/firebase.init.js";
import { collection, query, where, getDocs } from "firebase/firestore";

// Helper to calculate age
const calculateAgeDetailed = (birthDate) => {
  const [year, month, day] = birthDate.split("-").map(Number);
  const birth = new Date(year, month - 1, day);
  const today = new Date();

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return `${years} বছর ${months} মাস ${days} দিন`;
};

// Helper to format date as DD-MM-YYYY
const formatDate = (dateString) => {
  if (!dateString) return "-";
  const [year, month, day] = dateString.split("-").map(Number);
  const dd = String(day).padStart(2, "0");
  const mm = String(month).padStart(2, "0");
  return `${dd}-${mm}-${year}`;
};

// Helper to get attendance status
const getAttendanceStatus = (attendance, selectedMonth) => {
  const filteredAttendance = attendance.filter((a) => {
    if (!a.date) return false;
    const month = Number(a.date.split("-")[1]);
    return month === selectedMonth;
  });

  if (filteredAttendance.length === 0) {
    return { label: "নতুন", color: "from-blue-400 to-blue-600" };
  }

  const absentCount = filteredAttendance.filter((a) => !a.present).length;

  if (absentCount > 3) {
    return { label: "অনিয়মিত", color: "from-red-500 to-red-700" };
  }

  return { label: "নিয়মিত", color: "from-green-400 to-green-600" };
};

export default function Profile() {
  const studentData = JSON.parse(localStorage.getItem("studentData")) || {};
  const [attendance, setAttendance] = useState([]);
  const [monthlyResults, setMonthlyResults] = useState([]);
  const [semesterResults, setSemesterResults] = useState([]);
  const [teacherComments, setTeacherComments] = useState([]);
  const currentMonth = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const admissionDate =
    studentData.admissionDate || new Date().toISOString().split("T")[0];

  // Fetch attendance, results, comments
  useEffect(() => {
    if (!studentData.id) return;

    const fetchCollection = async (
      collectionName,
      setState,
      mapFn = (d) => d.data()
    ) => {
      try {
        const q = query(
          collection(db, collectionName),
          where("studentId", "==", studentData.id)
        );
        const snap = await getDocs(q);
        setState(snap.docs.map(mapFn));
      } catch (err) {
        console.error(`${collectionName} fetch error:`, err);
      }
    };

    fetchCollection("attendance", setAttendance);
    fetchCollection("monthlyResults", setMonthlyResults);
    fetchCollection("semesterResults", setSemesterResults);
    fetchCollection("comments", setTeacherComments, (d) => d.data().comment);
  }, [studentData.id]);

  if (!studentData.name) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">কোনও শিক্ষার্থী লগইন নেই।</p>
      </div>
    );
  }

  const age = studentData.dob ? calculateAgeDetailed(studentData.dob) : "-";

  const filteredAttendance = useMemo(() => {
    return attendance.filter((a) => {
      if (!a.date) return false;
      const month = Number(a.date.split("-")[1]);
      return month === selectedMonth;
    });
  }, [attendance, selectedMonth]);

  const presentCount = filteredAttendance.filter((a) => a.present).length;
  const absentCount = filteredAttendance.filter((a) => !a.present).length;
  const totalDays = presentCount + absentCount;
  const attendancePercentage = totalDays
    ? Math.round((presentCount / totalDays) * 100)
    : 0;

  const attendanceStatus = getAttendanceStatus(attendance, selectedMonth);

  return (
    <section
      className="relative min-h-screen py-10 flex flex-col items-center bg-gradient-to-br from-blue-50 via-white to-red-50"
      style={{
        backgroundImage: `url(${pattern})`,
        backgroundRepeat: "repeat",
        backgroundSize: "350px 350px",
      }}
    >
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>

      {/* Profile Card */}
      <div className="relative z-10 bg-gradient-to-br from-white/80 via-blue-50/60 to-white/80 backdrop-blur-lg p-8 md:p-12 rounded-3xl shadow-2xl w-11/12 md:w-2/3 mb-10 transform transition-all duration-500">
        {/* Attendance Status Badge */}
        {attendance && (
          <div
            className={`px-4 py-1 absolute right-0 top-0 rounded-full text-white font-semibold w-36 text-center
  bg-gradient-to-r ${attendanceStatus.color}`}
          >
            {attendanceStatus.label}
          </div>
        )}
        <div className="flex flex-col items-center">
          {/* Profile Image */}
          {studentData.imageUrl ? (
            <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-blue-200 shadow-lg mb-6">
              <img
                src={studentData.imageUrl}
                alt={studentData.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-full"></div>
            </div>
          ) : (
            <FaUser className="text-9xl text-gray-400 border-4 p-5 rounded-full shadow-lg mb-6" />
          )}

          {/* Name & Grade */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1f2937] mb-2 drop-shadow-sm">
            {studentData.name}
          </h2>
          <p className="text-gray-500 text-lg md:text-xl mb-6">
            শ্রেণী: {studentData.grade || "-"} | আইডি:{" "}
            {studentData.studentId || "-"}
          </p>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 w-full max-w-2xl">
            <div className="flex items-center gap-2 bg-blue-50/50 p-3 rounded-xl shadow-inner hover:shadow-lg transition-shadow duration-300">
              <FaUser className="text-red-400 text-xl" />
              <span className="font-semibold">পিতার নাম:</span>{" "}
              {studentData.fatherName || "-"}
            </div>
            <div className="flex items-center gap-2 bg-blue-50/50 p-3 rounded-xl shadow-inner hover:shadow-lg transition-shadow duration-300">
              <FaUser className="text-green-400 text-xl" />
              <span className="font-semibold">মাতার নাম:</span>{" "}
              {studentData.motherName || "-"}
            </div>
            <div className="flex items-center gap-2 bg-yellow-50/60 p-3 rounded-xl shadow-inner hover:shadow-lg transition-shadow duration-300">
              <FaCalendarAlt className="text-purple-400 text-xl" />
              <span className="font-semibold">জন্ম তারিখ:</span>{" "}
              {formatDate(studentData.dob)}
            </div>
            <div className="flex items-center gap-2 bg-yellow-50/60 p-3 rounded-xl shadow-inner hover:shadow-lg transition-shadow duration-300">
              <FaCalendarAlt className="text-purple-400 text-xl" />
              <span className="font-semibold">বয়স:</span> {age}
            </div>
            <div className="flex items-center gap-2 bg-green-50/60 p-3 rounded-xl shadow-inner hover:shadow-lg transition-shadow duration-300">
              <FaPhoneAlt className="text-blue-500 text-xl" />
              <span className="font-semibold">মোবাইল:</span>{" "}
              <span>{studentData.mobile || "-"}</span>
            </div>
            <div className="flex items-center gap-2 bg-pink-50/60 p-3 rounded-xl shadow-inner hover:shadow-lg transition-shadow duration-300 col-span-full">
              <FaCalendarAlt className="text-pink-500 text-xl" />
              <span className="font-semibold">ভর্তির তারিখ:</span>{" "}
              {formatDate(admissionDate)}
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Section */}
      <div className="relative z-10 bg-white/95 backdrop-blur-md p-2 md:p-8 rounded-md border border-gray-300 shadow-xl w-11/12 md:w-2/3 mb-8 hover:shadow-2xl transition-shadow duration-500">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg w-1/2 text-[#2c3e50]">
            উপস্থিতি তথ্য
          </h2>
          <div className="flex flex-col items-end">
            <select
              className="select mb-2"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>
                  {new Date(0, m - 1).toLocaleString("bn-BD", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Attendance Grid */}
        <div className="grid grid-cols-7 gap-2 mb-6">
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
            const record = filteredAttendance.find((a) => {
              const [y, m, d] = a.date.split("-").map(Number);
              return d === day;
            });

            const colorClass = record
              ? record.present
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
              : "bg-gray-300 text-gray-600";

            return (
              <div
                key={day}
                className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold shadow ${colorClass}`}
              >
                {day}
              </div>
            );
          })}
        </div>

        {/* Attendance Summary */}
        <div className="flex gap-2 font-semibold text-gray-700 mb-6">
          <div className="flex-1 p-2 bg-green-100 rounded-xl shadow-inner text-center">
            উপস্থিতি: <span className="text-green-600">{presentCount} দিন</span>
          </div>
          <div className="flex-1 p-2 bg-red-100 rounded-xl shadow-inner text-center">
            অনুপস্থিতি: <span className="text-red-600">{absentCount} দিন</span>
          </div>
          <div className="flex-1 p-2 bg-blue-100 rounded-xl shadow-inner text-center">
            হার: <span className="text-blue-600">{attendancePercentage}%</span>
          </div>
        </div>

        {/* Dress Code Grid */}
        <h2 className="font-bold text-lg mb-2 text-[#2c3e50]">ড্রেসকোড তথ্য</h2>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
            const record = filteredAttendance.find((a) => {
              const [y, m, d] = a.date.split("-").map(Number);
              return d === day;
            });

            const colorClass = record
              ? record.dressCode
                ? "bg-yellow-400 text-white"
                : "bg-gray-500 text-white"
              : "bg-gray-300 text-gray-600";

            return (
              <div
                key={day}
                className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold shadow ${colorClass}`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>

      {/* Exam Section */}
      <div className="relative z-10 bg-white/80 backdrop-blur-lg p-6 md:p-10 rounded-3xl shadow-2xl w-11/12 md:w-2/3 mb-8 border border-gray-200">
        <h2 className="divider divider-error text-error text-xl font-black">
          পরীক্ষার রিপোর্ট
        </h2>

        {/* Monthly Results */}
        <h3 className="font-semibold mb-4 text-gray-700 flex items-center gap-2 border-b-2 border-gray-200 pb-2 mt-6">
          মাসিক পরীক্ষা ফলাফল
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {monthlyResults.length ? (
            monthlyResults.map((m, i) => (
              <div
                key={i}
                className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-blue-400"
              >
                <p className="text-sm text-gray-500 mb-2">{m.month}</p>
                <p className="text-2xl font-bold text-[#2c3e50]">
                  {m.obtainedMark} / {m.highestMark}
                </p>
                <p className="text-gray-400 text-sm mt-1">প্রাপ্ত নম্বর</p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-gray-500 text-center py-4">
              মাসিক পরীক্ষা জানুয়ারির মাসের শেষে শুরু হবে।
            </p>
          )}
        </div>

        {/* Semester Results */}
        <h3 className="font-semibold mb-4 text-gray-700 flex items-center gap-2 border-b-2 border-gray-200 pb-2">
          সেমিস্টার পরীক্ষা
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {semesterResults.length ? (
            semesterResults.map((s, i) => (
              <div
                key={i}
                className="p-5 bg-gradient-to-tr from-red-50 via-purple-50 to-blue-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-red-400"
              >
                <p className="font-semibold text-gray-700 text-lg mb-1">
                  {s.subject}
                </p>
                <p className="text-gray-500 text-sm mb-2">{s.semester}</p>
                <p className="text-2xl font-extrabold text-[#2c3e50]">
                  {s.obtainedMark}/{s.highestMark || 100}
                </p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-gray-500 text-center py-4">
              এখনো কোন সেমিস্টার পরীক্ষা হয়নি
            </p>
          )}
        </div>
      </div>

      {/* Teacher Comments */}
      <div className="relative z-10 bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-xl w-11/12 md:w-2/3 mb-8">
        <h2 className="font-bold text-2xl mb-4 text-[#2c3e50]">
          শিক্ষার্থী সম্পর্কে মন্তব্য
        </h2>
        <div className="space-y-3">
          {teacherComments.length ? (
            teacherComments.map((c, i) => (
              <p
                key={i}
                className="p-4 bg-yellow-50 rounded-lg shadow-inner text-gray-700"
              >
                <FaStar className="inline text-yellow-500 mr-2" />
                {c}
              </p>
            ))
          ) : (
            <p className="text-gray-500">কোনও মন্তব্য নেই।</p>
          )}
        </div>
      </div>
    </section>
  );
}
