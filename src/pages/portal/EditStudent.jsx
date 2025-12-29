import React, { useState } from "react";
import { useNavigate } from "react-router";
import { db } from "../../firebase/firebase.init";
import { doc, updateDoc } from "firebase/firestore";

export default function EditStudent() {
  const navigate = useNavigate();
  const studentData = JSON.parse(localStorage.getItem("studentData")) || {};
  const [formData, setFormData] = useState({
    name: studentData.name || "",
    fatherName: studentData.fatherName || "",
    motherName: studentData.motherName || "",
    dob: studentData.dob || "",
    mobile: studentData.mobile || "",
    grade: studentData.grade || "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    if (e.target.files[0]) setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = studentData.imageUrl || "";

      if (imageFile) {
        setUploading(true);
        const formDataImg = new FormData();
        formDataImg.append("image", imageFile);

        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=93ea398f0480de97e39ea40e2cce5b2e`,
          {
            method: "POST",
            body: formDataImg,
          }
        );

        const data = await response.json();
        if (data.success) imageUrl = data.data.url;
        setUploading(false);
      }

      const userRef = doc(db, "users", studentData.id); // Firestore document ID
      await updateDoc(userRef, { ...formData, imageUrl });

      // Update localStorage
      localStorage.setItem(
        "studentData",
        JSON.stringify({ ...studentData, ...formData, imageUrl })
      );

      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setUploading(false);
      alert("Error updating profile.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">প্রোফাইল সম্পাদনা করুন</h2>

        <label className="label">নাম</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="input w-full mb-3"
          required
        />

        <label className="label">পিতার নাম</label>
        <input
          type="text"
          name="fatherName"
          value={formData.fatherName}
          onChange={handleChange}
          className="input w-full mb-3"
          required
        />

        <label className="label">মাতার নাম</label>
        <input
          type="text"
          name="motherName"
          value={formData.motherName}
          onChange={handleChange}
          className="input w-full mb-3"
          required
        />

        <label className="label">জন্ম তারিখ</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="input w-full mb-3"
          required
        />

        <label className="label">মোবাইল</label>
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          className="input w-full mb-3"
          required
        />

        <label className="label">শ্রেণী</label>
        <input
          type="text"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          className="input w-full mb-4"
          required
        />

        <label className="label">প্রোফাইল ছবি</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file-input w-full mb-4"
        />
        {imageFile && (
          <p className="text-sm text-gray-500 mb-4">
            আপলোডের জন্য প্রস্তুত: {imageFile.name}
          </p>
        )}

        <div className="flex justify-between">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => navigate("/profile")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
