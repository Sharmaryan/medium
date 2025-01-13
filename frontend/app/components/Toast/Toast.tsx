"use client";
import classNames from "classnames";
import { Status, ToastTypes } from "./Toast.types";
import { Loader } from "../Loader/Loader";
import { useEffect } from "react";
import { Size } from "../Loader/Loader.types";

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
          "text-error": type === Status.Error,
          "text-success": type === Status.Success,
          "text-info": type === Status.Info,
        }
      )}
    >
      <Loader type={type} size={Size.Small} />
      <div className="ml-4">{message}</div>
    </div>
  );
};
