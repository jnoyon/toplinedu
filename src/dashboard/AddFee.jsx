import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  Timestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase/firebase.init";

export default function AddFee() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [feeList, setFeeList] = useState([]);

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const feeOptions = [
    "বেতন",
    "বই",
    "ভর্তি ফি",
    "পরীক্ষার ফি",
    "ডায়েরী",
    "খাতা",
    "সেশন ফি",
    "অন্যান্য",
  ];

  // Fetch available classes
  const fetchClasses = async () => {
    const snapshot = await getDocs(collection(db, "users"));
    const classSet = new Set();
    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (data.grade && data.role === "student") classSet.add(data.grade);
    });
    setClasses([...classSet]);
  };

  // Fetch students for selected class
  const fetchStudents = async (cls) => {
    if (!cls) return;
    const q = query(
      collection(db, "users"),
      where("grade", "==", cls),
      where("role", "==", "student")
    );
    const snap = await getDocs(q);
    const studentsList = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setStudents(studentsList);
  };

  // Fetch fees for selected student
  const fetchFees = async (student) => {
    if (!student) return;
    const q = query(
      collection(db, "fees"),
      where("studentId", "==", student.id)
    );
    const snap = await getDocs(q);
    const fees = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setFeeList(fees);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    setSelectedStudent(null);
    setFeeList([]);
    fetchStudents(selectedClass);
  }, [selectedClass]);

  useEffect(() => {
    fetchFees(selectedStudent);
  }, [selectedStudent]);

  const handleAddFee = async (e) => {
    e.preventDefault();
    if (!selectedClass || !selectedStudent || !amount || !description) {
      toast.error("সব ফিল্ড পূরণ করুন।");
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, "fees"), {
        studentId: selectedStudent.id,
        studentName: selectedStudent.name,
        class: selectedClass,
        amount: Number(amount),
        description,
        date: today,
        createdAt: Timestamp.now(),
      });
      toast.success("ফি সফলভাবে যোগ করা হয়েছে!");
      setAmount("");
      setDescription("");
      fetchFees(selectedStudent);
    } catch (err) {
      console.error(err);
      toast.error("ফি যোগ করতে সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFee = async (feeId) => {
    if (!window.confirm("ফি মুছে ফেলতে চান?")) return;
    try {
      await deleteDoc(doc(db, "fees", feeId));
      toast.success("ফি সফলভাবে মুছে ফেলা হয়েছে!");
      fetchFees(selectedStudent);
    } catch (err) {
      console.error(err);
      toast.error("ফি মুছে ফেলতে সমস্যা হয়েছে।");
    }
  };

  const totalFee = feeList.reduce((sum, f) => sum + (f.amount || 0), 0);

  return (
    <section className="min-h-screen py-10 bg-gray-50 flex flex-col items-center px-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          ফি যোগ করুন
        </h2>

        <form onSubmit={handleAddFee} className="flex flex-col gap-4">
          {/* Class Select */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">শ্রেণী নির্বাচন করুন</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="select select-bordered"
            >
              <option value="">-- নির্বাচন করুন --</option>
              {classes.map((cls, i) => (
                <option key={i} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          {/* Student Select */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">
              শিক্ষার্থী নির্বাচন করুন
            </label>
            <select
              value={selectedStudent?.id || ""}
              onChange={(e) =>
                setSelectedStudent(
                  students.find((s) => s.id === e.target.value) || null
                )
              }
              className="select select-bordered"
              disabled={!selectedClass}
            >
              <option value="">-- নির্বাচন করুন --</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.studentId})
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">পরিমাণ (৳)</label>
            <input
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input input-bordered"
              placeholder="পরিমাণ লিখুন"
            />
          </div>

          {/* Description Select */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">বিবরণ</label>
            <select
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="select select-bordered"
              required
            >
              <option value="">-- নির্বাচন করুন --</option>
              {feeOptions.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`btn btn-primary mt-4 ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "যোগ করা হচ্ছে..." : "ফি যোগ করুন"}
          </button>
        </form>
      </div>

      {/* Fee Table */}
      {selectedStudent && feeList.length > 0 && (
        <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-3xl mt-8">
          <h3 className="text-xl font-bold mb-4 text-center">
            {selectedStudent.name} এর মোট ফি: {totalFee} ৳
          </h3>
          <table className="table-auto w-full text-left border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">তারিখ</th>
                <th className="px-4 py-2 border">পরিমাণ (৳)</th>
                <th className="px-4 py-2 border">বিবরণ</th>
                <th className="px-4 py-2 border">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {feeList.map((fee) => (
                <tr key={fee.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{fee.date}</td>
                  <td className="px-4 py-2 border">{fee.amount}</td>
                  <td className="px-4 py-2 border">{fee.description || "-"}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleDeleteFee(fee.id)}
                      className="btn btn-sm btn-error"
                    >
                      মুছুন
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
