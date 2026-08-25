
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
import Admin from "../models/Admin.js";

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  const hashed = await bcrypt.hash(password, 10);

  const existing = await Admin.findOne({ email });

  if (existing) {
    existing.password = hashed;
    await existing.save();
    console.log("Existing admin password updated");
  } else {
    await Admin.create({ email, password: hashed });
    console.log("New admin created successfully");
  }

  await mongoose.disconnect();
};

run();
