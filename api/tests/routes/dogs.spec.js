/* eslint-disable import/no-extraneous-dependencies */

const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const request = require("supertest");
const app = require("../../src/app.js");

const dbRepository = require("../../src/repositories/dbBreed");
const apiRepository = require("../../src/repositories/apiBreed");

const { nanoid } = require("nanoid");
const { faker } = require("@faker-js/faker");

describe("Dogs routes", () => {
  describe("GET /dogs", () => {
    beforeEach(() => {
      dbDog = {
        id: nanoid(),
        name: faker.animal.dog(),
        image: faker.image.imageUrl(),
        weight: "10-15",
        temperaments: {},
      };

      apiDog = {
        id: 1,
        name: faker.animal.dog(),
        image: faker.image.imageUrl(),
        weight: "10-15",
        temperaments: {},
      };

      dbStub = sinon.stub(dbRepository, "getAll").returns([dbDog]);
      apiStub = sinon.stub(apiRepository, "getAll").returns([apiDog]);
    });

    describe("GET /dogs?source=", () => {
      it("should return a list of breeds", async () => {
        const res = await request(app).get("/dogs");

        expect(res.statusCode).to.be.equal(200);
        expect(dbStub.calledOnce).to.be.true;
        expect(apiStub.calledOnce).to.be.true;
        expect(res.body).to.be.an("array").that.have.lengthOf(2);
      });

      it("should return only those from the database when prompted", async () => {
        const res = await request(app).get("/dogs").query({ source: "db" });

        expect(dbStub.calledOnce).to.be.true;
        expect(apiStub.calledOnce).to.be.false;
        expect(res.body).to.have.lengthOf(1);
        expect(res.body[0].name).to.be.equal(dbDog.name);
      });

      it("should return only those from the api when prompted", async () => {
        const res = await request(app).get("/dogs").query({ source: "api" });

        expect(dbStub.calledOnce).to.be.false;
        expect(apiStub.calledOnce).to.be.true;
        expect(res.body).to.have.lengthOf(1);
        expect(res.body[0].name).to.be.equal(apiDog.name);
      });

      it("should return only necessary attributes", async () => {
        const res = await request(app).get("/dogs");

        expect(res.body[0]).to.have.all.keys(
          "id",
          "name",
          "image",
          "temperaments",
          "weight"
        );
      });
    });

    describe("GET /dogs?name=", () => {
      beforeEach(() => {
        dbStub.returns([]);
        apiStub.returns([]);
      });

      it("should send results filtered by name", async () => {
        await request(app).get("/dogs").query({ name: "name" });

        expect(dbStub.calledWith("name")).to.be.true;
        expect(apiStub.calledWith("name")).to.be.true;
      });

      it("should send filtered results by name only from the db", async () => {
        await request(app).get("/dogs").query({ name: "name", source: "db" });

        expect(dbStub.calledWith("name")).to.be.true;
        expect(apiStub.calledOnce).to.be.false;
      });

      it("should send filtered results by name only from the db", async () => {
        await request(app).get("/dogs").query({ name: "name", source: "api" });

        expect(dbStub.calledOnce).to.be.false;
        expect(apiStub.calledWith("name")).to.be.true;
      });

      it("should return a empty array when breed name is not found", async () => {
        const res = await request(app)
          .get("/dogs")
          .query({ name: "not found" });

        expect(res.body).to.be.an("array").that.lengthOf(0);
      });
    });

    describe("error handling", () => {
      beforeEach(() => {
        if (faker.datatype.boolean) {
          dbStub.throws([]);
        } else {
          apiStub.throws([]);
        }
      });

      it("should display a message when an exception is fired", async () => {
        const res = await request(app).get("/dogs").query({ name: "name" });
        expect(res.body).to.include({
          success: false,
          error: "Something was worng",
        });
      });
    });

    afterEach(() => {
      dbStub.restore();
      apiStub.restore();
    });
  });

  describe("GET /dogs/:idRaza", () => {
    beforeEach(() => {
      let dog = {
        image: faker.image.imageUrl(),
        weight: "10 - 15",
        height: "10 - 15",
        lifspan: "10 - 15 years",
        temperaments: {},
      };
      dbDog = {
        id: nanoid(),
        name: faker.animal.dog(),
        ...dog,
      };

      apiDog = {
        id: 1,
        name: faker.animal.dog(),
        ...dog,
      };

      idDbStub = sinon.stub(dbRepository, "getById").returns(dbDog);
      idApiStub = sinon.stub(apiRepository, "getById").returns(apiDog);
    });

    it("should return only from the database", async () => {
      const res = await request(app).get(`/dogs/${dbDog.id}`);

      expect(idDbStub.calledOnce).to.be.true;
      expect(idApiStub.calledOnce).to.be.false;
      expect(res.body).to.be.an("object");
      expect(res.body.name).to.be.equal(dbDog.name);
    });

    it("should return only from the api", async () => {
      const res = await request(app).get(`/dogs/${apiDog.id}`);

      expect(idDbStub.calledOnce).to.be.false;
      expect(idApiStub.calledOnce).to.be.true;
      expect(res.body).to.be.an("object");
      expect(res.body.name).to.be.equal(apiDog.name);
    });

    it("should return 404 code when breed is not found", async () => {
      idDbStub.returns({});
      const res = await request(app).get(`/dogs/wrongId`);

      expect(res.statusCode).to.be.equal(404);
      expect(res.body).to.be.include({
        message: "Breed with id -wrongId- is not found",
      });
    });

    afterEach(() => {
      idDbStub.restore();
      idApiStub.restore();
    });
  });
});
