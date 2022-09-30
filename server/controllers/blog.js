import { v4 as uuidv4 } from "uuid";
import path from "path";

import BlogModal from "../models/blog.js";
import { __dirname } from "../utils/index.js";

export const addBlog = async (req, res) => {
  try {
    const { title, shortDesc, longDesc } = req.body;

    const file = req.files?.avatar;

    let fileName;

    if (file) {
      fileName = uuidv4() + path.extname(file?.name);
      const savePath = path.join(__dirname, "public/blog", fileName);
      await file.mv(savePath);
    }

    const result = await BlogModal.create({
      title,
      shortDesc,
      longDesc,
      picture: file ? fileName : "",
      createdBy: req.email,
    });

    res.status(201).json({
      message: "New Blog created successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all blogs
export const blogs = async (req, res) => {
  try {
    const result = await BlogModal.find({});

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
