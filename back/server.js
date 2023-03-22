const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
];

app.get("/api/items", (req, res) => {
  res.json(items);
});

app.post("/api/items", (req, res) => {
  const newItem = { id: Date.now(), name: req.body.name };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put("/api/items/:id", (req, res) => {
    const itemId = parseInt(req.params.id);
    const itemIndex = items.findIndex((item) => item.id === itemId);
  
    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found" });
    }
  
    items[itemIndex].name = req.body.name;
    res.json(items[itemIndex]);
  });
  
  app.delete("/api/items/:id", (req, res) => {
    const itemId = parseInt(req.params.id);
    const itemIndex = items.findIndex((item) => item.id === itemId);
  
    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found" });
    }
  
    items.splice(itemIndex, 1);
    res.status(204).end();
  });
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
