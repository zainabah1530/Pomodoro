"use client";

import React from "react";
import { Pixelify_Sans } from "next/font/google";
import Timer from "./Components/Timer";
import SettingsContext from "./context/SettingContext";

import { useState, useContext } from "react";

import "./globals.css";
import Setting from "./Components/Setting";
const page = () => {
  const [pomodoroTime, setPomodoroTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);

  const [music, setMusic] = useState("None");

  return (
    <>
      <div>
        <SettingsContext.Provider
          value={{
            pomodoroTime,
            setPomodoroTime,
            breakTime,
            setBreakTime,

            music,
            setMusic,
          }}
        >
          <div className="flex flex-col items-center justify-center h-screen ">
            <Timer />
          </div>
        </SettingsContext.Provider>
      </div>
    </>
  );
};

export default page;
