import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  const token = jwt.sign({ userId: newUser.id }, "your_jwt_secret", {
    expiresIn: "1h",
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: newUser.id,
      email: newUser.email,
    },
    token,
  });
});

app.get("/items", async (req, res) => {
  const items = await prisma.inventoryItem.findMany();
  res.json(items);
});

app.post("/items", async (req, res) => {
  const { name, quantity } = req.body;
  const newItem = await prisma.inventoryItem.create({
    data: {
      name,
      quantity,
    },    
  });
  res.json(newItem);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
