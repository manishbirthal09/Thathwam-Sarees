
import Settings from "../models/Settings.js";

export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const { deliveryCharge, bogoEnabled } = req.body;
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({ deliveryCharge, bogoEnabled });
    } else {
      if (deliveryCharge !== undefined) settings.deliveryCharge = deliveryCharge;
      if (bogoEnabled !== undefined) settings.bogoEnabled = bogoEnabled;
      await settings.save();
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};