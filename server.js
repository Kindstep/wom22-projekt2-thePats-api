const express = require("express");
const app = express();

require('dotenv').config();

// parse requests of content-type - application/json
app.use(express.json());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Underhållningstjänst för the Stugor." });
});

const orderRouter = require("./routes/routes.order");
app.use('/orders', orderRouter)

const serviceRouter = require("./routes/routes.service");
app.use('/services', serviceRouter);

// set port, listen for requests
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


