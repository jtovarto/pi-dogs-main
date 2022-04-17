const getters = require("../services/breeds");

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

module.exports = {
  getAll,
};
