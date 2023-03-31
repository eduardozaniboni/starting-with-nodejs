import express from "express";
import { randomUUID } from "crypto";
import fs from "fs";

const app = express();

app.use(express.json());

type Product = {
  id: any;
  name: string;
  price: number;
};

let products: Product[] = [];

fs.readFile("products.json", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    products = JSON.parse(data);
  }
});

app.post("/products", (request, response) => {
  const { name, price } = request.body;
  const id = randomUUID();

  const product = {
    id,
    name,
    price,
  };

  products.push(product);

  productFile();

  return response.json(product);
});

app.get("/products", (request, response) => {
  return response.json(products);
});

app.get("/products/:id", (request, response) => {
  const { id } = request.params;
  const product = products.find((product) => product.id === id);
  console.log(product);
  return response.json(product);
});

app.put("/products/:id", (request, response) => {
  const { id } = request.params;
  const { name, price } = request.body;

  const productIndex = products.findIndex((products) => products.id === id);
  products[productIndex] = {
    ...products[productIndex],
    name,
    price,
  };

  productFile();

  return response.json({ message: "Product alteration sucessfully" });
});

app.delete("/products/:id", (request, response) => {
  const { id } = request.params;

  const productIndex = products.findIndex((products) => products.id === id);

  products.splice(productIndex, 1);

  productFile();

  return response.json({ message: "Product deletion sucessfully" });
});

app.listen(4002, () => {
  console.log("Server starting in 4002 port");
});

function productFile() {
  fs.writeFile("products.json", JSON.stringify(products), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Product inserted successfully");
    }
  });
}
