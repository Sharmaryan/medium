"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "./context/toast-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ToastProvider>{children}</ToastProvider>
    </SessionProvider>
  );
};
