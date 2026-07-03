import { Suspense } from "react";
import { connectDB } from "@/lib/db";
import Setting from "@/models/Setting";
import LoginClient from "./LoginClient";

export default async function LoginPage() {
  let authBgImage = "/login_bg.png";
  try {
    await connectDB();
    const setting = await Setting.findOne().lean();
    if (setting && setting.authBgImage) {
      authBgImage = setting.authBgImage;
    }
  } catch (error) {
    console.error("Error fetching login bg image:", error);
  }

  return (
    <Suspense fallback={<div style={{ textAlign: "center", padding: "20px 0" }}>Loading...</div>}>
      <LoginClient authBgImage={authBgImage} />
    </Suspense>
  );
}
