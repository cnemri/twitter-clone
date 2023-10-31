"use client";

import clsx from "clsx";
import React from "react";

type Props = {
  label: string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  onClick: () => void;
  disabled?: boolean;
  outline?: boolean;
};

const Button = ({
  label,
  secondary,
  fullWidth,
  large,
  onClick,
  disabled,
  outline,
}: Props) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "disabled:opacity-70 disabled:cursor-not-allowed rounded-full font-semibold hover:opacity-80 transition border-2",
        {
          "w-full": fullWidth,
          "w-fit": !fullWidth,
          "bg-white text-black border-black": secondary,
          "bg-sky-500 text-white border-sky-500": !secondary,
          "text-xl px-5 py-3": large,
          "text-md px-4 py-2": !large,
          "bg-transparent border-white text-white": outline,
        }
      )}
    >
      <div>{label}</div>
    </button>
  );
};

export default Button;
