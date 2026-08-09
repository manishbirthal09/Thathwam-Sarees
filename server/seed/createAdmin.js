
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
import Admin from "../models/Admin.js";

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const email = "admin@niarabyneenu.com";
  const password = "NiaraAdminPassword2026"; 

  const hashed = await bcrypt.hash(password, 10);

  const admin = await Admin.findOneAndUpdate(
    { email },
    { password: hashed },
    { new: true }
  );

  if (!admin) {
    console.log("Admin not found");
  } else {
    console.log("Password updated successfully");
  }

  await mongoose.disconnect();
};

run();

