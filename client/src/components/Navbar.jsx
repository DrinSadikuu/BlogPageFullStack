import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";

function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="px-5 py-0 flex justify-between items-center mt-5">
      <div className="logo">
        <Link to="/">Logo</Link>
      </div>
      <div className="links flex items-center gap-4">
        <Link className="link decoration-none" to="/?cat=art">
          <h6 className="text-[16px] font-[300]">Art</h6>
        </Link>
        <Link className="link decoration-none" to="/?cat=science">
          <h6 className="text-[16px] font-[300]">SCIENCE</h6>
        </Link>
        <Link className="link decoration-none" to="/?cat=cinema">
          <h6 className="text-[16px] font-[300]">CINEMA</h6>
        </Link>
        <Link className="link decoration-none" to="/?cat=design">
          <h6 className="text-[16px] font-[300]">DESIGN</h6>
        </Link>
        <Link className="link decoration-none" to="/?cat=food">
          <h6 className="text-[16px] font-[300]">FOOD</h6>
        </Link>
        <Link className="link decoration-none" to="/?cat=technology">
          <h6 className="text-[16px] font-[300]">TECHNOLOGY</h6>
        </Link>
        <span className="cursor-pointer ml-4">{currentUser?.username}</span>
        {currentUser ? (
          <span className="ml-4 cursor-pointer" onClick={logout}>
            LOGOUT
          </span>
        ) : (
          <Link to="/login">LOGIN</Link>
        )}
        <span className="ml-8 bg-lightGreen w-[50px] h-[50px] rounded-full flex items-center justify-center hover:bg-white hover:text-teal-800 transition-all duration-600 ease-in">
          <Link to="/write">Write</Link>
        </span>
      </div>
    </div>
  );
}

export default Navbar;
