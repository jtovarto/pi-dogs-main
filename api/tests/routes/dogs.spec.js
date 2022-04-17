/* eslint-disable import/no-extraneous-dependencies */

const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const request = require("supertest");
const app = require("../../src/app.js");

const services = require("../../src/services/breeds");
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

      fromDbStub = sinon.stub(services, "getBreedFromDB").returns([dbDog]);
      fromApiStub = sinon.stub(services, "getBreedFromApi").returns([apiDog]);
    });

    describe("GET /dogs?source=", () => {
      it("should return a list of breeds", async () => {
        const res = await request(app).get("/dogs");

        expect(res.statusCode).to.be.equal(200);
        expect(fromDbStub.calledOnce).to.be.true;
        expect(fromApiStub.calledOnce).to.be.true;
        expect(res.body).to.be.an("array").that.have.lengthOf(2);
      });

      it("should return only those from the database when prompted", async () => {
        const res = await request(app).get("/dogs").query({ source: "db" });

        expect(fromDbStub.calledOnce).to.be.true;
        expect(fromApiStub.calledOnce).to.be.false;
        expect(res.body).to.have.lengthOf(1);
        expect(res.body[0].name).to.be.equal(dbDog.name);
      });

      it("should return only those from the api when prompted", async () => {
        const res = await request(app).get("/dogs").query({ source: "api" });

        expect(fromDbStub.calledOnce).to.be.false;
        expect(fromApiStub.calledOnce).to.be.true;
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
        fromDbStub.returns([]);
        fromApiStub.returns([]);
      });

      it("should send results filtered by name", async () => {
        await request(app).get("/dogs").query({ name: "name" });

        expect(fromDbStub.calledWith("name")).to.be.true;
        expect(fromApiStub.calledWith("name")).to.be.true;
      });

      it("should send filtered results by name only from the db", async () => {
        await request(app).get("/dogs").query({ name: "name", source: "db" });

        expect(fromDbStub.calledWith("name")).to.be.true;
        expect(fromApiStub.calledOnce).to.be.false;
      });

      it("should send filtered results by name only from the db", async () => {
        await request(app).get("/dogs").query({ name: "name", source: "api" });

        expect(fromDbStub.calledOnce).to.be.false;
        expect(fromApiStub.calledWith("name")).to.be.true;
      });

      it("should display a proper message if the breed is not found", async () => {
        const res = await request(app)
          .get("/dogs")
          .query({ name: "not found" });

        expect(res.statusCode).to.be.equal(404);
        expect(res.body).to.be.include({
          message: "No results was found",
        });
      });
    });

    describe("error handling", () => {
      beforeEach(() => {
        if (faker.datatype.boolean) {
          fromDbStub.throws([]);
        } else {
          fromApiStub.throws([]);
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
      fromDbStub.restore();
      fromApiStub.restore();
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

      idFromDbStub = sinon.stub(services, "getBreedByIdFromDB").returns(dbDog);
      idFromApiStub = sinon
        .stub(services, "getBreedByIdFromApi")
        .returns(apiDog);
    });

    it("should return only from the database", async () => {
      const res = await request(app).get(`/dogs/${dbDog.id}`);

      expect(idFromDbStub.calledOnce).to.be.true;
      expect(idFromApiStub.calledOnce).to.be.false;
      expect(res.body).to.be.an("object");
      expect(res.body.name).to.be.equal(dbDog.name);
    });

    it("should return only from the api", async () => {
      const res = await request(app).get(`/dogs/${apiDog.id}`);

      expect(idFromDbStub.calledOnce).to.be.false;
      expect(idFromApiStub.calledOnce).to.be.true;
      expect(res.body).to.be.an("object");
      expect(res.body.name).to.be.equal(apiDog.name);
    });

    it("should return 404 code when breed is not found", async () => {
      idFromDbStub.returns({});
      const res = await request(app).get(`/dogs/wrongId`);

      expect(res.statusCode).to.be.equal(404);
      expect(res.body).to.be.include({
        message: "Breed with id -wrongId- is not found",
      });
    });

    afterEach(() => {
      idFromDbStub.restore();
      idFromApiStub.restore();
    });
  });
});
