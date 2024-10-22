import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/jiffy-logo.svg";
import TypingAnimator from "react-typing-animator";
import {
  faTachometerAlt,
  faMoneyCheckAlt,
  faReceipt,
  faPeopleArrows,
  faChartPie,
  faFileContract,
  faChartArea,
  faBars,
  faTimes,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faInstagram,
  faYoutube,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import Navbar from "../Header/Navbar";

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const scrollTimeout = useRef(null);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: faTachometerAlt, color: "text-blue-500" },
    { name: "Incomes", path: "/income", icon: faMoneyCheckAlt, color: "text-green-500" },
    { name: "Expenses", path: "/expense", icon: faReceipt, color: "text-red-500" },
    { name: "Payroll", path: "/payroll", icon: faPeopleArrows, color: "text-purple-500" },
    { name: "Profitability", path: "/profit", icon: faChartPie, color: "text-yellow-500" },
    { name: "Invoices", path: "/invoice", icon: faFileContract, color: "text-indigo-500" },
    { name: "Reports", path: "/reports", icon: faChartArea, color: "text-teal-500" },
  ];

  const handleSectionClick = (sectionName) => {
    setActiveSection(sectionName);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleScroll = () => {
    setScrolling(true);
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    scrollTimeout.current = setTimeout(() => {
      setScrolling(false);
    }, 6000);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return (
    <>
      {/* Top bar for small screens */}
      <div className="md:hidden p-4 bg-white shadow-lg fixed top-0 left-0 z-20 w-full flex justify-between items-center">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 focus:outline-none"
        >
          <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} size="lg" />
        </button>
        <img src={logo} alt="Logo" className="w-30 h-10 ml-2" />
        <button
          onClick={toggleDropdown}
          className="text-gray-600 focus:outline-none relative"
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>

        {/* Navbar dropdown */}
        {isDropdownOpen && (
          <div className="absolute left-1/2 transform -translate-x-1/2 mt-36 w-full max-w-[95%] md:max-w-[80%] lg:max-w-[75%] rounded-lg shadow-lg z-30">
            <Navbar />
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } transition-transform duration-300 transform fixed md:relative z-20 w-64 bg-white shadow-lg h-screen flex flex-col`}
      >
        <div className="md:hidden p-4">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 focus:outline-none"
          >
            <FontAwesomeIcon icon={faChevronLeft} size="lg" />
          </button>
        </div>

        <div className="p-5 flex items-center justify-start md:mt-4">
          <img src={logo} alt="Logo" className="w-30 h-10" />
        </div>

        <div
          className={`flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 ${
            scrolling ? "scrolling" : "scrollbar-none"
          }`}
          onScroll={handleScroll}
        >
          <ul className="mt-4">
            {menuItems.map((item, index) => (
              <li key={index} className="text-gray-600">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center p-4 mb-2 rounded-lg transition-colors duration-300 ${
                      isActive ? "bg-[#BC2D75] text-white" : "hover:bg-gray-100"
                    }`
                  }
                  end
                  onClick={() => handleSectionClick(item.name)}
                >
                  <FontAwesomeIcon icon={item.icon} className={`mr-3 text-xl ${item.color}`} />
                  <span className="text-lg">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Social Links */}
          <div className="p-4">
            <TypingAnimator
              textArray={["Let's Connect..."]}
              cursorColor="linear-gradient(90deg, #f36, #f90)"
              textColor="linear-gradient(90deg, #f36, #f90)"
              fontSize="20px"
              loop
              typingSpeed={100}
              delaySpeed={1000}
              backspace
              dynamicDelay
            />
            <div className="flex justify-center mt-3 space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="text-pink-500 text-2xl hover:text-blue-400 transition-colors duration-300"
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="text-pink-500 text-2xl hover:text-[#E1306C] transition-colors duration-300"
                />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faYoutube}
                  className="text-pink-500 text-2xl hover:text-red-600 transition-colors duration-300"
                />
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faWhatsapp}
                  className="text-pink-500 text-2xl hover:text-green-500 transition-colors duration-300"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
