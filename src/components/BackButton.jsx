import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "../styles/BackButton.scss";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        className="backbutton"
        onClick={() => {
          navigate("/");
        }}
      >
        <IoArrowBackOutline />
      </button>
    </div>
  );
};

export default BackButton;
