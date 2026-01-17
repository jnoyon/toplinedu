import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.init";

import Hero from "../../components/Hero";
import Features from "../../components/Features";
import PortalHome from "../portal/PortalHome";
import DashboardHome from "../../layouts/DashboardHome";

export default function Home() {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const studentData = JSON.parse(localStorage.getItem("userData"));

    // If student is logged in
    if (studentData?.role === "student") {
      setUserRole("student");
      setLoading(false);
      return;
    }

    const adminEmails = ["jihadur51@gmail.com", "jillurrahmandiu@gmail.com"];

    // Firebase Auth listener for teachers/admin
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (adminEmails.includes(user.email)) {
          setUserRole("admin");
        } else {
          // Teacher check from 'users' collection
          const ref = doc(db, "users", user.uid);
          const snap = await getDoc(ref);

          if (snap.exists() && snap.data().role === "teacher") {
            setUserRole("teacher");
          } else {
            setUserRole(null);
          }
        }
      } else {
        setUserRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );

  if (userRole === "student") return <PortalHome />;
  if (userRole === "teacher" || userRole === "admin") return <DashboardHome />;

  return (
    <div>
      <Helmet>
        <title>Topline Academy</title>
        <meta
          name="description"
          content="টপলাইন একাডেমি শিশুদের আদব, নৈতিকতা ও সাধারণ জ্ঞানে গড়ে তোলে আলোকিত ভবিষ্যতের পথে। ভর্তি চলছে এখনই!"
        />
      </Helmet>

      <Hero />
      <Features />
    </div>
  );
}
