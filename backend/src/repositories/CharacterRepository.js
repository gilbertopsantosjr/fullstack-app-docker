const axios = require("axios");
const {
  fetchAllDataInParallel,
  fetchAllInParallel,
} = require("../infra/utils/axios.util");
const makeCharacter = require("../infra/utils/maker.character");

class CharacterRepository {
  async findById(id) {
    try {
      console.log(`searching people by: ${id}`);
      const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
      const films = await fetchAllInParallel(response.data.films);
      return makeCharacter(response.data, films);
    } catch (error) {
      const message = `Failed to fetch character data by id. ${id}`;
      console.error(`${message},${error}`);
      throw new Error(message);
    }
  }

  async findAllBy(query) {
    try {
      console.log(`searching people by: ${query}`);
      const result = [];
      const response = await fetchAllDataInParallel(
        `https://swapi.dev/api/people/`
      );

      response.map((p) => {
        const person = makeCharacter(p);
        result.push(person);
      });

      if (query) {
        return result
          .map((person) => {
            return person.name.toLowerCase().includes(query.toLowerCase())
              ? person
              : null;
          })
          .reduce((acc, person) => {
            if (person) acc.push(person);
            return acc;
          }, []);
      }

      return result;
    } catch (error) {
      const message = "Failed to fetch character data. ";
      console.error(`${message},${error}`);
      throw new Error(message);
    }
  }
}

module.exports = CharacterRepository;