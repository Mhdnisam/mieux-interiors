import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI;

const serviceSchema = new mongoose.Schema({
  title: String,
  description: String,
}, { strict: false });
const Service = mongoose.models.Service || mongoose.model("Service", serviceSchema);

async function run() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not defined");
    process.exit(1);
  }
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB.");

  const services = await Service.find();
  for (const service of services) {
    let updated = false;
    if (service.title && service.title.includes("Residential Residences")) {
      service.title = service.title.replace(/Residential Residences/g, "Residential Homes");
      updated = true;
    }
    if (updated) {
      await service.save();
      console.log(`Updated service: ${service.title}`);
    }
  }

  console.log("Done.");
  process.exit(0);
}

run();
