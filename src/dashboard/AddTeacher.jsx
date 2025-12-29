import React, { useState } from "react";
import { db } from "../firebase/firebase.init.js";
import { auth } from "../firebase/firebase.init.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddTeacher() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    altPhone: "",
    subject: "",
    classTeacher: "",
    email: "",
    password: "",
  });

  const classes = ["প্লে", "নার্সারি", "ওয়ান", "টু"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Create Auth Account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const uid = userCredential.user.uid;

      // 2️⃣ Save Teacher Data in /users/{uid}
      await setDoc(doc(db, "users", uid), {
        uid,
        name: formData.name,
        email: formData.email,
        address: formData.address,
        phone: formData.phone,
        altPhone: formData.altPhone,
        subject: formData.subject,
        classTeacher: formData.classTeacher,
        role: "teacher",
        active: true,
      });

      toast.success("শিক্ষক সফলভাবে যোগ করা হয়েছে!");

      // Clear form
      setFormData({
        name: "",
        address: "",
        phone: "",
        altPhone: "",
        subject: "",
        classTeacher: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Add teacher error:", error);
      toast.error(error.message || "শিক্ষক যোগ করতে সমস্যা হয়েছে!");
    }
  };

  return (
    <div className="w-11/12 max-w-lg mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">শিক্ষক যোগ করুন</h2>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="label">শিক্ষকের নাম</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <label className="label">ইমেল</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <label className="label">পাসওয়ার্ড</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <label className="label">ঠিকানা</label>
        <input
          type="text"
          name="address"
          value={formData.address}
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
        />

        <label className="label">ক্লাস শিক্ষক</label>
        <select
          name="classTeacher"
          value={formData.classTeacher}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="">-- ক্লাস নির্বাচন করুন --</option>
          {classes.map((cls, idx) => (
            <option key={idx} value={cls}>
              {cls}
            </option>
          ))}
        </select>

        <button type="submit" className="btn btn-primary mt-4 w-full">
          যোগ করুন
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}
