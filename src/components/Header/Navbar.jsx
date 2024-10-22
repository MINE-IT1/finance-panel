import React, { useState, useEffect } from "react";
import Users from "../../assets/images/Users.png";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { MdOutlineMessage } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PiUserCircleGearFill } from "react-icons/pi";
import { CgLogOut } from "react-icons/cg";
import { FaSearch } from "react-icons/fa"; // Importing Search Icon

const Navbar = () => {
  const emojis = ["😍", "🥰", "😊", "😉", "🤨", "😛"];
  const [currentEmoji, setCurrentEmoji] = useState(emojis[0]);
  const [dropdownVisible, setDropdownVisible] = useState({
    profile: false,
    notification: false,
    message: false,
  });
  const [navbarColor, setNavbarColor] = useState("bg-white"); // Default to white
  const navigate = useNavigate();

  const username = "Abc Jha"

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmoji((prev) => emojis[(emojis.indexOf(prev) + 1) % emojis.length]);
    }, 1000);

    return () => clearInterval(interval);
  }, [emojis]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth > 768) { // Check for normal screen size
        if (window.scrollY > 0) {
          setNavbarColor("bg-white border border-gray-300");
        } else {
          setNavbarColor("bg-gray-300");
        }
      }
    };

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setNavbarColor("bg-white"); // Reset color to white on small screens
      } else {
        setNavbarColor("bg-gray-300"); // Set to gray on larger screens
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize); // Listen for resize events

    // Initial setup based on screen size
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDropdown = (type) => {
    setDropdownVisible((prev) => ({
      profile: type === "profile" ? !prev.profile : false,
      notification: type === "notification" ? !prev.notification : false,
      message: type === "message" ? !prev.message : false,
    }));
  };

  const handleProfileClick = () => {
    navigate("/personal-information");
    setDropdownVisible((prev) => ({ ...prev, profile: false }));
  };

  return (
    <nav className={`w-full h-16 flex items-center justify-between px-6 transition-all duration-300 
      ${navbarColor} rounded-2xl z-10`}>
      
      {/* Conditional Dashboard Text */}
      <div className="hidden md:block text-blue-900 font-semibold text-lg">Dashboard</div>
      
      {/* Search Icon - Visible Only on Small Screens */}
      <div className="md:hidden relative flex items-center">
        <FaSearch className="absolute left-3 text-[#BC2D75] text-xl" />
        <input
          type="text"
          placeholder="Search"
          className="pl-10 pr-4 py-2 border border-[#BC2D75] rounded-full shadow-md 
          focus:outline-none focus:ring focus:ring-[#BC2D75] transition duration-300"
          style={{ width: "100%", maxWidth: "200px" }} // Adjust max-width as needed
        />
      </div>

      <div className="flex items-center space-x-6">
        {/* Notifications Icon */}
        <div className="relative" onClick={() => toggleDropdown("notification")}>
          <NotificationsActiveIcon className="text-gray-600 text-xl cursor-pointer" />
          <AnimatePresence>
            {dropdownVisible.notification && (
              <motion.div
                initial={{ opacity: 0, translateY: -10 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute top-10 right-0 bg-white shadow-lg rounded-xl p-4 mt-1 w-64"
              >
                {["New comment on your post", "Meeting at 3 PM", "New follower added"].map((notification, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
                    <img src="https://via.placeholder.com/30" alt="User Avatar" className="w-8 h-8 rounded-full" />
                    <span>{notification}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Messages Icon */}
        <div className="relative" onClick={() => toggleDropdown("message")}>
          <MdOutlineMessage className="text-gray-600 text-xl cursor-pointer" />
          <AnimatePresence>
            {dropdownVisible.message && (
              <motion.div
                initial={{ opacity: 0, translateY: -10 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute top-10 right-0 bg-white shadow-lg rounded-xl p-4 mt-1 w-64"
              >
                {["Message from John", "New message received", "Reminder: Project deadline"].map((message, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
                    <img src="https://via.placeholder.com/30" alt="User Avatar" className="w-8 h-8 rounded-full" />
                    <span>{message}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Profile Icon */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => toggleDropdown("profile")}>
          <img src={Users} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
          <span className="text-blue-900 font-semibold">{"Hello, "+username}</span>
          <span className="text-xl">{currentEmoji}</span>
        </div>
      </div>

      {/* Profile Dropdown Menu */}
      <AnimatePresence>
        {dropdownVisible.profile && (
          <motion.div
            initial={{ opacity: 0, translateY: -10 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 right-0 bg-white shadow-lg rounded-xl p-4 mt-1 mr-6"
          >
            <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 rounded-lg " onClick={handleProfileClick}>
              <PiUserCircleGearFill className="text-pink-600 text-2xl" />
              <span>My Profile</span>
            </div>
            <div className="border-b border-gray-300 my-2" />
            <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 rounded-lg p-2">
              <CgLogOut className="text-pink-600 text-2xl" />
              <span>Logout</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
