"use client";
import classNames from "classnames";
import { ToastTypes } from "./Toast.types";
import { Loader } from "../Loader/Loader";

export const Toast = ({ type, message }: ToastTypes) => {
  return (
    <div
      className={classNames(
        "w-80 fixed bottom-4 right-4 flex border-2 py-1 px-2 border-primary shadow-2xl",
        {
          "text-error": type === "error",
          "text-success": type === "success",
          "text-info": type === "info",
        }
      )}
    >
      <Loader type={type} size="small"/>
      <div className="ml-4">{message}</div>
    </div>
  );
};
