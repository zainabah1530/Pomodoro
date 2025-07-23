import react from "react";
type SettingsType = {
  pomodoroTime: number;
  setPomodoroTime: (time: number) => void;
  breakTime: number;
  setBreakTime: (time: number) => void;

  music?: string;
  setMusic?: (music: string) => void;
};
const SettingsContext = react.createContext<SettingsType>({
  pomodoroTime: 25,
  setPomodoroTime: () => {},
  breakTime: 5,
  setBreakTime: () => {},

  music: "None",
  setMusic: () => {},
});

export default SettingsContext;
