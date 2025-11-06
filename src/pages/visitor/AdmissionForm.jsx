import React from "react";

export default function AdmissionForm() {
  return (
    <div className="py-5 flex justify-center">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6 w-full max-w-3xl">
        <legend className="fieldset-legend text-lg font-semibold mb-2">
          ভর্তি ফর্ম
        </legend>

        <label className="label">শিক্ষার্থীর নাম</label>
        <input
          type="text"
          className="input w-full"
          placeholder="বাংলায় লিখুন"
        />

        <label className="label">পিতার নাম</label>
        <input
          type="text"
          className="input w-full"
          placeholder="বাংলায় লিখুন"
        />

        <label className="label">মাতার নাম</label>
        <input
          type="text"
          className="input w-full"
          placeholder="বাংলায় লিখুন"
        />

        <label className="label">জন্ম তারিখ</label>
        <input type="date" className="input w-full" />

        <label className="label">ধর্ম</label>
        <select className="select w-full">
          <option>বাছাই করুন</option>
          <option>ইসলাম</option>
          <option>হিন্দু</option>
        </select>

        <label className="label">লিঙ্গ</label>
        <select className="select w-full">
          <option>বাছাই করুন</option>
          <option>ছেলে</option>
          <option>মেয়ে</option>
        </select>

        <label className="label">ভর্তির শ্রেণি</label>
        <select className="select w-full">
          <option>বাছাই করুন</option>
          <option>প্লে</option>
          <option>নার্সারি</option>
          <option>ওয়ান</option>
        </select>

        <label className="label">মোবাইল নম্বর</label>
        <input
          type="text"
          className="input w-full"
          placeholder="অভিভাবকের নম্বর"
        />

        <div className="mt-4 flex justify-end">
          <input
            type="submit"
            value="জমা দিন"
            className="btn btn-error text-white"
          />
        </div>
      </fieldset>
    </div>
  );
}
