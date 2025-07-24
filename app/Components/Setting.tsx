import React, { useContext, useState, useRef } from "react";
import SettingsContext from "../../context/SettingContext";
import SettingsIcon from "@mui/icons-material/Settings";
import { Popper, Box } from "@mui/material";

const musicOptions = [
  { label: "None", value: "None" },
  { label: "Focus", value: "/focus.mp3" },
  { label: "Lo-fi", value: "/jazz.mp3" },
  { label: "Rain", value: "/rain.mp3" },
];

const Setting = () => {
  const settingsInfo = useContext(SettingsContext)!;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [tempPomodoro, setTempPomodoro] = useState(settingsInfo.pomodoroTime);
  const [tempBreak, setTempBreak] = useState(settingsInfo.breakTime);
  const [tempmusic, settempMusic] = useState(
    typeof settingsInfo.music === "string" ? settingsInfo.music : "None"
  );
  const [musicOpen, setMusicOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleSave = () => {
    settingsInfo.setPomodoroTime(tempPomodoro);
    settingsInfo.setBreakTime(tempBreak);
    if (settingsInfo.setMusic) settingsInfo.setMusic(tempmusic);
    setAnchorEl(null); // Close popper
  };

  const open = Boolean(anchorEl);
  const id = open ? "settings-popper" : undefined;

  return (
    <>
      <button aria-describedby={id} onClick={handleClick}>
        <SettingsIcon
          fontSize="large"
          className="text-white hover:bg-gray-300 transition-colors duration-300 border-white border-2 rounded-full p-2 hover:-translate-y-1 hover:scale-110"
        />
      </button>

      <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-start">
        <Box
          sx={{
            p: 2,
            bgcolor: "transparent",
            minWidth: 300,
            maxWidth: 400,
          }}
        >
          <div className="flex flex-col space-y-4 bg-black/60 p-4 rounded-xl backdrop-blur-md border border-gray-500 w-full">
            <label className="text-sm font-semibold text-white">
              Pomodoro Time (min):
              <input
                type="number"
                value={tempPomodoro}
                min={1}
                max={120}
                onChange={(e) => setTempPomodoro(Number(e.target.value))}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-transparent text-white"
              />
            </label>

            <label className="text-sm font-semibold text-white">
              Break Time (min):
              <input
                type="number"
                value={tempBreak}
                min={1}
                max={120}
                onChange={(e) => setTempBreak(Number(e.target.value))}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-transparent text-white"
              />
            </label>

            <div className="relative">
              <label className="text-sm font-semibold text-white block mb-1">
                Music
              </label>
              <button
                onClick={() => setMusicOpen(!musicOpen)}
                className="w-full p-2 bg-transparent border border-gray-300 rounded-md shadow-sm text-white flex justify-between items-center"
              >
                {musicOptions.find((opt) => opt.value === tempmusic)?.label}

                <span className="ml-2">▾</span>
              </button>

              {musicOpen && (
                <ul className="absolute z-20 mt-1 w-full bg-black bg-opacity-70 border border-white rounded-md shadow-lg backdrop-blur">
                  {musicOptions.map((option) => (
                    <li
                      key={option.value}
                      onClick={() => {
                        settempMusic(option.value);
                        setMusicOpen(false);
                      }}
                      className={`px-4 py-2 cursor-pointer border-b border-white last:border-none hover:bg-white hover:text-black text-white ${
                        tempmusic === option.value
                          ? " text-black"
                          : "bg-transparent"
                      }`}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              onClick={handleSave}
              className="bg-transparent border-2 hover:bg-gray-300 text-white font-serif py-1 px-4 rounded-full transition-colors duration-300"
            >
              Save Settings
            </button>
          </div>
        </Box>
      </Popper>
    </>
  );
};

export default Setting;
