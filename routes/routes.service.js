const express = require('express'),
  router = express.Router();

const db = require("../models");
const Service = db.service;

//SERVICES

// Ny Service
router.post("/", async (req, res) => {
  if (!req.body.service) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Gör en service
  const service = {
    service: req.body.service,
    description: req.body.description
  };

  // Spara service i db
  await Service.create(service)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "An error occurred while creating the service. Try Again later."
      });
    });
});

//sök alla services
router.get("/", async (req, res) => {
  await Service.findAll().then(data => {
    res.send(data);
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving services."
      });
    });
});

// Sök en service med id
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  await Service.findByPk(id)
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

// Uppdatera en service med id
router.put("/:id", async (req, res) => {
  const id = req.params.id;

  Service.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Service was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update service with id=${id}. Maybe service was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating service with id=" + id
      });
    });
});

// Radera en service med id
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  await Service.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Service was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete service with id=${id}. Maybe service was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete service with id=" + id
      });
    });
});

module.exports = router;