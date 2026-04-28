const express = require("express");
const router = express.Router();

let orders = [];

// CREATE ORDER
router.post("/", (req, res) => {
  const { medicine } = req.body;

  const newOrder = {
    id: Date.now(),
    medicine,
    status: "Pending"
  };

  orders.push(newOrder);

  console.log("New Order:", newOrder);

  res.json({ message: "Order placed", order: newOrder });
});

// GET ORDERS
router.get("/", (req, res) => {
  res.json(orders);
});

// DELETE ORDER
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  orders = orders.filter(o => o.id !== id);

  res.json({ message: "Order deleted" });
});

module.exports = router;