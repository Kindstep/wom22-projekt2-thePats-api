const express = require("express");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

// parse requests of content-type - application/json
app.use(express.json());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Underhållningstjänst för the Stugor." });
});

require("./routes/routes.order.js");
require("./routes/routes.service.js");

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


