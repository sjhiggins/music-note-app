import React from "react";

function Button({ onClick, children, type, className }) {
  if (type === "outline") {
    return (
      <button
        className={`mr-2 text-gray-700 text-xs font-medium border-[1px] py-0.25 px-1 border-gray-400 rounded-full hover:border-gray-500 hover:text-slate-700 ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  } else if (type === "solid") {
    return (
      <button
        className={`mr-2 text-white text-xs bg-gray-700 font-medium border-[1px]  py-0.25 px-1 border-gray-700 rounded-full  hover:text-gray-700 hover:bg-white ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
}

Button.defaultProps = {
  text: Button,
  type: 1,
};

export default Button;
