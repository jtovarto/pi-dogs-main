/* eslint-disable import/no-extraneous-dependencies */
const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const { faker } = require("@faker-js/faker");

const axios = require("axios");

const { getAll, getById } = require("../../src/repositories/apiBreed");

describe("Breed request from Api", () => {
  let axiosFakeResponse;
  let axiosStub;
  let fakeData;

  beforeEach(() => {
    cont = 1;
    fakeData = Array(2).fill({});
    let info = {
      weight: {
        metric: "5 - 10",
      },
      height: {
        metric: "25 - 30",
      },
      life_span: "25 - 30 years",
      temperament: "Stubborn, Curious, Playful",
      image: {
        url: faker.image.imageUrl(),
      },
    };
    fakeData = fakeData.map((item) => ({
      id: cont++,
      ...info,
      name: faker.animal.dog(),
    }));
    fakeData.push({
      id: cont++,
      ...info,
      name: faker.animal.dog(),
      temperament: "",
    });

    axiosFakeResponse = Promise.resolve({ data: fakeData });
    axiosStub = sinon.stub(axios, "get");
  });

  describe("Get all breeds", () => {
    it("should receive an array of results", async () => {
      axiosStub.resolves(axiosFakeResponse);

      let res = await getAll();

      expect(axiosStub.calledOnce).to.be.true;
      expect(res).to.be.an("array").that.have.lengthOf(3);
      expect(res[0]).to.deep.equals({
        id: fakeData[0].id,
        name: fakeData[0].name,
        image: fakeData[0].image.url,
        weight: fakeData[0].weight.metric,
        temperaments: ["Stubborn", "Curious", "Playful"],
      });
    });

    it("can get all breeds filtered by name", async () => {
      axiosStub.resolves(axiosFakeResponse);
      
      let res = await getAll(fakeData[2].name);

      expect(res).to.be.an("array").that.have.lengthOf(1);
      expect(res[0]).to.deep.equals({
        id: fakeData[2].id,
        name: fakeData[2].name,
        image: fakeData[2].image.url,
        weight: fakeData[2].weight.metric,
        temperaments: [],
      });
    });

    it("should return message when no matches", async () => {
      axiosStub.resolves(axiosFakeResponse);

      let res = await getAll("not found");

      expect(res).to.be.an("array").that.have.lengthOf(0);
    });

    it("should handle exception throws", async () => {
      axiosStub.throws(() => new Error("There was a problem"));
      try {
        await getAll();
      } catch (error) {
        expect(error.message).to.be.match(/There was a problem/);
      }
    });
  });

  describe("Get a breed by ID", () => {
    it("should return a found breed", async () => {
      axiosStub.resolves(axiosFakeResponse);

      let res = await getById(fakeData[2].id);

      expect(axiosStub.calledOnce).to.be.true;
      expect(res).to.be.an("object");
      expect(res).to.deep.equals({
        id: fakeData[2].id,
        name: fakeData[2].name,
        image: fakeData[2].image.url,
        weight: fakeData[2].weight.metric,
        height: fakeData[2].height.metric,
        lifespan: fakeData[2].life_span,
        temperaments: [],
      });
    });

    it("should return a empty object when breed is not found", async () => {
      axiosStub.resolves(axiosFakeResponse);

      let res = await getById(10);

      expect(res).to.be.an("object").that.to.be.empty;
    });

    it("should handle exception throws", async () => {
      axiosStub.throws(() => new Error("There was a problem"));
      try {
        await getById(10);
      } catch (error) {
        expect(error.message).to.be.match(/There was a problem/);
      }
    });
  });

  afterEach(() => {
    axiosStub.restore();
  });
});
