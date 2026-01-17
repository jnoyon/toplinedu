import { FaPhoneSquare, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import Swal from "sweetalert2";
import logo from "/topline.jpeg";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const studentData = JSON.parse(localStorage.getItem("studentData"));
    const staffData = JSON.parse(localStorage.getItem("userData"));
    setUser(studentData || staffData || null);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "আপনি কি সত্যিই লগআউট করতে চান?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "হ্যাঁ, লগআউট করুন",
      cancelButtonText: "বাতিল",
    }).then((result) => {
      if (result.isConfirmed) {
        const auth = getAuth();
        signOut(auth).catch((err) => console.error("SignOut Error:", err));
        localStorage.removeItem("studentData");
        localStorage.removeItem("userData");
        setUser(null);
        navigate("/login");
      }
    });
  };

  const isStudent = user?.role === "student";
  const isStaff = user && (user.role === "teacher" || user.role === "admin");

  return (
    <div className="drawer">
      <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />

      {/* MAIN NAVBAR */}
      <div className="drawer-content">
        <nav className="navbar sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-md">
          <div className="flex items-center justify-between w-11/12 mx-auto py-3">
            {/* LEFT */}
            <div className="flex items-center gap-3">
              {/* MOBILE HAMBURGER */}
              <div className="lg:hidden">
                <label
                  htmlFor="mobile-drawer"
                  className="btn btn-circle btn-ghost swap swap-rotate"
                >
                  <input type="checkbox" />
                  <svg
                    className="swap-off fill-[#2c3e50]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 512 512"
                  >
                    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                  </svg>
                  <svg
                    className="swap-on fill-[#2c3e50]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 512 512"
                  >
                    <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                  </svg>
                </label>
              </div>

              {/* LOGO */}
              <Link
                to="/"
                className="text-2xl font-extrabold tracking-tight text-[#2c3e50] hover:text-[#e74c3c] transition-colors"
              >
                টপলাইন <span className="text-[#e74c3c]">একাডেমি</span>
              </Link>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-4">
              {/* DESKTOP MENU */}
              <ul className="hidden lg:flex items-center gap-6 font-semibold text-[#2c3e50]">
                {isStudent && (
                  <li>
                    <Link to="/portal">পোর্টাল</Link>
                  </li>
                )}
                {isStaff && (
                  <li>
                    <Link to="/dashboard">ড্যাশবোর্ড</Link>
                  </li>
                )}

                {user && (
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-red-600 font-bold hover:text-red-700"
                    >
                      <FaSignOutAlt /> লগআউট
                    </button>
                  </li>
                )}

                {!user && (
                  <li>
                    <Link to="/login">লগইন</Link>
                  </li>
                )}
              </ul>

              {/* CALL BUTTON (Desktop Only) */}
              <a
                href="tel:01619756262"
                className="hidden sm:flex items-center gap-2 text-white bg-[#e74c3c] px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-[#c0392b] transition-all"
              >
                <FaPhoneSquare className="text-xl" /> 01619756262
              </a>

              {/* MOBILE USER ICON */}
              {user && (
                <div className="relative lg:hidden">
                  <FaUserCircle
                    className="text-4xl text-[#2c3e50] active:scale-95 cursor-pointer"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  />

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border p-4 z-50">
                      <p className="font-bold text-[#2c3e50] text-lg">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {isStaff ? user.subject || "শিক্ষক" : "শিক্ষার্থী"}
                      </p>

                      <div className="divider my-2"></div>

                      <Link
                        to={
                          isStudent ? "edit-student" : "dashboard/edit-profile"
                        }
                        className="block py-2 hover:text-[#e74c3c]"
                        onClick={() => setDropdownOpen(false)}
                      >
                        এডিট প্রোফাইল
                      </Link>

                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          handleLogout();
                        }}
                        className="flex items-center gap-2 mt-2 text-red-600 font-semibold hover:text-red-700"
                      >
                        <FaSignOutAlt /> লগআউট
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* MOBILE DRAWER */}
      <div className="drawer-side z-50">
        <label htmlFor="mobile-drawer" className="drawer-overlay"></label>

        <ul
          className="menu bg-white/95 backdrop-blur-md min-h-full w-72 p-6 text-lg font-medium text-[#2c3e50]"
          onClick={() =>
            (document.getElementById("mobile-drawer").checked = false)
          }
        >
          <li>
            <img
              src={logo}
              className="rounded-full w-32 mx-auto mb-4 shadow-md"
            />
          </li>

          {isStudent && (
            <li>
              <Link to="/portal">পোর্টাল</Link>
            </li>
          )}
          {isStaff && (
            <li>
              <Link to="/dashboard">ড্যাশবোর্ড</Link>
            </li>
          )}

          {user ? (
            <li className="mt-4">
              <button
                onClick={handleLogout}
                className="w-full text-left bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                লগআউট
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login">লগইন</Link>
            </li>
          )}

          <div className="mt-6 border-t border-gray-300 pt-4">
            <a
              href="tel:01619756262"
              className="flex items-center gap-2 text-white bg-[#e74c3c] px-4 py-2 rounded-md text-lg font-medium hover:bg-[#c0392b] transition"
            >
              <FaPhoneSquare className="text-xl" /> 01619756262
            </a>
          </div>
        </ul>
      </div>
    </div>
  );
}
