// Task6_ProductAPI.js
// Run: node Task6_ProductAPI.js
// Then visit: http://localhost:3000/products  or  http://localhost:3000/products/2

const express = require('express');
const app = express();
const PORT = 3000;

const products = [
  { id: 1, name: "Laptop", price: 900 },
  { id: 2, name: "Mouse", price: 20 },
  { id: 3, name: "Keyboard", price: 50 },
];

// Route 1: GET /products — returns all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Route 2: GET /products/:id — returns specific product by id
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Try: http://localhost:${PORT}/products`);
  console.log(`Try: http://localhost:${PORT}/products/2`);
  console.log(`Try: http://localhost:${PORT}/products/99  (not found)`);
});
