import React from "react";

function PlayButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="bg-transparent border-2 hover:bg-gray-300 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110  text-white font-serif py-2 px-4 rounded-full  "
      {...props}
    >
      Focus
    </button>
  );
}

export default PlayButton;
