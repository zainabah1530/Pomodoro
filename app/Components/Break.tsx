import React from "react";

const Break = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="bg-transparent border-2 hover:bg-gray-300 text-white font-bold py-2 px-4 font-serif rounded-full transition-colors duration-300"
      {...props}
    >
      Break
    </button>
  );
};

export default Break;
