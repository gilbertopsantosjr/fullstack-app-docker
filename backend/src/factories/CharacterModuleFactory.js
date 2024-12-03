const CharacterRepository = require("../repositories/CharacterRepository");
const GetCharacterByIdUseCase = require("../usecases/GetCharacterByIdUseCase");
const CharacterController = require("../controllers/CharacterController");

class CharacterModuleFactory {
  static create(app, queryMetricsService) {
    const chrctrRepository = new CharacterRepository();
    const getCharacterUseCase = new GetCharacterByIdUseCase(chrctrRepository);
    const characterController = new CharacterController(
      getCharacterUseCase,
      queryMetricsService
    );

    app.get("/character/:id", async (req, res) => {
      try {
        characterController.getCharacter(req, res);
      } catch (error) {
        console.error(error);
        res.status(500).send(`Error fetching data: ${error}`);
      }
    });
  }
}

module.exports = CharacterModuleFactory;
