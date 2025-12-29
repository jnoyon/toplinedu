import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.init";

import Hero from "../../components/Hero";
import Features from "../../components/Features";
import AdmissionSection from "../../components/AdmissionSection";
import PortalHome from "../portal/PortalHome";
import DashboardHome from "../../layouts/DashboardHome";

export default function Home() {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const studentData = JSON.parse(localStorage.getItem("studentData"));

    // If student is logged in
    if (studentData?.role === "student") {
      setUserRole("student");
      setLoading(false);
      return;
    }

    // Firebase Auth listener for teachers/admin
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Admin check
        if (user.email === "jihadur51@gmail.com") {
          setUserRole("admin");
        } else {
          // Teacher check
          const ref = doc(db, "teachers", user.uid);
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

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  // Protected renders
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
      <AdmissionSection />
    </div>
  );
}
