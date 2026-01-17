import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { db } from "../../firebase/firebase.init";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditStudent() {
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const studentId = userData.id;

  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    motherName: "",
    dob: "",
    mobile: "",
    grade: "",
    monthlyFee: "",
    address: "", // ✅ New field
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // ▶ Fetch student data from Firestore
  useEffect(() => {
    if (!studentId) return;

    const fetchStudent = async () => {
      try {
        const ref = doc(db, "users", studentId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setStudentData({ id: studentId, ...data });
          setFormData({
            name: data.name || "",
            fatherName: data.fatherName || "",
            motherName: data.motherName || "",
            dob: data.dob || "",
            mobile: data.mobile || "",
            grade: data.grade || "",
            monthlyFee: data.monthlyFee || "",
            address: data.address || "", // ✅ Load existing address
          });
        }
      } catch (err) {
        console.error("Error fetching student:", err);
        alert("ডেটা লোড করতে সমস্যা হয়েছে।");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    if (e.target.files[0]) setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentData?.id) return;

    try {
      let imageUrl = studentData.imageUrl || "";

      if (imageFile) {
        setUploading(true);
        const formDataImg = new FormData();
        formDataImg.append("image", imageFile);

        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=93ea398f0480de97e39ea40e2cce5b2e`,
          { method: "POST", body: formDataImg }
        );
        const data = await response.json();
        if (data.success) imageUrl = data.data.url;
        setUploading(false);
      }

      await updateDoc(doc(db, "users", studentData.id), {
        ...formData,
        imageUrl,
      });

      localStorage.setItem(
        "userData",
        JSON.stringify({ ...studentData, ...formData, imageUrl })
      );

      alert("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setUploading(false);
      alert("প্রোফাইল আপডেটে সমস্যা হয়েছে।");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">ডেটা লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">শিক্ষার্থী ডেটা পাওয়া যায়নি।</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-yellow-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-md border border-green-200"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-green-800">
          প্রোফাইল সম্পাদনা
        </h2>

        {/* Name */}
        <label className="label font-semibold">নাম</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="input input-bordered w-full mb-3"
          required
        />

        {/* Father's Name */}
        <label className="label font-semibold">পিতার নাম</label>
        <input
          type="text"
          name="fatherName"
          value={formData.fatherName}
          onChange={handleChange}
          className="input input-bordered w-full mb-3"
          required
        />

        {/* Mother's Name */}
        <label className="label font-semibold">মাতার নাম</label>
        <input
          type="text"
          name="motherName"
          value={formData.motherName}
          onChange={handleChange}
          className="input input-bordered w-full mb-3"
          required
        />

        {/* Date of Birth */}
        <label className="label font-semibold">জন্ম তারিখ</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="input input-bordered w-full mb-3"
          required
        />

        {/* Mobile */}
        <label className="label font-semibold">মোবাইল</label>
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          className="input input-bordered w-full mb-3"
          required
        />

        {/* Grade */}
        <label className="label font-semibold">শ্রেণী</label>
        <select
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          className="select select-bordered w-full mb-3"
          required
        >
          <option value="">-- নির্বাচন করুন --</option>
          <option value="প্লে-এ">প্লে-এ</option>
          <option value="প্লে-বি">প্লে-বি</option>
          <option value="নার্সারি">নার্সারি</option>
          <option value="ওয়ান">ওয়ান</option>
        </select>

        {/* Monthly Fee */}
        <label className="label font-semibold">মাসিক বেতন (৳)</label>
        <input
          type="number"
          name="monthlyFee"
          value={formData.monthlyFee}
          onChange={handleChange}
          className="input input-bordered w-full mb-4"
          placeholder="অনির্ধারিত"
          disabled
        />

        {/* Address */}
        <label className="label font-semibold">ঠিকানা</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="input input-bordered w-full mb-4"
          placeholder="ঠিকানা লিখুন"
        />

        {/* Profile Image */}
        <label className="label font-semibold">প্রোফাইল ছবি</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file-input file-input-bordered w-full mb-4"
        />
        {imageFile && (
          <p className="text-sm text-gray-500 mb-4">
            আপলোডের জন্য প্রস্তুত: {imageFile.name}
          </p>
        )}

        <div className="flex justify-between gap-2">
          <button
            type="button"
            className="btn btn-outline flex-1"
            onClick={() => navigate("/dashboard")}
          >
            বাতিল
          </button>
          <button
            type="submit"
            className="btn btn-primary flex-1"
            disabled={uploading}
          >
            {uploading ? "আপলোড হচ্ছে..." : "সংরক্ষণ"}
          </button>
        </div>
      </form>
    </div>
  );
}
