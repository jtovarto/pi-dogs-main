/* eslint-disable import/no-extraneous-dependencies */
const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const { faker } = require("@faker-js/faker");

const { Dog, Temperament, conn } = require("../../src/db.js");
const { getAll, getById } = require("../../src/repositories/dbBreed");

describe("Breed request from DB", () => {
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

  describe("Get all breeds", () => {
    it("should receive an array of results", async () => {
      let res = await getAll();

      expect(res).to.be.an("array").that.have.lengthOf(2);
      expect(res[0]).to.include({
        id: createdDog1.id,
        name: createdDog1.name,
        image: createdDog1.image,
        weight: createdDog1.weight,
      });
    });

    it("can get all breeds filtered by name", async () => {
      let res = await getAll(createdDog2.name);

      expect(res).to.be.an("array").that.have.lengthOf(1);
      expect(res[0]).to.include({
        name: createdDog2.name,
        image: createdDog2.image,
        weight: createdDog2.weight,
      });
    });

    it("should return message when no matches", async () => {
      let res = await getAll("not found");

      expect(res).to.be.an("array").that.have.lengthOf(0);
    });

    it("should handle exception throws", async () => {
      const stub = sinon.stub(Dog, "findAll").throws(() => new Error("There was a problem"));
      stub.restore()
      try {
        await getAll();
      } catch (error) {
        expect(error.message).to.be.match(/There was a problem/);
      }
    });
  });

  describe("Get a breed by ID from DB", () => {
    it("should return a found breed", async () => {
      let res = await getById(createdDog2.id);

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
      let res = await getById("not found");

      expect(res).to.be.an("object").that.to.be.empty;
    });

    it("should handle exception throws", async () => {
        const stub = sinon.stub(Dog, "findOne").throws(() => new Error("There was a problem"));
        stub.restore()
        try {
          await getById(1);
        } catch (error) {
          expect(error.message).to.be.match(/There was a problem/);
        }
      });
  });

});
