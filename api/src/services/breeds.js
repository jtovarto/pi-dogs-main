const { Dog, Temperament } = require("../../src/db.js");
const axios = require("axios");
const { Op } = require("sequelize");

const errorMsg =
  "An unexpected error has occurred, the records could not be retrieved";

const getBreedFromDB = async (name = "") => {
  try {
    let results = await Dog.findAll({
      where: { name: { [Op.like]: `%${name}%` } },
      attributes: ["id", "name", "weight", "image"],
      include: {
        model: Temperament,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    return results;
  } catch (error) {
    throw new Error(errorMsg);
  }
};

const getBreedFromApi = async (name = "") => {
  let formatted = [];
  try {
    results = await axios.get(`https://api.thedogapi.com/v1/breeds`);
    results.data.map((breed) => {
      if (breed.name.toLowerCase().includes(name.toLowerCase())) {
        formatted.push({
          id: breed.id,
          name: breed.name,
          weight: breed.weight.metric,
          image: breed.image.url,
          temperaments: breed.temperament
            ?.split(",")
            .map((temperament) => ({ name: temperament })),
        });
      }
    });
    return formatted;
  } catch (error) {
    throw new Error(errorMsg);
  }
};

const getBreedIdFromDB = async (id) => {
  try {
    let results = await Dog.findOne({
      where: { id: id },
      attributes: ["id", "name", "weight", "image", "height", "lifespan"],
      include: {
        model: Temperament,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });

    if (results === null) return {};
    return results;
  } catch (error) {
    throw new Error(errorMsg);
  }
};

const getBreedByIdFromApi = async (id) => {
  let formatted = {};
  try {
    results = await axios.get(`https://api.thedogapi.com/v1/breeds`);

    found = results.data.find((breed) => +breed.id === +id);
    if (found === undefined) return {};
    formatted = {
      id: found.id,
      name: found.name,
      weight: found.weight.metric,
      height: found.height.metric,
      image: found.image.url,
      lifespan: found.life_span,
      temperaments: found.temperament
        ?.split(",")
        .map((temperament) => ({ name: temperament })),
    };
    return formatted;
  } catch (error) {
    throw new Error(errorMsg);
  }
};

module.exports = {
  getBreedFromDB,
  getBreedFromApi,
  getBreedByIdFromApi,
  getBreedIdFromDB,
};
