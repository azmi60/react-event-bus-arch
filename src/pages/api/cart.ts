import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export type Product = {
  name: string;
  price: number;
};

export type CartResponse = {
  items: Product[];
};

function getCart() {
  const filePath = path.join(process.cwd(), "cart.json");
  const fileContent = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContent);
}

function addItemToCart(product: Product) {
  const cart = getCart();
  cart.items.push(product);
  const filePath = path.join(process.cwd(), "cart.json");
  fs.writeFileSync(filePath, JSON.stringify(cart));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return res.status(200).json(getCart());
  }

  if (req.method === "POST") {
    const product = req.body as Product;
    addItemToCart(product);
    return res.status(200).end();
  }

  res.status(405).end();
}
