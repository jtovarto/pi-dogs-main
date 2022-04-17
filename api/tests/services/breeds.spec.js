/* eslint-disable import/no-extraneous-dependencies */
const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const { faker } = require("@faker-js/faker");

const axios = require("axios");

const { Dog, Temperament, conn } = require("../../src/db.js");
const {
  getBreedFromDB,
  getBreedFromApi,
  getBreedByIdFromApi,
  getBreedIdFromDB,
} = require("../../src/services/breeds");

describe.only("Breed Request Services", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  beforeEach(async () => {
    await Dog.sync({ force: true });
    await Temperament.sync({ force: true });

    let dogs = Array(2).fill({});
    dogs = dogs.map((item) => ({
      name: faker.lorem.word(),
      image: faker.image.imageUrl(),
      weight: "10 - 15",
      height: "10 - 15",
      lifespan: "10 - 15",
    }));

    createdDog1 = await Dog.create(dogs[0]);
    createdDog2 = await Dog.create(dogs[1]);

    let temperament = { name: faker.lorem.word() };
    createdTem = await Temperament.create(temperament);

    await createdDog1.setTemperaments(createdTem);
  });

  beforeEach(() => {
    cont = 1;
    apiBreeds = Array(3).fill({})
    apiBreeds = apiBreeds.map(item=>({
      id: cont++,
      weight: {
        metric: `${faker.datatype.number(1, 5)} - ${faker.datatype.number(6,10)}`,
      },
      height: {
        metric: `${faker.datatype.number(15, 20)} - ${faker.datatype.number(25,30)}`,
      },
      name: faker.animal.dog(),
      temperament: "Stubborn, Curious, Playful",
      image: {
        url: faker.image.imageUrl(),
      },
    }))
    
    response = apiBreeds;
    const resolved = Promise.resolve({ data: apiBreeds });
    axiosStub = sinon.stub(axios, "get").resolves(resolved);
  });

  describe("Get all breeds from DB", () => {
    it("should receive an array of results", async () => {
      res = await getBreedFromDB();

      expect(res).to.be.an("array").that.have.lengthOf(2);
      expect(res[0]).to.include({
        id: createdDog1.id,
        name: createdDog1.name,
        image: createdDog1.image,
        weight: createdDog1.weight,
      });
    });

    it("can get all breeds filtered by name", async () => {
      res = await getBreedFromDB(createdDog2.name);

      expect(res).to.be.an("array").that.have.lengthOf(1);
      expect(res[0]).to.include({
        name: createdDog2.name,
        image: createdDog2.image,
        weight: createdDog2.weight,
      });
    });

    it("should return message when no matches", async () => {
      res = await getBreedFromDB("not found");

      expect(res).to.be.an("array").that.have.lengthOf(0);
    });
  });

  describe("Get all breeds from API", () => {
    it("should receive an array of results", async () => {
      res = await getBreedFromApi();
      expect(axiosStub.calledOnce).to.be.true;

      axiosStub.restore();
      expect(res).to.be.an("array").that.have.lengthOf(3);
      expect(res[0]).to.include({
        name: apiBreeds[0].id,
        name: apiBreeds[0].name,
        image: apiBreeds[0].image.url,
        weight: apiBreeds[0].weight.metric,
      });
      expect(res[0].temperaments).to.be.an("array").to.have.lengthOf(3);
      expect(res[0].temperaments[0]).to.haveOwnProperty("name");
    });

    it("can get all breeds filtered by name", async () => {
      res = await getBreedFromApi(apiBreeds[2].name);

      axiosStub.restore();
      expect(res).to.be.an("array").that.have.lengthOf(1);
      expect(res[0].id).to.be.equal(apiBreeds[2].id);
    });

    it("should return message when no matches", async () => {
      res = await getBreedFromApi("not found");

      axiosStub.restore();
      expect(res).to.be.an("array").that.have.lengthOf(0);
    });    
  });

  describe("Get a breed by ID from DB", () => {
    it("should return a found breed", async () => {
      res = await getBreedIdFromDB(createdDog2.id);
      console.log(res.id);
      expect(res).to.be.an("object");
      expect(res).to.include({
        id: createdDog2.id,
        name: createdDog2.name,
        image: createdDog2.image,
        weight: createdDog2.weight,
        height: createdDog2.height,
        lifespan: createdDog2.lifespan,
      });

      expect(res.temperaments).to.be.an("array").to.have.lengthOf(0);
    });

    it("should return a empty object when breed is not found", async () => {
      res = await getBreedFromDB("not found");

      expect(res).to.be.an("array").that.have.lengthOf(0);
    });
  });

  describe("Get a breed by ID from Api", () => {   

    it("should return a found breed", async () => {
      res = await getBreedByIdFromApi(response[2].id);
      expect(axiosStub.calledOnce).to.be.true;

      expect(res).to.be.an("object");
      expect(res).to.include({
        id: response[2].id,
        name: response[2].name,
        image: response[2].image.url,
        weight: response[2].weight.metric,
        height: response[2].height.metric,
        lifespan: response[2].life_span,
      });
      expect(res.temperaments).to.be.an("array").to.have.lengthOf(3);
      expect(res.temperaments[0]).to.haveOwnProperty("name");
    });

    it("should return a empty object when breed is not found", async () => {
      res = await getBreedByIdFromApi(10);

      expect(res).to.be.an("object").that.to.be.empty;
    });    
  });

  afterEach(() => {
    axiosStub.restore();
  });

  after(() => conn.close());
});
