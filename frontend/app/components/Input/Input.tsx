import React from "react";
import { InputProps } from "./Input.types";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { label, name, error, placeholder = "", type = "text", onChange, ...rest },
    ref
  ) => {
    return (
      <div className="relative w-full">
        <div className="relative w-full">
          <input
            aria-label={`${name} input`}
            id={name}
            name={name}
            type={type}
            ref={ref}
            className={
              "peer w-full rounded-lg border border-solid bg-transparent p-3"
            }
            placeholder={placeholder}
            {...rest}
            onChange={onChange}
            autoComplete="true"
          />
          {label && (
            <label
              htmlFor={name}
              className="pointer-events-none absolute left-0 top-0 -mt-3 select-none p-3 text-xs
                opacity-60
                duration-200
                peer-placeholder-shown:-mt-0
                peer-placeholder-shown:text-base
                peer-placeholder-shown:opacity-100"
            >
              {label}
            </label>
          )}
        </div>

        <div className="mt-2 h-6 text-xs text-error">{error}</div>
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
