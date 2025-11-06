import { FaPhoneSquare } from "react-icons/fa";
import { Link } from "react-router";

export default function Header() {
  return (
    <div className="drawer">
      <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <div className="navbar sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between w-11/12 mx-auto py-3">
            {/* Left section - Logo + Mobile button */}
            <div className="flex items-center gap-3">
              {/* Mobile menu button */}
              <div className="lg:hidden">
                <label
                  htmlFor="mobile-drawer"
                  className="btn btn-circle btn-ghost swap swap-rotate"
                >
                  <input type="checkbox" />
                  {/* Hamburger icon */}
                  <svg
                    className="swap-off fill-[#2c3e50]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 512 512"
                  >
                    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                  </svg>
                  {/* Close icon */}
                  <svg
                    className="swap-on fill-[#2c3e50]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 512 512"
                  >
                    <polygon
                      points="400 145.49 366.51 112 256 222.51 145.49 112 
                      112 145.49 222.51 256 112 366.51 145.49 400 
                      256 289.49 366.51 400 400 366.51 289.49 
                      256 400 145.49"
                    />
                  </svg>
                </label>
              </div>

              {/* Logo */}
              <Link
                to="/"
                className="text-2xl font-extrabold tracking-tight text-[#2c3e50] hover:text-[#e74c3c] transition-colors"
              >
                টপলাইন <span className="text-[#e74c3c]">একাডেমি</span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden lg:flex gap-8 font-semibold text-[#2c3e50]">
              <li>
                <Link
                  to="/about"
                  className="hover:text-[#e74c3c] transition-colors"
                >
                  আমাদের সম্পর্কে
                </Link>
              </li>
              <li>
                <Link
                  to="/admission"
                  className="hover:text-[#e74c3c] transition-colors"
                >
                  ভর্তি ফরম
                </Link>
              </li>
              <li>
                <Link
                  to="/hsc"
                  className="hover:text-[#e74c3c] transition-colors"
                >
                  এইচএসসি প্রোগ্রাম
                </Link>
              </li>
              <li>
                <Link
                  to="/portal"
                  className="hover:text-[#e74c3c] transition-colors"
                >
                  পোর্টাল
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="hover:text-[#e74c3c] transition-colors"
                >
                  লগইন
                </Link>
              </li>
            </ul>

            {/* Contact Button */}
            <div className="hidden sm:flex">
              <a
                href="tel:01619756262"
                className="flex items-center gap-2 text-white bg-[#e74c3c] px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-[#c0392b] transition-all"
              >
                <FaPhoneSquare className="text-xl" />
                01619756262
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer (Mobile Menu) */}
      <div className="drawer-side z-50">
        <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
        <ul className="menu bg-white/95 backdrop-blur-md min-h-full w-72 p-6 text-lg font-medium text-[#2c3e50]">
          <li>
            <Link to="/about">আমাদের সম্পর্কে</Link>
          </li>
          <li>
            <Link to="/admission">ভর্তি ফরম</Link>
          </li>
          <li>
            <Link to="/hsc">এইচএসসি প্রোগ্রাম</Link>
          </li>
          <li>
            <Link to="/portal">পোর্টাল</Link>
          </li>
          <li>
            <Link to="/login">লগইন</Link>
          </li>
          <div className="mt-6 border-t border-gray-300 pt-4">
            <a
              href="tel:01619756262"
              className="flex items-center gap-2 text-white bg-[#e74c3c] px-4 py-2 rounded-md text-lg font-medium hover:bg-[#c0392b] transition"
            >
              <FaPhoneSquare className="text-xl" />
              01619756262
            </a>
          </div>
        </ul>
      </div>
    </div>
  );
}
