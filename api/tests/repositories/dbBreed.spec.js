/* eslint-disable import/no-extraneous-dependencies */
const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const { faker } = require("@faker-js/faker");

const { Dog, Temperament, conn } = require("../../src/db.js");
const { getAll, getById, create } = require("../../src/repositories/dbBreed");

describe("Breed request from DB", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  beforeEach(async () => {
    await Dog.sync({ force: true });
    await Temperament.sync({ force: true });

    let dog01 = {
      name: 'Dog name 01',
      image: faker.image.imageUrl(),
      weight: "10 - 15",
      height: "10 - 15",
      lifespan: "10 - 15",
    }

    let dog02 = {
      name: 'Dog name 02',
      image: faker.image.imageUrl(),
      weight: "10 - 15",
      height: "10 - 15",
      lifespan: "10 - 15",
    }   

    createdDog1 = await Dog.create(dog01);
    createdDog2 = await Dog.create(dog02);

    temperament = { name: faker.lorem.word() };
    createdTem = await Temperament.create(temperament);

    await createdDog1.setTemperaments(createdTem);
  });

  describe("Get all breeds", () => {
    it("should receive an array of results", async () => {
      let res = await getAll();

      expect(res).to.be.an("array").that.have.lengthOf(2);
      
      expect(res[0]).to.deep.includes({
        id: createdDog1.id,
        name: createdDog1.name,
        image: createdDog1.image,
        weight: [10, 15],
      });

      expect(res[0].temperaments).to.be.an("array").to.have.lengthOf(1);
      expect(res[0].temperaments[0]).to.equal(temperament.name);
    });

    it("should return an empty array when there isn't a temperament", async () => {
      let res = await getAll();

      expect(res[1].temperaments).to.be.an("array").to.have.lengthOf(0);
    });

    it("can get all breeds filtered by name", async () => {
      let res = await getAll(createdDog2.name);

      expect(res).to.be.an("array").that.have.lengthOf(1);
      expect(res[0]).to.deep.includes({
        name: createdDog2.name,
        image: createdDog2.image,
        weight: [10, 15],
      });
    });

    it("should return message when no matches", async () => {
      let res = await getAll("not found");
      
      expect(res).to.be.an("array").that.have.lengthOf(0);
    });

    it("should handle exception throws", async () => {
      const stub = sinon
        .stub(Dog, "findAll")
        .throws(() => new Error("There was a problem"));
      stub.restore();
      try {
        await getAll();
      } catch (error) {
        expect(error.message).to.be.match(/There was a problem/);
      }
    });
  });

  describe("Get a breed by ID from DB", () => {
    it("should return a found breed", async () => {
      let res = await getById(createdDog1.id);

      expect(res).to.be.an("object");
      expect(res).to.deep.includes({
        id: createdDog1.id,
        name: createdDog1.name,
        image: createdDog1.image,
        weight: [10, 15],
        height: createdDog1.height,
        lifespan: createdDog1.lifespan,
      });
      expect(res.temperaments).to.be.an("array").to.have.lengthOf(1);
      expect(res.temperaments[0]).to.equal(temperament.name);
    });

    it("should return an empty array when there isn't a temperament", async () => {
      let res = await getById(createdDog2.id);

      expect(res.temperaments).to.be.an("array").to.have.lengthOf(0);
    });

    it("should return a empty object when breed is not found", async () => {
      let res = await getById("not found");

      expect(res).to.be.an("object").that.to.be.empty;
    });

    it("should handle exception throws", async () => {
      const stub = sinon
        .stub(Dog, "findOne")
        .throws(() => new Error("There was a problem"));
      stub.restore();
      try {
        await getById(1);
      } catch (error) {
        expect(error.message).to.be.match(/There was a problem/);
      }
    });
  });

  describe("Create a new breed", () => {
    let breed = {};

    beforeEach(async () => {
      await Dog.sync({ force: true });
      breed = {
        name: faker.lorem.word(),
        image: faker.image.imageUrl(),
        weight: [10, 15],
        height: [10, 15],
        lifespan: [10, 15],
        temperaments: [1],
      };
    });

    it("should create a new breed", async () => {
      breed.lifespan = null;
      const dog = await create(breed);

      expect(dog.id).to.not.be.empty;
      expect(await dog.getTemperaments())
        .to.be.an("array")
        .that.have.lengthOf(1);
    });

    describe("Validation", () => {
      describe("name field", () => {
        it("should be required", (done) => {
          breed.name = null;

          create(breed).catch((err) => {
            expect(err.message).to.be.match(/required/);
            done();
          });
        });

        it("should not be duplicated", (done) => {
          create(breed)
            .then(() => create(breed))
            .catch((err) => {
              expect(err.message).to.be.match(/name must be unique/);
              done();
            });
        });
      });

      describe("weight field", () => {
        it("should be required", (done) => {
          breed.weight = null;

          create(breed).catch((err) => {
            expect(err.message).to.be.match(/required/);
            done();
          });
        });

        it("should be numeric", (done) => {
          breed.weight = [10, "a"];

          create(breed).catch((err) => {
            expect(err.message).to.be.match(/must be numeric/);
            done();
          });
        });

        it("should have min and max values", (done) => {
          breed.weight = [10];

          create(breed).catch((err) => {
            expect(err.message).to.be.match(
              /must provide a minimum and maximum/
            );
            done();
          });
        });
      });

      describe("height field", () => {
        it("should be required", (done) => {
          breed.height = null;

          create(breed).catch((err) => {
            expect(err.message).to.be.match(/required/);
            done();
          });
        });

        it("should be numeric", (done) => {
          breed.height = [10, "a"];

          create(breed).catch((err) => {
            expect(err.message).to.be.match(/must be numeric/);
            done();
          });
        });

        it("should have min and max values", (done) => {
          breed.height = [10];

          create(breed).catch((err) => {
            expect(err.message).to.be.match(
              /must provide a minimum and maximum/
            );
            done();
          });
        });
      });

      describe("lifespan field", () => {
        it("should be numeric", (done) => {
          breed.lifespan = [10, "a"];

          create(breed).catch((err) => {
            expect(err.message).to.be.match(/must be numeric/);
            done();
          });
        });

        it("should have min and max values", (done) => {
          breed.lifespan = [10];

          create(breed).catch((err) => {
            expect(err.message).to.be.match(
              /must provide a minimum and maximum/
            );
            done();
          });
        });
      });

      it("image can be nullable", (done) => {
        breed.image = null;
        create(breed).then((dog) => {
          expect(dog.id).to.not.be.empty;
          done();
        });
      });

      it("lifespan can be nullable", (done) => {
        breed.lifespan = null;
        create(breed).then((dog) => {
          expect(dog.lifespan).to.be.equal("0 - 0 years");
          done();
        });
      });

      it("temperaments can be nullable", (done) => {
        breed.temperaments = null;
        create(breed).then((dog) => {
          expect(dog.id).to.not.be.empty;
          done();
        });
      });
    });
  });
});
