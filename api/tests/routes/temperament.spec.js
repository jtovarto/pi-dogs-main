const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

const request = require("supertest");
const app = require("../../src/app.js");
const { Temperament, conn } = require("../../src/db.js");

const axios = require("axios");
const temperService = require("../../src/services/temperament");

describe("GET /temperament", () => {
  before(() => {
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
  });

  describe("with temperaments stored", () => {
    beforeEach(async () => {
      await Temperament.sync({ force: true });

      await Temperament.bulkCreate([
        { name: "Temperament01" },
        { name: "Temperament02" },
        { name: "Temperament03" },
      ]);
    });

    it("should return status 200 and all temperament", async () => {
      const response = await request(app).get("/temperament");

      expect(response.statusCode).to.be.equal(200);
      expect(response.body).to.be.an("array").that.have.lengthOf(3);

      expect(response.body[0]).to.be.include({
        id: 1,
        name: "Temperament01",
      });
    });
  });

  describe("without temperaments stored", () => {
    before(async () => {
      await Temperament.sync({ force: true });

      const response = Promise.resolve({
        data: [
          { id: 1, temperament: "Stubborn, Curious" },
          { id: 4, temperament: "Adventurous" },
        ],
      });
      axiosStub = sinon.stub(axios, "get").resolves(response);
      serviStub = sinon.spy(temperService, "getFromApi");
    });
    
    it("should get temperaments from api", async () => {
      const response = await request(app).get("/temperament");

      expect(serviStub.calledOnce).to.be.true;
      expect(response.statusCode).to.be.equal(200);
      expect(response.body).to.be.an("array").that.have.lengthOf(3);

      expect(response.body[1]).to.be.include({
        id: 2,
        name: "Curious",
      });
    });
    after(() => {
      serviStub.restore();
      axiosStub.restore();
    });
  });
});
