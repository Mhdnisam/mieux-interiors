import { connectDB } from "@/lib/db";
import Setting from "@/models/Setting";
import RegisterClient from "./RegisterClient";

export default async function RegisterPage() {
  let authBgImage = "/login_bg.png";
  try {
    await connectDB();
    const setting = await Setting.findOne().lean();
    if (setting && setting.authBgImage) {
      authBgImage = setting.authBgImage;
    }
  } catch (error) {
    console.error("Error fetching register bg image:", error);
  }

  return <RegisterClient authBgImage={authBgImage} />;
}
