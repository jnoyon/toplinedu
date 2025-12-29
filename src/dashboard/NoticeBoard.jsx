import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase.init.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NoticeBoard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [notices, setNotices] = useState([]);

  const fetchNotices = async () => {
    try {
      const noticesRef = collection(db, "notices");
      const q = query(noticesRef, orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);
      const noticeList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotices(noticeList);
    } catch (err) {
      console.error(err);
      toast.error("Notice fetch failed!");
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error("Title and description are required!");
      return;
    }

    try {
      const noticesRef = collection(db, "notices");
      await addDoc(noticesRef, {
        title,
        description,
        expiryDate: expiryDate || null,
        timestamp: serverTimestamp(),
      });

      toast.success("Notice added successfully!");
      setTitle("");
      setDescription("");
      setExpiryDate("");
      fetchNotices();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add notice!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notice?")) return;

    try {
      await deleteDoc(doc(db, "notices", id));
      toast.success("Notice deleted!");
      fetchNotices();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete notice!");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        নোটিশ বোর্ড
      </h2>

      {/* Add Notice Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md max-w-3xl mx-auto mb-6 space-y-4"
      >
        <h3 className="text-xl font-semibold text-gray-700">
          নতুন নোটিশ যোগ করুন
        </h3>

        <input
          type="text"
          placeholder="নোটিশ শিরোনাম"
          className="input input-bordered w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="নোটিশ বর্ণনা"
          className="textarea textarea-bordered w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <input
          type="date"
          className="input input-bordered w-full max-w-xs"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />

        <button type="submit" className="btn btn-primary w-full mt-2">
          নোটিশ যোগ করুন
        </button>
      </form>

      {/* Display Notices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="bg-white p-4 rounded-2xl shadow hover:shadow-xl transition-shadow relative"
          >
            <h4 className="text-lg font-semibold text-gray-700">
              {notice.title}
            </h4>
            <p className="text-gray-600 mt-1">{notice.description}</p>
            {notice.expiryDate && (
              <p className="text-sm text-red-500 mt-2">
                মেয়াদ শেষ: {notice.expiryDate}
              </p>
            )}

            <button
              onClick={() => handleDelete(notice.id)}
              className="btn btn-error btn-sm absolute top-2 right-2"
            >
              মুছুন
            </button>
          </div>
        ))}

        {notices.length === 0 && (
          <p className="text-center text-gray-600 col-span-full mt-4">
            কোনো নোটিশ নেই।
          </p>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
