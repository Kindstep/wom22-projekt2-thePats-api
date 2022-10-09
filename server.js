const express = require("express");
const app = express();

require('dotenv').config();

// parse requests of content-type - application/json
app.use(express.json());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Underhållningstjänst för the Stugor." });
});

require("./models")
require("./routes/routes.order.js");


const serviceRouter = require("./routes/routes.service.js");
app.use('/services', serviceRouter);

// set port, listen for requests
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


