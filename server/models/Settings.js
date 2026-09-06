
import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  deliveryCharge: { type: Number, default: 99 },
  bogoEnabled: { type: Boolean, default: true },
});

export default mongoose.model("Settings", settingsSchema);