import React from "react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-white via-blue-50/30 to-red-50/20 py-16 overflow-hidden">
      {/* Decorative blurred orbs */}
      <div className="absolute top-10 left-10 w-60 h-60 bg-[#e74c3c]/10 blur-3xl rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#2c3e50]/10 blur-3xl rounded-full animate-float-slow"></div>

      <div className="relative max-w-7xl mx-auto px-6 text-gray-800">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* School Info */}
          <div className="flex flex-col gap-4 md:w-1/3">
            <h3 className="text-3xl font-extrabold text-[#2c3e50]">
              টপলাইন <span className="text-[#e74c3c]">একাডেমি</span>
            </h3>
            <p className="text-gray-700 leading-relaxed">
              বিরুনীয়া বাজারে অবস্থিত, নিরাপদ ও সৃজনশীল পরিবেশে শিশুদের গড়ে তোলা
              হয় আদর্শ ও নৈতিক মানসম্পন্ন নাগরিক হিসেবে।
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-4 md:w-1/4">
            <h4 className="font-bold text-lg text-[#2c3e50] border-l-4 border-[#e74c3c] pl-2">
              প্রয়োজনীয় লিংক
            </h4>
            <ul className="space-y-2 text-gray-700">
              <li>
                <a
                  href="/admission"
                  className="hover:text-[#e74c3c] transition-colors"
                >
                  ভর্তি ফরম
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-[#e74c3c] transition-colors"
                >
                  আমাদের সম্পর্কে
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-[#e74c3c] transition-colors"
                >
                  যোগাযোগ
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex flex-col gap-4 md:w-1/4">
            <h4 className="font-bold text-lg text-[#2c3e50] border-l-4 border-[#e74c3c] pl-2">
              আমাদের সোশ্যাল মিডিয়া
            </h4>
            <div className="flex gap-4 mt-2">
              {/* Twitter */}
              <a
                href="#"
                className="p-2 bg-white rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  className="fill-[#1DA1F2]"
                >
                  <path
                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 
                    2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555
                    -3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144
                    -1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616
                    -.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084
                    .626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04
                    2.179 1.397 4.768 2.212 7.548 2.212
                    9.142 0 14.307-7.721 13.995-14.646
                    .962-.695 1.797-1.562 2.457-2.549z"
                  ></path>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="#"
                className="p-2 bg-white rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  className="fill-[#FF0000]"
                >
                  <path
                    d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 
                    0-3.897.266-4.356 2.62-4.385 8.816
                    .029 6.185.484 8.549 4.385 8.816
                    3.6.245 11.626.246 15.23 0
                    3.897-.266 4.356-2.62 4.385-8.816
                    -.029-6.185-.484-8.549-4.385-8.816zm-10.615 
                    12.816v-8l8 3.993-8 4.007z"
                  ></path>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="#"
                className="p-2 bg-white rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  className="fill-[#1877F2]"
                >
                  <path
                    d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333
                    c0-.955.192-1.333 1.115-1.333H18V0h-3.808
                    C10.596 0 9 1.583 9 4.615V8z"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-[#2c3e50]">টপলাইন একাডেমি</span>.
          সকল অধিকার সংরক্ষিত।
        </div>
      </div>
    </footer>
  );
}
