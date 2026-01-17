import React, { useState } from "react";
import { db } from "../../firebase/firebase.init.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

export default function AdmissionForm() {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    motherName: "",
    dob: "",
    religion: "",
    gender: "",
    grade: "",
    mobile: "",
    monthlyFee: "",
  });

  const [modalData, setModalData] = useState({
    studentId: "",
    firebaseId: "",
    passcode: "",
    monthlyFee: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const yearPrefix = "26"; // for 2026
      const usersRef = collection(db, "users");

      // Get last studentId
      const q = query(usersRef, orderBy("studentId", "desc"), limit(1));
      const lastSnapshot = await getDocs(q);

      let nextId = "001";
      if (!lastSnapshot.empty) {
        const lastId = lastSnapshot.docs[0].data().studentId;
        const numeric = parseInt(lastId.slice(2)) + 1;
        nextId = numeric.toString().padStart(3, "0");
      }

      const studentId = yearPrefix + nextId;
      const passcode = Math.floor(100000 + Math.random() * 900000).toString();

      // Handle image upload
      const fileInput = document.querySelector('input[type="file"]');
      let imageUrl = "";
      if (fileInput.files[0]) {
        const formDataImg = new FormData();
        formDataImg.append("image", fileInput.files[0]);

        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=93ea398f0480de97e39ea40e2cce5b2e`,
          { method: "POST", body: formDataImg }
        );

        const data = await response.json();
        if (data.success) imageUrl = data.data.url;
      }

      // Admission date
      const today = new Date();
      const admissionDate = today.toISOString().split("T")[0]; // yyyy-mm-dd

      // Add document
      const docRef = await addDoc(usersRef, {
        ...formData,
        role: "student",
        studentId,
        passcode,
        active: false,
        imageUrl,
        admissionDate,
      });

      // Open modal with info
      setModalData({
        studentId,
        firebaseId: docRef.id,
        passcode,
        monthlyFee: formData.monthlyFee || "অনির্ধারিত",
      });
      setIsModalOpen(true);

      // Reset form
      setFormData({
        name: "",
        fatherName: "",
        motherName: "",
        dob: "",
        religion: "",
        gender: "",
        grade: "",
        mobile: "",
        monthlyFee: "",
      });
      fileInput.value = "";
    } catch (error) {
      console.error(error);
      alert("শিক্ষার্থী তৈরি করতে সমস্যা হয়েছে!");
    }
  };

  return (
    <>
      <form className="py-5 flex justify-center" onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6 w-full max-w-3xl">
          <legend className="fieldset-legend text-lg font-semibold mb-2">
            ভর্তি ফর্ম
          </legend>

          <label className="label">শিক্ষার্থীর নাম</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input w-full"
            placeholder="বাংলায় লিখুন"
            required
          />

          <label className="label">পিতার নাম</label>
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            className="input w-full"
            placeholder="বাংলায় লিখুন"
            required
          />

          <label className="label">মাতার নাম</label>
          <input
            type="text"
            name="motherName"
            value={formData.motherName}
            onChange={handleChange}
            className="input w-full"
            placeholder="বাংলায় লিখুন"
            required
          />

          <label className="label">জন্ম তারিখ</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="input w-full"
            required
          />

          <label className="label">ধর্ম</label>
          <select
            name="religion"
            value={formData.religion}
            onChange={handleChange}
            className="select w-full"
            required
          >
            <option value="">বাছাই করুন</option>
            <option>ইসলাম</option>
            <option>হিন্দু</option>
          </select>

          <label className="label">লিঙ্গ</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="select w-full"
            required
          >
            <option value="">বাছাই করুন</option>
            <option>ছেলে</option>
            <option>মেয়ে</option>
          </select>

          <label className="label">ভর্তির শ্রেণি</label>
          <select
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className="select w-full"
            required
          >
            <option value="">বাছাই করুন</option>
            <option>প্লে-এ</option>
            <option>প্লে-বি</option>
            <option>নার্সারি</option>
            <option>ওয়ান</option>
          </select>

          <label className="label">মোবাইল নম্বর</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="input w-full"
            placeholder="অভিভাবকের নম্বর"
            required
          />

          {/* Monthly Fee */}
          <label className="label">মাসিক বেতন (ঐচ্ছিক)</label>
          <input
            type="number"
            name="monthlyFee"
            value={formData.monthlyFee}
            onChange={handleChange}
            className="input w-full"
            placeholder="৳"
          />

          <fieldset className="fieldset mt-4">
            <legend className="fieldset-legend">শিক্ষার্থীর ছবি</legend>
            <input type="file" className="file-input w-full" />
            <label className="label">পরেও সংযুক্ত করতে পারবেন</label>
          </fieldset>

          <div className="mt-4 flex justify-end">
            <button type="submit" className="btn btn-error text-white">
              জমা দিন
            </button>
          </div>
        </fieldset>
      </form>

      {/* Modal */}
      {isModalOpen && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">শিক্ষার্থী নিবন্ধিত!</h3>
            <p className="py-2">Student ID: {modalData.studentId}</p>
            <p className="py-2">Passcode: {modalData.passcode}</p>
            <p className="py-2">
              Admission Date: {new Date().toLocaleDateString("bn-BD")}
            </p>
            <p className="py-2">
              মাসিক বেতন:{" "}
              {modalData.monthlyFee ? `${modalData.monthlyFee}৳` : "অনির্ধারিত"}
            </p>
            <div className="modal-action">
              <button className="btn" onClick={() => setIsModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
