const FilmRepository = require("../repositories/FilmRepository");
const GetFilmByIdUseCase = require("../usecases/GetFilmByIdUseCase");
const FilmController = require("../controllers/FilmController");

class FilmModuleFactory {
  static create(app, queryMetricsService) {
    const chrctrRepository = new FilmRepository();
    const getFilmUseCase = new GetFilmByIdUseCase(chrctrRepository);
    const filmController = new FilmController(
      getFilmUseCase,
      queryMetricsService
    );

    app.get("/films/:id", async (req, res) => {
      try {
        filmController.getFilm(req, res);
      } catch (error) {
        console.error(error);
        res.status(500).send(`Error fetching data: ${error}`);
      }
    });
  }
}

module.exports = FilmModuleFactory;
