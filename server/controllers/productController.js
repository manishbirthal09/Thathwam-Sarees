import Product  from "../models/Product.js";


export const getProducts = async (req, res) => {
  try {
    const { category, fabric, color, maxPrice, search, page = 1, limit = 12 } = req.query;
    const query = {};

    if (category) query.category = { $in: category.split(",") };
    if (fabric) query.fabric = { $in: fabric.split(",") };
    if (color) query.color = { $in: color.split(",") };
    if (maxPrice) query.price = { $lte: Number(maxPrice) };
    if (search) query.name = { $regex: search, $options: "i" };

    const products = await Product.find(query)
    .populate("category", "name slug")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(query);

    res.json({ products, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    .populate("category", "name slug");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const createProduct = async (req, res) => {
  try {
    const { name, price, discountPrice, category, fabric, color, description, stock } = req.body;
    const images = req.files ? req.files.map((file) => file.path) : [];

    const product = await Product.create({
      name,
      price,
      discountPrice,
      category,
      fabric,
      color,
      description,
      stock,
      images,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updates = req.body;
    if (req.files && req.files.length > 0) {
      updates.images = req.files.map((file) => file.path);
    }
    const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};