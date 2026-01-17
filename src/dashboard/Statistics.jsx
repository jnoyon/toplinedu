import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase.init";
import { collection, getDocs } from "firebase/firestore";

export default function DashboardStatistics() {
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const isAdmin = userData.role === "admin";

  const [loading, setLoading] = useState(true);

  const [classCounts, setClassCounts] = useState({});
  const [feeCounts, setFeeCounts] = useState({});
  const [religionCounts, setReligionCounts] = useState({});
  const [genderCounts, setGenderCounts] = useState({});
  const [addressCounts, setAddressCounts] = useState({});
  const [feeCollected, setFeeCollected] = useState({
    today: 0,
    month: 0,
    total: 0,
  });
  const [feeTypeTotals, setFeeTypeTotals] = useState({}); // new

  useEffect(() => {
    if (!isAdmin) return;

    const fetchStats = async () => {
      try {
        const usersSnap = await getDocs(collection(db, "users"));
        const feesSnap = await getDocs(collection(db, "fees"));

        const classC = { "প্লে-এ": 0, "প্লে-বি": 0, নার্সারি: 0, ওয়ান: 0 };
        const feeC = { 300: 0, 400: 0, 500: 0 };
        const religionC = { ইসলাম: 0, হিন্দু: 0 };
        const genderC = { ছেলে: 0, মেয়ে: 0 };
        const addrC = {};
        const feeTypeC = {
          বেতন: 0,
          বই: 0,
          "ভর্তি ফি": 0,
          "পরীক্ষার ফি": 0,
          ডায়েরী: 0,
          খাতা: 0,
          "সেশন ফি": 0,
          অন্যান্য: 0,
        };

        let todayTotal = 0,
          monthTotal = 0,
          totalAmount = 0;
        const todayStr = new Date().toISOString().split("T")[0];
        const monthStr = new Date().toISOString().slice(0, 7);

        // Student counts
        usersSnap.docs.forEach((doc) => {
          const data = doc.data();
          if (data.role !== "student" || data.active !== true) return;

          // Class
          if (data.grade && classC[data.grade] !== undefined)
            classC[data.grade]++;

          // Monthly fee
          const fee = String(data.monthlyFee || "0");
          if (feeC[fee] !== undefined) feeC[fee]++;

          // Religion
          const rel = (data.religion || "").trim();
          if (rel === "ইসলাম") religionC["ইসলাম"]++;
          else if (rel === "হিন্দু") religionC["হিন্দু"]++;

          // Gender
          const gen = (data.gender || "").trim();
          if (gen === "ছেলে") genderC["ছেলে"]++;
          else if (gen === "মেয়ে") genderC["মেয়ে"]++;

          // Address
          const addr = data.address ? data.address.trim() : "অনির্ধারিত";
          if (!addrC[addr]) addrC[addr] = 0;
          addrC[addr]++;
        });

        // Fee collection & Fee type totals
        feesSnap.docs.forEach((doc) => {
          const data = doc.data();
          const amt = Number(data.amount) || 0;
          totalAmount += amt;
          if (data.date === todayStr) todayTotal += amt;
          if (data.date?.startsWith(monthStr)) monthTotal += amt;

          const desc = data.description?.trim() || "অন্যান্য";
          if (feeTypeC[desc] !== undefined) feeTypeC[desc] += amt;
          else feeTypeC["অন্যান্য"] += amt;
        });

        setClassCounts(classC);
        setFeeCounts(feeC);
        setReligionCounts(religionC);
        setGenderCounts(genderC);
        setAddressCounts(addrC);
        setFeeCollected({
          today: todayTotal,
          month: monthTotal,
          total: totalAmount,
        });
        setFeeTypeTotals(feeTypeC);
      } catch (err) {
        console.error("Error fetching statistics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [isAdmin]);

  if (!isAdmin) return null;
  if (loading)
    return <p className="text-center mt-10 text-gray-500">ডেটা লোড হচ্ছে...</p>;

  const Card = ({ title, value, color }) => (
    <div
      className={`p-4 rounded-xl text-white text-center shadow-sm`}
      style={{ backgroundColor: color }}
    >
      <p className="text-lg font-medium">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );

  return (
    <section className="p-4 max-w-5xl mx-auto space-y-8">
      {/* Class counts */}
      <div className="border rounded-md border-gray-300 p-3">
        <h2 className="text-xl font-bold mb-4 text-center">
          শ্রেণী অনুযায়ী শিক্ষার্থী সংখ্যা
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Object.entries(classCounts).map(([cls, count]) => (
            <Card key={cls} title={cls} value={count} color="#4F46E5" />
          ))}
        </div>
      </div>

      {/* Monthly fee counts */}
      <div className="border rounded-md border-gray-300 p-3">
        <h2 className="text-xl font-bold mb-4 text-center">
          মাসিক বেতন অনুযায়ী শিক্ষার্থী সংখ্যা
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-4">
          {Object.entries(feeCounts).map(([fee, count]) => (
            <Card key={fee} title={`${fee} ৳`} value={count} color="#16A34A" />
          ))}
        </div>
      </div>

      {/* Religion counts */}
      <div className="border rounded-md border-gray-300 p-3">
        <h2 className="text-xl font-bold mb-4 text-center">
          ধর্ম অনুযায়ী শিক্ষার্থী সংখ্যা
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
          {Object.entries(religionCounts).map(([rel, count]) => (
            <Card key={rel} title={rel} value={count} color="#7C3AED" />
          ))}
        </div>
      </div>

      {/* Gender counts */}
      <div className="border rounded-md border-gray-300 p-3">
        <h2 className="text-xl font-bold mb-4 text-center">
          লিঙ্গ অনুযায়ী শিক্ষার্থী সংখ্যা
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
          {Object.entries(genderCounts).map(([gen, count]) => (
            <Card key={gen} title={gen} value={count} color="#3d3d3d" />
          ))}
        </div>
      </div>

      {/* Address counts */}
      <div className="border rounded-md border-gray-300 p-3">
        <h2 className="text-xl font-bold mb-4 text-center">
          ঠিকানার ভিত্তিতে শিক্ষার্থী সংখ্যা
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(addressCounts).map(([addr, count]) => (
            <Card key={addr} title={addr} value={count} color="green" />
          ))}
        </div>
      </div>

      {/* Fee collection */}
      <div className="border rounded-md border-gray-300 p-3">
        <h2 className="text-xl font-bold mb-4 text-center">ফি সংগ্রহ</h2>
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-4">
          <Card
            title="আজকে"
            value={`${feeCollected.today} ৳`}
            color="#EF4444"
          />
          <Card
            title="এই মাসে"
            value={`${feeCollected.month} ৳`}
            color="#DC2626"
          />
          <Card title="মোট" value={`${feeCollected.total} ৳`} color="#B91C1C" />
        </div>
      </div>

      {/* Fee type totals */}
      <div className="border rounded-md border-gray-300 p-3">
        <h2 className="text-xl font-bold mb-4 text-center">
          ফি ধরন অনুযায়ী মোট সংগ্রহ
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-4">
          {Object.entries(feeTypeTotals).map(([type, amount]) => (
            <Card
              key={type}
              title={type}
              value={`${amount} ৳`}
              color="#0EA5E9"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
