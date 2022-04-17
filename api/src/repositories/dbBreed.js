const { Dog, Temperament } = require("../db.js");
const { Op } = require("sequelize");

const getAll = async (name = "") => {
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
    throw new Error(error.message);
  }
};

const getById = async (id) => {
  try {
    let results = await Dog.findOne({
      where: { id: id.toString() },
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
    throw new Error(error.message);
  }
};

module.exports = {
  getAll,
  getById,
};
