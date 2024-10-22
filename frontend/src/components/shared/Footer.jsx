import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center justify-center mx-auto max-w-7xl h-16 px-4">
        <div className="flex items-center justify-center w-full">
          <h1
            className="text-2xl font-bold cursor-pointer text-[#4A4E69]"
            style={{ fontFamily: "Inter" }}
            onClick={() => navigate("/")}
          >
            Job Hunt
          </h1>
        </div>
      </div>
      {/* Navigation Links */}
      <div
        className="flex justify-center gap-6 text-[#4A4E69] font-medium"
        style={{ fontFamily: "Inter" }}
      >
        <Link
          to="/"
          className="cursor-pointer"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          Home
        </Link>
        <Link
          to="/jobs"
          className="cursor-pointer"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          Jobs
        </Link>
        <Link
          to="/browse"
          className="cursor-pointer"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          Browse
        </Link>
      </div>

      <hr className="my-6" />

      <div
        className="flex items-center justify-center text-[#4A4E69]"
        style={{ fontFamily: "Inter" }}
      >
        <span>xyz @ all rights reserved</span>
      </div>
    </div>
  );
};

export default Footer;
