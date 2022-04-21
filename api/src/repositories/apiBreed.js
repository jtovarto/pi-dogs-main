const axios = require("axios");

const API_URL = `https://api.thedogapi.com/v1/breeds`;

const getAll = async (name = "") => {
  let formatted = [];
  try {
    let results = await axios.get(API_URL);
    results.data.map((breed) => {
      if (breed.name.toLowerCase().includes(name.toLowerCase())) {
        formatted.push({
          id: breed.id,
          name: breed.name,
          weight: breed.weight.metric.split("-").map((value) => +value),
          image: breed.image.url,
          temperaments: mapTempers(breed.temperament),
        });
      }
    });
    return formatted;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getById = async (id) => {
  let formatted = {};
  try {
    results = await axios.get(API_URL);
    found = results.data.find((breed) => +breed.id === +id);
    if (found === undefined) return {};

    formatted = {
      id: found.id,
      name: found.name,
      weight: found.weight.metric.split("-").map((value) => +value),
      height: found.height.metric,
      image: found.image.url,
      lifespan: found.life_span,
      temperaments: mapTempers(found.temperament),
    };

    return formatted;
  } catch (error) {
    throw new Error(error.message);
  }
};

function mapTempers(tempers) {
  if (tempers === undefined || tempers.length < 1) {
    return [];
  }
  return tempers?.split(",").map((temper) => temper.trim());
}

module.exports = {
  getAll,
  getById,
};
