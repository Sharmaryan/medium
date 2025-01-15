"use client";
import React from "react";
import { ButtonProps } from "./Button.types";
import classNames from "classnames";
import { Loader } from "../Loader/Loader";
import { Size } from "../Loader/Loader.types";

export const Button = ({ children, fill, className, isLoading=false, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={classNames("flex gap-2 justify-center rounded-md p-2 w-fit",  {
        "bg-secondary text-primary": fill === "solid" && !isLoading,
        "border-secondary border": fill === "outline",
        "rounded-none p-0": fill === "clear",
        "bg-disable text-disable-text": isLoading
      },className)}
      disabled={isLoading}
    >
      {children}{fill === "clear" && "   >"}
      {isLoading && <Loader size={Size.Default}/>}
    </button>
  );
};
