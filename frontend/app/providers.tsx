"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "./context/toast-provider";
import StoreProvider from "./context/store-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <SessionProvider>
        <ToastProvider>{children}</ToastProvider>
      </SessionProvider>
    </StoreProvider>
  );
};
