import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase.init.js";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddAttendance() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [loading, setLoading] = useState(true);

  // Simulate logged-in teacher info
  const teacher = {
    uid: "NMMSfC9c30ft0s35GA5JS2rQ3MQ2",
    name: "জিহাদুর রহমান নয়ন",
    email: "jihadur64@gmail.com",
    role: "teacher",
  };

  // Fetch unique classes
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const snapshot = await getDocs(
          query(collection(db, "users"), where("role", "==", "student"))
        );

        const uniqueClasses = [
          ...new Set(
            snapshot.docs.map((doc) => doc.data().grade).filter(Boolean)
          ),
        ];
        setClasses(uniqueClasses);
      } catch (error) {
        console.error("Class fetch error:", error);
      }
    };

    fetchClasses();
  }, []);

  // Fetch students of selected class
  useEffect(() => {
    if (!selectedClass) {
      setStudents([]);
      setAttendance({});
      setLoading(false);
      return;
    }

    setLoading(true);

    const fetchStudents = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("role", "==", "student"),
          where("grade", "==", selectedClass)
        );
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          setStudents([]);
          toast.info("এই শ্রেণীর কোন শিক্ষার্থী নেই।");
          setLoading(false);
          return;
        }

        const studentData = snapshot.docs.map((d) => ({
          id: d.id, // Firestore document ID
          ...d.data(),
        }));

        setStudents(studentData);

        // Initialize attendance checkbox state
        const initialAttendance = {};
        studentData.forEach((student) => {
          initialAttendance[student.id] = {
            present: !!student.active,
            dressCode: true,
          };
        });

        setAttendance(initialAttendance);
      } catch (error) {
        console.error("Student fetch error:", error);
        toast.error("শিক্ষার্থী ডেটা আনতে সমস্যা হয়েছে!");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [selectedClass]);

  // Check if attendance already exists and by whom
  const checkAttendanceExists = async (date, grade) => {
    const q = query(
      collection(db, "attendance"),
      where("date", "==", date),
      where("grade", "==", grade)
    );

    const snap = await getDocs(q);
    if (!snap.empty) {
      const existing = snap.docs[0].data();
      return {
        exists: true,
        teacherEmail: existing.addedBy?.email || "",
      };
    }
    return { exists: false };
  };

  const handleAttendanceChange = (studentId, type) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [type]: !prev[studentId]?.[type],
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedClass) {
      toast.error("শ্রেণী নির্বাচন করুন!");
      return;
    }

    const { exists, teacherEmail } = await checkAttendanceExists(
      selectedDate,
      selectedClass
    );
    if (exists) {
      toast.error(
        `এই শ্রেণীর উপস্থিতি ইতোমধ্যেই যুক্ত করেছেন: ${teacherEmail}`
      );
      return;
    }

    try {
      const batch = students.map((student) => {
        const docId = `${selectedDate}_${selectedClass}_${student.id}`;
        const attendanceRef = doc(db, "attendance", docId);

        return setDoc(attendanceRef, {
          studentId: student.id,
          name: student.name,
          date: selectedDate,
          grade: selectedClass,
          present: !!attendance[student.id]?.present,
          dressCode: !!attendance[student.id]?.dressCode,
          addedBy: {
            uid: teacher.uid,
            name: teacher.name,
            email: teacher.email,
          },
        });
      });

      await Promise.all(batch);
      toast.success("উপস্থিতি সফলভাবে সংরক্ষণ হয়েছে!");
    } catch (error) {
      console.error("Save attendance error:", error);
      toast.error("উপস্থিতি সংরক্ষণে সমস্যা হয়েছে!");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="w-11/12 max-w-4xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">উপস্থিতি যোগ করুন</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Date Selector */}
        <div>
          <label className="label font-semibold">তারিখ নির্বাচন করুন</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Class Selector */}
        <div>
          <label className="label font-semibold">শ্রেণী নির্বাচন করুন</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="select select-bordered w-full"
            required
          >
            <option value="">-- শ্রেণী নির্বাচন করুন --</option>
            {classes.map((cls, idx) => (
              <option key={idx} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        {/* Students List */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
          <div className="grid grid-cols-12 gap-2 font-semibold bg-gray-300  p-2">
            <div className="col-span-2"> আইডি</div>
            <div className="col-span-5">শিক্ষার্থীর নাম</div>
            <div className="col-span-2 text-center">উপস্থিতি</div>
            <div className="col-span-2 text-center">ড্রেসকোড</div>
          </div>

          {students.map((student) => (
            <div
              key={student.id}
              className="grid grid-cols-12 gap-2 items-center border-b border-gray-300 pb-2"
            >
              <div className="col-span-2">{student.studentId}</div>
              <div className="col-span-5">{student.name}</div>

              {/* Present Checkbox */}
              <div className="col-span-2 flex justify-center">
                <input
                  type="checkbox"
                  className="checkbox checkbox-success"
                  checked={attendance[student.id]?.present || false}
                  onChange={() => handleAttendanceChange(student.id, "present")}
                />
              </div>

              {/* Dress Code Checkbox */}
              <div className="col-span-2 flex justify-center">
                <input
                  type="checkbox"
                  className="checkbox checkbox-warning"
                  checked={attendance[student.id]?.dressCode || false}
                  onChange={() =>
                    handleAttendanceChange(student.id, "dressCode")
                  }
                />
              </div>
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-primary mt-4 w-full">
          উপস্থিতি সংরক্ষণ করুন
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}
