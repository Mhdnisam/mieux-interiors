import mongoose, { Schema, models, model } from "mongoose";

const SettingSchema = new Schema(
  {
    heroBgImage: { type: String, required: true },
    heroSubtitle: { type: String, default: "Architectural Designer • Kallachi" },
    heroHeading: { type: String, default: "Quality. Creativity. Perfection." },
    heroDescription: { type: String, default: "Trusted design studio crafting premium residential and commercial spaces with material honesty and aesthetic balance." },
    authBgImage: { type: String, default: "/login_bg.png" },
    philosophyBgImage: { type: String, default: "" },
    philosophyHeading: { type: String, default: "Bespoke Spaces Designed For Inspired Living" },
    philosophyDescription: { type: String, default: "At Mieux Interiors & Architects, we believe that design should be a direct reflection of its context, material, and user. We balance raw organic textures with premium materials like oak wood and custom bronze to create environments that are both functional and inspiring.\n\nWhether designing a private residence or a commercial workspace in Kallachi, our dedicated team handles every step from conceptualization to execution with absolute precision." },
  },
  { timestamps: true }
);

export default models.Setting || model("Setting", SettingSchema);
