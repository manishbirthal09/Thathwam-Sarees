import Category from "../models/Category.js";
import cloudinary from "../config/cloudinary.js";


const generateSlug = (name) =>
  name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");


export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: "Category name is required" });
    }

    const slug = generateSlug(name);
    const existing = await Category.findOne({ slug });
    if (existing) {
      return res.status(400).json({ success: false, message: "Category already exists" });
    }

    let image = {};
    if (req.file) {
  image = { url: req.file.path, public_id: req.file.filename };   // 👈 SIMPLIFIED
}

    const category = await Category.create({ name, slug, description, image });
    res.status(201).json({ success: true, category });
  } catch (error) {
    console.error("CREATE CATEGORY ERROR:", error); 
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: categories.length, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Get single category by slug
// @route GET /api/categories/:slug
export const getCategoryBySlug = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Update category (admin only)
// @route PUT /api/categories/:id
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    const { name, description, isActive } = req.body;

    if (name && name !== category.name) {
      category.name = name;
      category.slug = generateSlug(name);
    }
    if (description !== undefined) category.description = description;
    if (isActive !== undefined) category.isActive = isActive;

    if (req.file) {
      // delete old image from cloudinary if exists
      if (category.image?.public_id) {
        await cloudinary.uploader.destroy(category.image.public_id);
      }
      category.image = { url: req.file.path, public_id: req.file.filename };   // 👈 SIMPLIFIED
}
    //   const uploaded = await cloudinary.uploader.upload(
    //     `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
    //     { folder: "categories" }
    //   );
    //   category.image = { url: uploaded.secure_url, public_id: uploaded.public_id };
    // }

    await category.save();
    res.status(200).json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Delete category (admin only)
// @route DELETE /api/categories/:id
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    if (category.image?.public_id) {
      await cloudinary.uploader.destroy(category.image.public_id);
    }

    await category.deleteOne();
    res.status(200).json({ success: true, message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};