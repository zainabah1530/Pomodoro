"use client";

import React, { useState } from "react";
import SettingsContext from "../context/SettingContext";
import Timer from "./Components/Timer";
import Tasks from "./Components/Tasks";
import UserProfile from "./Components/UserProfile";
import Setting from "./Components/Setting";

export default function Page() {
  const [pomodoroTime, setPomodoroTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [music, setMusic] = useState("None");

  return (
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
      {/* Navbar */}
      <header className="w-full px-6 py-4 flex items-center justify-between bg-black/40 backdrop-blur-md border-b border-gray-700 shadow-lg sticky top-0 z-50">
        <div className="flex gap-4 items-center">
          <UserProfile />
          <Setting />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] py-10 gap-20">
        <Timer />
        <Tasks />
      </div>
    </SettingsContext.Provider>
  );
}
