"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/public/Navbar";
import ConditionalFooter from "@/components/public/ConditionalFooter";
import { Spin } from "antd";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "var(--bg-warm)"
      }}>
        <div style={{ textAlign: "center" }}>
          <Spin size="large" />
          <p style={{ marginTop: "16px", color: "var(--text-secondary)", fontSize: "14px", fontFamily: "var(--font-outfit), sans-serif" }}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      <ConditionalFooter />
    </div>
  );
}
