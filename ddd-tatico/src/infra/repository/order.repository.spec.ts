import { Sequelize } from "sequelize-typescript";
import { Address } from "../../domain/entity/Address";
import { Customer } from "../../domain/entity/Customer";
import Order from "../../domain/entity/Order";
import OrderItem from "../../domain/entity/OrderItem";
import Product from "../../domain/entity/Product";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import ProductRepository from "./product.repository";

describe("Order Repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a Order", async () => {
    const customerRepository = new CustomerRepository();
    const c1 = new Customer("c1", "Joe Doe");
    c1.defineAddress(new Address("Rua souza Cardoso", 12, "28625000", "Nova Friburgo"));
    c1.addRewardPoints(10);
    c1.activate();
    await customerRepository.create(c1);

    const productRepository = new ProductRepository();
    const p1 = new Product("p1", "coca cola", 10);
    const p2 = new Product("p2", "pepsi cola", 9);
    await productRepository.create(p1);
    await productRepository.create(p2);

    const orderItem1 = new OrderItem("oi1", p1.name, p1.price, p1.id, 3)
    const orderItem2 = new OrderItem("oi2", p2.name, p2.price, p2.id, 2)

    const order = new Order("o1", c1.id, [orderItem1, orderItem2]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

    expect(orderModel?.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: c1.id,
      total: order.total(),
      items: [
        {
          id: orderItem1.id,
          name: orderItem1.name,
          price: orderItem1.price,
          quantity: orderItem1.quantity,
          order_id: order.id,
        },
        {
          id: orderItem2.id,
          name: orderItem1.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          order_id: order.id,
        },
      ],
    });



  });

  it("should update a Order", async () => {
    
  });

  it("should find a Order", async () => {});
  it("should findAll Orders", async () => {});
});
