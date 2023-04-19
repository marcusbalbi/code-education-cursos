import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "Jhon Doe",
        address: {
          street: "Rua Souza Cardozo",
          number: 23,
          zip: "28777666",
          city: "Rio de Janeiro",
        },
      });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Jhon Doe");
    expect(response.body.address).toMatchObject({
      street: "Rua Souza Cardozo",
      number: 23,
      zip: "28777666",
      city: "Rio de Janeiro",
    });
  });

  it("should not create a customer with invalid data", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "Jhon Doe",
      });
    expect(response.status).toBe(500);
  });

  it("should list customers", async () => {
    await request(app)
      .post("/customer")
      .send({
        name: "Jhon Doe",
        address: {
          street: "Rua Souza Cardozo",
          number: 23,
          zip: "28777666",
          city: "Rio de Janeiro",
        },
      });

    const response = await request(app).get("/customer").send();
    expect(response.status).toBe(200);
    expect(response.body.customers.length).toBe(1)
    expect(response.body.customers[0].name).toBe("Jhon Doe")
  })
});
