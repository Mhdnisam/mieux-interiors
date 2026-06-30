"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/public/Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // Do not show footer on login or register pages
  if (pathname === "/login" || pathname === "/register") {
    return null;
  }
  
  return <Footer />;
}
