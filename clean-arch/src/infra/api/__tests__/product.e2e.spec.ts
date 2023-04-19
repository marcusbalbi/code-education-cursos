import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({ name: "Pizza", price: 29.9 });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Pizza");
    expect(response.body.price).toBe(29.9);
  });

  it("should not create a product with invalid data", async () => {
    const response = await request(app).post("/product").send({
      price: 28,
    });
    expect(response.status).toBe(500);
  });

  it("should list products", async () => {
    await request(app).post("/product").send({ name: "Pizza", price: 29.9 });

    const response = await request(app).get("/product").send();
    expect(response.status).toBe(200);
    expect(response.body.products.length).toBe(1);
    expect(response.body.products[0].name).toBe("Pizza");
  });
});
