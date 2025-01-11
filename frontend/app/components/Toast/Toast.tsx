"use client";
import classNames from "classnames";
import { ToastTypes } from "./Toast.types";
import { Loader } from "../Loader/Loader";
import { useEffect } from "react";

export const Toast = ({
  type,
  message,
  id,
  onClose,
  duration = 3000,
}: ToastTypes) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);
  return (
    <div
      className={classNames(
        "w-80 fixed bottom-4 right-4 flex border-2 py-1 px-2 border-primary shadow-2xl",
        {
          "text-error": type === "ERROR",
          "text-success": type === "SUCCESS",
          "text-info": type === "INFO",
        }
      )}
    >
      <Loader type={type} size="small" />
      <div className="ml-4">{message}</div>
    </div>
  );
};
