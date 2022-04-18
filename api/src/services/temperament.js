const { Temperament } = require("../../src/db.js");
const axios = require("axios");

const getFromApi = async () => {
  try {
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds`);
    const temp = response.data.map((breed) => {
      if (breed?.temperament?.length > 0) {
        return breed.temperament.split(", ");
      }
      return [];
    });

    let temperaments = [...new Set(temp.flat())];
    temperaments = temperaments.map((temp) => ({ name: temp }));
    await Temperament.bulkCreate(temperaments);
  } catch (err) {
    console.error("There was an error loading the temperaments from API:", err);
  }
};
module.exports = {
  getFromApi,
};
