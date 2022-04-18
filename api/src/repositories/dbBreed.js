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

const create = async (value) => {
  let { name, weight, height, lifespan, image, temperaments } = value;

  if (!name || !height || !weight) {
    throw new Error("Fields name-height-weight are required");
  }
  try {
    const dog = await Dog.create({
      name,
      weight: matrixFormat(weight),
      height: matrixFormat(height),
      lifespan: matrixFormat(lifespan ?? [0, 0]),
      image,
    });

    const createdTemperaments = await Temperament.findAll({
      where: { id: temperaments },
    });

    await dog.setTemperaments(createdTemperaments);

    return dog;
  } catch (error) {
    if (error.message === "Validation error") {
      throw new Error(error.errors[0].message);
    }
    throw new Error(error.message);
  }
};

function matrixFormat(array) {
  if (array.length < 2) {
    throw new Error("You must provide a minimum and maximum value");
  }
  if (isNaN(array[0]) || isNaN(array[1])) {
    throw new Error("Fields weight-height-lifespan must be numeric");
  }
  if (array[0] > array[1]) {
    [array[1], array[0]] = [array[0], array[1]];
  }
  return `${array[0]} - ${array[1]}`;
}
module.exports = {
  getAll,
  getById,
  create,
};
