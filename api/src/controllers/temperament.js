const temperService = require("../services/temperament");
const { Temperament } = require("../../src/db.js");

const getAll = async (req, res) => {
  try {
    let temperaments = await Temperament.findAll();
    if (temperaments.length < 1) {
      await temperService.getFromApi();
    }
    temperaments = await Temperament.findAll();
    return res.json(temperaments);
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      error: "Was an error loading the temperaments",
    });
  }
};

module.exports = { getAll };
