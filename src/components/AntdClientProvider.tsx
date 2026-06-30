"use client";

import "@ant-design/v5-patch-for-react-19";
import React, { useEffect } from "react";

export default function AntdClientProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Suppress benign React 18/19 Strict Mode warning with Ant Design CSS-in-JS
    const originalError = console.error;
    console.error = (...args) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes("You are registering a cleanup function after unmount")
      ) {
        return;
      }
      originalError(...args);
    };
    return () => {
      console.error = originalError;
    };
  }, []);

  return <>{children}</>;
}
