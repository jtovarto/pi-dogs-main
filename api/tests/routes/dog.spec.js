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

  describe("GET /dogs", () => {
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
      const res = await request(app).get("/dogs").query({ name: "not found" });

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
/* 
const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const request = require("supertest");
const app = require("../../src/app.js");

const services = require("../../src/services/breeds");

describe("Dogs routes", () => {
  describe("GET /dogs", () => {
    beforeEach(() => {
        dbDog = {
          id: "ajksnk",
          name: "fake name db",
          image: "https://fake-image.db.com",
          weight: "10-15",
          temperaments: {},
        };

      apiDog = {
        id: 1,
        name: "fake name api",
        image: "https://fake-image.api.com",
        weight: "10-15",
        temperaments: {},
      };
      getBreedFromDB = sinon.stub(services, "getBreedFromDB").returns([dbDog]);
      getBreedFromApi = sinon
        .stub(services, "getBreedFromApi")
        .returns([apiDog]);
    });

    it("should return a list of breeds", async () => {
      const res = await request(app).get("/dogs");

      expect(res.statusCode).to.be.equal(200);
      expect(getBreedFromDB.calledOnce).to.be.true;
      expect(getBreedFromApi.calledOnce).to.be.true;
      expect(res.body).to.be.an("array").that.have.lengthOf(2);
    });

    it("debe retornar solo los de la base de datos cuando si se le indica", async () => {
      const res = await request(app).get("/dogs?source=db");

      expect(getBreedFromApi.calledOnce).to.be.false;
      expect(getBreedFromDB.calledOnce).to.be.true;
      expect(res.body).to.have.lengthOf(1);
      expect(res.body[0].name).to.be.equal(dbDog.name);
    });

    it("debe retornar solo los de la api cuando si se le indica", async () => {
      const res = await request(app).get("/dogs?source=api");

      expect(getBreedFromApi.calledOnce).to.be.true;
      expect(getBreedFromDB.calledOnce).to.be.false;
      expect(res.body).to.have.lengthOf(1);
      expect(res.body[0].name).to.be.equal(apiDog.name);
    });

    it("debe devolver solo los atributos necesarios", async () => {
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

  describe("search", () => {
    beforeEach(() => {
      getBreedFromDB = sinon.stub(services, "getBreedFromDB").returns([]);
      getBreedFromApi = sinon.stub(services, "getBreedFromApi").returns([]);
    });

    it("debe enviar resultados filtrados por nombre", async () => {
      await request(app).get("/dogs?name=db");

      expect(getBreedFromDB.calledWith("db")).to.be.true;
      expect(getBreedFromApi.calledWith("db")).to.be.true;
    });

    it("puede enviar resultados filtrados por nombre solo de la db", async () => {
      await request(app).get("/dogs?name=db&source=db");

      expect(getBreedFromDB.calledWith("db")).to.be.true;
      expect(getBreedFromApi.calledWith("db")).to.be.false;
    });

    it("puede enviar resultados filtrados por nombre solo de la api", async () => {
      await request(app).get("/dogs?name=db&source=api");

      expect(getBreedFromDB.calledWith("db")).to.be.false;
      expect(getBreedFromApi.calledWith("db")).to.be.true;
    });

    it("debe mostrar un mensaje adecuado si no se encuentra la raza", async () => {
      const res = await request(app).get("/dogs?name=db&source=api");

      expect(res.status).to.be.eql(404);
      expect(res.body).to.be.include({
        message: "No results was found",
      });
    });
  });

  describe("handling errors", () => {
    beforeEach(() => {
      getBreedFromDB = sinon.stub(services, "getBreedFromDB").throws([]);
      getBreedFromApi = sinon
        .stub(services, "getBreedFromApi")
        .returns(new Error());
    });

    it("debe manejar errores", async () => {
      const res = await request(app).get("/dogs?name=db&source=api");
      expect(res.body).to.include({
        success: false,
        error: "Something was worng",
      });
    });
  });

  afterEach(() => {
    getBreedFromApi.restore();
    getBreedFromDB.restore();
  });
});

*/
