"use client";
import React from "react";
import { ButtonProps } from "./Button.types";
import classNames from "classnames";

export const Button = ({ children, fill, className, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={classNames("rounded-md p-2 w-fit",  {
        "bg-secondary text-primary": fill === "solid",
        "border-secondary border": fill === "outline",
        "rounded-none p-0": fill === "clear",
      },className)}
    >
      {children}{fill === "clear" && "   >"}
    </button>
  );
};
