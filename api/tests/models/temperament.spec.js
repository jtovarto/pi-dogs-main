const { Temperament, conn } = require("../../src/db.js");
const { expect } = require("chai");

const temperamentData = {
  name: "temperament name",
};

describe("Temperament model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  describe("Validators", () => {
    beforeEach(() => Temperament.sync({ force: true }));

    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Temperament.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });

      it("should work when its a valid name", async () => {
        const temperament = await Temperament.create(temperamentData);
        expect(temperament.toJSON()).to.have.property("name", temperament.name);
      });
    });
  });
});
