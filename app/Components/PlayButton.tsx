import React from "react";

function PlayButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="bg-transparent border-2 hover:bg-gray-300 text-white font-serif py-2 px-4 rounded-full transition-colors duration-300 "
      {...props}
    >
      Focus
    </button>
  );
}

export default PlayButton;
