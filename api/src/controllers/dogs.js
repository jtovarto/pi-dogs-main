const dbRepository = require("../repositories/dbBreed");
const apiRepository = require("../repositories/apiBreed");

const { Dog, Temperament } = require("../../src/db.js");

const getAll = async (req, res) => {
  const { name } = req.query;

  try {
    let dbBreeds = await dbRepository.getAll(name);
    let apiBreeds = await apiRepository.getAll(name);
    res.json([...dbBreeds, ...apiBreeds]);
  } catch (error) {
    res.json({
      success: false,
      error: "Something was worng",
    });
  }
};

const getById = async (req, res) => {
  const { idRaza } = req.params;

  try {
    if (isNaN(idRaza)) {
      result = await dbRepository.getById(idRaza);
    } else {
      result = await apiRepository.getById(idRaza);
    }

    if (!result.hasOwnProperty("id")) {
      res
        .status(404)
        .json({ message: `Breed with id -${idRaza}- is not found` });
    }
    res.json(result);
  } catch (error) {
    res.json({
      success: false,
      error: "Something was worng",
    });
  }
};

const create = async (req, res) => {
  try {
    const dog = await dbRepository.create(req.body);

    return res.status(201).json(dog);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
};
