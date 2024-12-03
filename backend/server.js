const express = require("express");
var cors = require("cors");

const QueryMetricsService = require("./src/service/QueryMetricsService");
const characterModuleFactory = require("./src/factories/CharacterModuleFactory");
const searchTypeModuleFactory = require("./src/factories/SearchTypeModuleFactory");
const filmModuleFactory = require("./src/factories/FilmModuleFactory");

const app = express();
app.use(cors());
const port = 5000;

// Initialize service
const queryMetricsService = new QueryMetricsService();
queryMetricsService.schedulePeriodicComputation();

// Routes
characterModuleFactory.create(app, queryMetricsService);
searchTypeModuleFactory.create(app, queryMetricsService);
filmModuleFactory.create(app, queryMetricsService);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
