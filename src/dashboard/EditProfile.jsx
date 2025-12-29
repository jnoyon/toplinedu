import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase.init.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    altPhone: "",
    subject: "",
    classTeacher: "",
  });
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const uid = auth.currentUser?.uid;

  const classes = ["প্লে", "নার্সারি", "ওয়ান"];

  useEffect(() => {
    if (!uid) return;

    const fetchTeacher = async () => {
      try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            name: data.name || "",
            phone: data.phone || "",
            altPhone: data.altPhone || "",
            subject: data.subject || "",
            classTeacher: data.classTeacher || "",
          });
        } else {
          toast.error("আপনার তথ্য পাওয়া যায়নি!");
        }
      } catch (error) {
        console.error("Error fetching teacher:", error);
        toast.error("ডেটা লোড করতে সমস্যা হয়েছে!");
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [uid]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uid) return;

    try {
      const docRef = doc(db, "users", uid);
      await updateDoc(docRef, formData);
      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("প্রোফাইল আপডেট করতে সমস্যা হয়েছে!");
    }
  };

  if (loading) {
    return <p className="text-center py-10">লোড হচ্ছে...</p>;
  }

  return (
    <div className="w-11/12 max-w-lg mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        প্রোফাইল এডিট করুন
      </h2>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="label">নাম</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <label className="label">মোবাইল নম্বর</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <label className="label">বিকল্প মোবাইল নম্বর</label>
        <input
          type="tel"
          name="altPhone"
          value={formData.altPhone}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <label className="label">বিষয়</label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <label className="label">ক্লাস শিক্ষক</label>
        <select
          name="classTeacher"
          value={formData.classTeacher}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="">-- ক্লাস নির্বাচন করুন --</option>
          {classes.map((cls, idx) => (
            <option key={idx} value={cls}>
              {cls}
            </option>
          ))}
        </select>

        <button type="submit" className="btn btn-primary mt-4 w-full">
          সংরক্ষণ করুন
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}
