const express = require('express'),
    router = express.Router();

const db = require("../models");
const Order = db.order;

//ORDERS

// Ny Order
router.post("/", async (req, res) => {
    if (!req.body.date) {
        res.status(400).send({
          message: "Date can not be empty!"
        });
        return;
      }

      if (!req.body.cabin) {
        res.status(400).send({
          message: "Cabin can not be empty!"
        });
        return;
      }

      if (!req.body.service) {
        res.status(400).send({
          message: "Service can not be empty!"
        });
        return;
      }
    
      // Gör en Order
      const order = {
        date: req.body.date,
        cabin: req.body.cabin,
        service: req.body.service,
        done: req.body.done ? req.body.done : false
      };
    
      // Spara order i db
      await Order.create(order)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "An error occurred while creating the order. Try Again later."
          });
        });
});

//sök alla orders eller sök alla orders från db enligt datum
router.get("/",async (req, res) => {
  const date = req.query.date;
  const condition = date ? { date: date } : null;

    await Order.findAll({ where: condition }).then(data => {
     res.send(data);
   })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while retrieving orders."
     });
     });
    });

// Sök en order med id
router.get("/:id", async (req, res) => {
    const id = req.params.id;
  
   await Order.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find order with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving order with id=" + id
        });
      });
  });

  // Hitta alla orders som är ogjorda (done:false)
router.get("/done", async (req, res) => {
   await Order.findAll({ where: { done: false } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving orders."
      });
    });
});

// Uppdatera en order med id
router.put("/:id", async (req, res) => {
    const id = req.params.id;

    Order.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Order was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update order with id=${id}. Maybe order was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating order with id=" + id
        });
      });
});

// Radera en order med id
router.delete("/:id", async (req, res) => {
    const id = req.params.id;

  await Order.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Order was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete order with id=${id}. Maybe order was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete order with id=" + id
      });
    });
});

module.exports = router;
