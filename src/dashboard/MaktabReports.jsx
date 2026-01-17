import React, { useEffect, useState } from "react";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase.init";

export default function MaktabReports() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const isAdmin = userData?.role === "admin";

  const [classes] = useState(["প্লে-এ", "প্লে-বি", "নার্সারি", "ওয়ান"]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [report, setReport] = useState({});

  // Arabic letters in alphabetic order
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
  // Fetch students by class
  useEffect(() => {
    if (!selectedClass) return;

    const fetchStudents = async () => {
      const q = query(
        collection(db, "users"),
        where("grade", "==", selectedClass),
        where("role", "==", "student"),
        where("religion", "==", "ইসলাম")
      );

      const snap = await getDocs(q);
      const list = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setStudents(list);
    };

    fetchStudents();
  }, [selectedClass]);

  // Load report
  const loadReport = async (student) => {
    setSelectedStudent(student);

    const ref = doc(db, "maktabReports", student.id);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      setReport(snap.data().report);
    } else {
      // Pre-fill report with all 29 letters
      const emptyReport = {};
      arabicLetters.forEach((_, index) => {
        emptyReport[index + 1] = {};
      });

      await setDoc(ref, {
        studentId: student.studentId,
        studentName: student.name,
        class: student.grade,
        report: emptyReport,
      });

      setReport(emptyReport);
    }
  };

  // Toggle cell
  const toggleCell = async (row, field) => {
    const updated = {
      ...report,
      [row]: {
        ...report[row],
        [field]: !report[row]?.[field],
      },
    };

    setReport(updated);

    await updateDoc(doc(db, "maktabReports", selectedStudent.id), {
      report: updated,
    });
  };

  if (!isAdmin) {
    return (
      <p className="text-center text-red-500 mt-10">
        শুধুমাত্র অ্যাডমিনের জন্য
      </p>
    );
  }

  return (
    <section className="p-4 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold text-center mb-4">
        মক্তব রিপোর্ট (Admin)
      </h2>

      {/* Select Class */}
      <div className="mb-3">
        <select
          className="select select-bordered w-full"
          value={selectedClass}
          onChange={(e) => {
            setSelectedClass(e.target.value);
            setSelectedStudent(null);
          }}
        >
          <option value="">শ্রেণী নির্বাচন করুন</option>
          {classes.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Select Student */}
      {students.length > 0 && (
        <div className="mb-4">
          <select
            className="select select-bordered w-full"
            onChange={(e) => {
              const student = students.find((s) => s.id === e.target.value);
              loadReport(student);
            }}
          >
            <option value="">শিক্ষার্থী নির্বাচন করুন</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.studentId} — {s.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Report Table */}
      {selectedStudent && (
        <div className="overflow-x-auto">
          <table className="table table-bordered text-center">
            <thead>
              <tr>
                <th>হরফ</th>
                <th>চেনা</th>
                <th>উচ্চারণ</th>
                <th>লেখা</th>
                <th>মাখরাজ</th>
              </tr>
            </thead>
            <tbody>
              {arabicLetters.map((letter, index) => (
                <tr key={letter}>
                  <td>{letter}</td>
                  {["identify", "say", "write", "pronunciation"].map(
                    (field) => (
                      <td
                        key={field}
                        onClick={() => toggleCell(index + 1, field)}
                        className="cursor-pointer"
                      >
                        {report[index + 1]?.[field] && (
                          <IoCheckmarkDoneCircleSharp className="text-green-500 mx-auto text-xl" />
                        )}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
