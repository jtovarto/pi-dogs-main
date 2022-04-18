/* eslint-disable import/no-extraneous-dependencies */

const chai = require("chai");
const expect = chai.expect;

const { Dog, Temperament, conn } = require("../../src/db.js");
const request = require("supertest");
const app = require("../../src/app.js");

const { faker } = require("@faker-js/faker");

describe("POST /dog", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(async () => {
    await conn.sync({ force: true });

    await Temperament.bulkCreate([
      { name: faker.lorem.word() },
      { name: faker.lorem.word() },
    ]);
  });

  it("should return status 400 and corresponding text if any of the mandatory parameters is not send", async () => {
    const res = await request(app).post("/dog");
    expect(res.statusCode).to.be.equal(400);
    expect(res.body).to.be.deep.equal({
      message: "Fields name-height-weight are required",
    });
  });

  it("should return status 201 and character object if the character was succesfully created", async () => {
    const dog = {
      name: faker.animal.dog(),
      height: [10, 15],
      weight: [20, 25],
      lifespan: [10, 15],
      image: faker.image.imageUrl(),
      temperaments: [],
    };
    const res = await request(app).post("/dog").send(dog);
    expect(res.statusCode).to.be.equal(201);
    expect(res.body).to.be.include({
      name: dog.name,
      height: "10 - 15",
      weight: "20 - 25",
      lifespan: "10 - 15 years",
      image: dog.image,
    });
  });

  it("should create the breed including the temperaments that have been sent", async () => {
    const name = faker.animal.dog();
    const res = await request(app)
      .post("/dog")
      .send({
        name,
        height: [10, 15],
        weight: [20, 25],
        lifespan: [10, 15],
        temperaments: [1, 2],
      });

    const dog = await Dog.findOne({
      where: { id: res.body.id },
      attributes: ["name"],
      include: {
        model: Temperament,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });

    expect(dog.name).to.be.equal(name);
    expect(dog.temperaments).to.have.lengthOf(2);
  });
});
