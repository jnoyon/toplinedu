import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebase/firebase.init.js";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passcode, setPasscode] = useState("");

  const navigate = useNavigate();
  const auth = getAuth();

  // Admin emails
  const adminEmails = ["jihadur51@gmail.com", "jillurrahmandiu@gmail.com"];

  // ---------------------------------------------------------
  // 🔹 Handle Login Submit
  // ---------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent login if someone is already logged in
    const existingUser = localStorage.getItem("userData");
    if (existingUser) {
      toast.error("দয়া করে অন্য রোল লগইন করার জন্য প্রথমে লগআউট করুন!", {
        autoClose: 4000,
      });
      return;
    }

    try {
      let userData = null;

      // ======================================================
      // 🔵 STUDENT LOGIN — Passcode Based
      // ======================================================
      if (role === "student") {
        if (passcode.length !== 6) {
          toast.error("৬-সংখ্যার বৈধ পাসকোড দিন!", { autoClose: 3500 });
          return;
        }

        const usersRef = collection(db, "users");
        const q = query(
          usersRef,
          where("passcode", "==", passcode),
          where("role", "==", "student"),
          where("active", "==", true)
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          toast.error("পাসকোড সঠিক নয় অথবা অ্যাকাউন্ট নিষ্ক্রিয়!", {
            autoClose: 3500,
          });
          return;
        }

        const studentDoc = snapshot.docs[0];
        userData = { id: studentDoc.id, ...studentDoc.data(), role: "student" };

        localStorage.setItem("userData", JSON.stringify(userData));
        toast.success(`স্বাগতম ${userData.name}!`);

        navigate("/portal");
        return;
      }

      // ======================================================
      // 🔵 TEACHER / ADMIN LOGIN — Firebase Auth + Firestore
      // ======================================================
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      if (role === "admin") {
        if (!adminEmails.includes(email)) {
          toast.error("আপনি অ্যাডমিন নন!");
          return;
        }

        userData = {
          uid,
          name: userCredential.user.displayName || email,
          email,
          role: "admin",
        };

        localStorage.setItem("userData", JSON.stringify(userData));
        toast.success("অ্যাডমিন হিসেবে লগইন সফল!");
        navigate("/dashboard");
        return;
      }

      // Teacher login
      const teacherDoc = await getDoc(doc(db, "users", uid));

      if (!teacherDoc.exists()) {
        toast.error("আপনার তথ্য Firestore-এ পাওয়া যায়নি!");
        return;
      }

      const teacherData = teacherDoc.data();

      if (teacherData.role !== "teacher") {
        toast.error("আপনি শিক্ষক নন!");
        return;
      }

      userData = {
        uid,
        name: teacherData.name,
        email: teacherData.email,
        role: teacherData.role,
      };

      localStorage.setItem("userData", JSON.stringify(userData));
      toast.success(`স্বাগতম ${teacherData.name}!`);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "লগইন ব্যর্থ হয়েছে!", { autoClose: 4000 });
    }
  };

  // ---------------------------------------------------------
  // 🔹 UI RENDER
  // ---------------------------------------------------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-red-50 py-12 px-4">
      <div className="card w-full max-w-sm bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl">
        <div className="card-body p-8">
          <h2 className="text-2xl font-bold text-[#2c3e50] mb-6 text-center">
            লগইন
          </h2>

          {/* Role Selector */}
          <div className="mb-4">
            <label className="label font-semibold text-gray-700">
              রোল নির্বাচন করুন
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="select w-full"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {role === "student" ? (
              <>
                <label className="label font-semibold text-gray-700">
                  পাসকোড
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="৬-সংখ্যার পাসকোড"
                  required
                />
              </>
            ) : (
              <>
                <label className="label font-semibold text-gray-700">
                  ইমেল
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered w-full"
                  required
                />

                <label className="label font-semibold text-gray-700">
                  পাসওয়ার্ড
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full"
                  required
                />
              </>
            )}

            <button className="btn btn-primary mt-4 w-full" type="submit">
              লগইন করুন
            </button>
          </form>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
