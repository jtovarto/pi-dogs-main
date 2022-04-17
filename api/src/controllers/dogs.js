const getters = require("../services/breeds");

const { Dog, Temperament } = require("../../src/db.js");

const getAll = async (req, res) => {
  const { source, name } = req.query;
  let response = [];
  try {
    if (source !== "api") {
      let dbBreeds = await getters.getBreedFromDB(name);
      response = [...dbBreeds];
    }

    if (source !== "db") {
      let apiBreeds = await getters.getBreedFromApi(name);
      response = [...response, ...apiBreeds];
    }

    if (response.length === 0) {
      return res.status(404).json({ message: "No results was found" });
    }
    res.json(response);
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
    if (/^\d+$/.test(idRaza)) {
      result = await getters.getBreedByIdFromApi(idRaza);
    } else {
      result = await getters.getBreedByIdFromDB(idRaza);
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
  const { name, weight, height, lifespan, temperaments, image } = req.body;
  if (!name || !height || !weight) {
    return res.status(400).json({ message: "All parameters are required" });
  }

  try {
    const dog = await Dog.create({
      name,
      weight: `${weight[0]} - ${weight[1]}`,
      height: `${height[0]} - ${height[1]}`,
      lifespan: `${lifespan[0]} - ${lifespan[1]}`,
      image,
    });

    const createdTemperaments = await Temperament.findAll({
      where: { id: temperaments },
    });
    
    await dog.setTemperaments(createdTemperaments);
    
    return res.status(201).json(dog);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getAll,
  getById,
  create,
};
