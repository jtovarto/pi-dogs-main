const { Dog, conn } = require("../../src/db.js");
const { expect } = require("chai");

const dogData = {
  name: "breed name",
  height: "5 - 10",
  weight: "20 - 25",
  lifespan: "5 - 10",
  image: "https://fake-image.com"
};

describe("Dog model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  describe("Validators", () => {
    beforeEach(() => Dog.sync({ force: true }));

    describe("primaryKey", () => {
      it("should generate a valid id as primary key", async () => {
        const dog = await Dog.create(dogData);
        expect(dog.toJSON()).to.have.property("id", dog.id);
      });
    });

    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Dog.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });

      it("should work when its a valid name", async () => {
        const dog = await Dog.create(dogData);
        expect(dog.toJSON()).to.have.property("name", dog.name);
      });
    });

    describe("height", () => {
      it("should throw an error if height is null", (done) => {
        Dog.create({})
          .then(() => done(new Error("It requires a valid height")))
          .catch(() => done());
      });

      it("should work when its a valid height", async () => {
        const dog = await Dog.create(dogData);
        expect(dog.toJSON()).to.have.property("height", dogData.height);
      });
    });

    describe("weight", () => {
      it("should throw an error if weight is null", (done) => {
        Dog.create({})
          .then(() => done(new Error("It requires a valid weight")))
          .catch(() => done());
      });

      it("should work when its a valid weight", async () => {
        const dog = await Dog.create(dogData);
        expect(dog.toJSON()).to.have.property("weight", dogData.weight);
      });
    });

    describe("lifespan", () => {
      it("should set a new format for lifespan", async () => {
        const dog = await Dog.create(dogData);
        expect(dog.toJSON()).to.have.property("lifespan", "5 - 10 years");
      });
    });

    describe.only("image", () => {
      it("should have a image", async () => {
        const dog = await Dog.create(dogData);
        expect(dog.toJSON()).to.have.property("image", dogData.image);
      });
    });
  });
});
