import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import { v4 as uuidv4 } from "uuid";

import UserModal from "../models/user.js";
import { __dirname } from "../utils/index.js";

/* -------------------------------------------------------------------------- */
/*                                 user signup                                */
/* -------------------------------------------------------------------------- */

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  const file = req.files?.avatar;

  try {
    const oldUser = await UserModal.findOne({ email });
    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    let fileName;

    if (file) {
      fileName = uuidv4() + path.extname(file?.name);
      const savePath = path.join(__dirname, "public/user", fileName);
      await file.mv(savePath);
    }

    const result = await UserModal.create({
      email,
      password: hashedPassword,
      name,
      avatar: file ? fileName : "",
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    res.status(201).json({
      message: "New User created successfully",
      result,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* -------------------------------------------------------------------------- */
/*                                 user signIn                                */
/* -------------------------------------------------------------------------- */

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
