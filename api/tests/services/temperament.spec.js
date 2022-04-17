const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const axios = require("axios");

const { Dog, Temperament, conn } = require("../../src/db.js");

const { getFromApi } = require("../../src/services/temperament");

describe("Temperament Request Services", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  beforeEach(async () => {
    axiosStub = sinon.stub(axios, "get");
    await Temperament.sync({ force: true });
  });

  it("should get all temperament from api and store in the database", async () => {
    const response = Promise.resolve({
      data: [
        { id: 1, temperament: "Stubborn, Curious" },
        { id: 4, temperament: "Adventurous" },
      ],
    });
    axiosStub.resolves(response);
    await getFromApi();
    const temperaments = await Temperament.findAll();
    expect(temperaments).to.have.lengthOf(3);
  });

  it("should store temperaments without duplicate data", async () => {
    const response = Promise.resolve({
      data: [
        { id: 1, temperament: "Stubborn, Curious, Playful" },
        { id: 4, temperament: "Adventurous, Stubborn" },
      ],
    });
    axiosStub.resolves(response);
    await getFromApi();
    const temperaments = await Temperament.findAll();
    expect(temperaments).to.have.lengthOf(4);
  });

  it("should ignore missing or empty values", async () => {
    const response = Promise.resolve({
      data: [
        { id: 1, temperament: "Stubborn, Playful" },
        { id: 2, temperament: "" },
        { id: 3 },
        { id: 4, temperament: "Adventurous" },
      ],
    });
    axiosStub.resolves(response);
    await getFromApi();
    const temperaments = await Temperament.findAll();
    expect(temperaments).to.have.lengthOf(3);
  });

  afterEach(() => {
    axiosStub.restore();
  });
});
