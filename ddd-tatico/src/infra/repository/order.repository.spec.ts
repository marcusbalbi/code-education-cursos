import { Sequelize } from "sequelize-typescript";
import Order from "../../domain/checkout/entity/order";
import OrderItem from "../../domain/checkout/entity/order-item";
import { Address } from "../../domain/customer/entity/Address";
import { Customer } from "../../domain/customer/entity/Customer";
import Product from "../../domain/product/entity/Product";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import OrderRepository from "./order.repository";
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

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a Order", async () => {
    const customerRepository = new CustomerRepository();
    const c1 = new Customer("c1", "Joe Doe");
    c1.defineAddress(
      new Address("Rua souza Cardoso", 12, "28625000", "Nova Friburgo")
    );
    c1.addRewardPoints(10);
    c1.activate();
    await customerRepository.create(c1);

    const productRepository = new ProductRepository();
    const p1 = new Product("p1", "coca cola", 10);
    const p2 = new Product("p2", "pepsi cola", 9);
    await productRepository.create(p1);
    await productRepository.create(p2);

    const orderItem1 = new OrderItem("oi1", p1.name, p1.price, p1.id, 3);
    const orderItem2 = new OrderItem("oi2", p2.name, p2.price, p2.id, 2);

    const order = new Order("o1", c1.id, [orderItem1, orderItem2]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

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
          product_id: "p1",
        },
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          order_id: order.id,
          product_id: "p2",
        },
      ],
    });
  });

  it("should update a Order", async () => {
    const customerRepository = new CustomerRepository();
    const c1 = new Customer("c1", "Joe Doe");
    c1.defineAddress(
      new Address("Rua souza Cardoso", 12, "28625000", "Nova Friburgo")
    );
    c1.addRewardPoints(10);
    c1.activate();
    await customerRepository.create(c1);

    const productRepository = new ProductRepository();
    const p1 = new Product("p1", "coca cola", 10);
    const p2 = new Product("p2", "pepsi cola", 9);
    const p3 = new Product("p3", "Fanta", 8);
    await productRepository.create(p1);
    await productRepository.create(p2);
    await productRepository.create(p3);

    const orderItem1 = new OrderItem("oi1", p1.name, p1.price, p1.id, 3);
    const orderItem2 = new OrderItem("oi2", p2.name, p2.price, p2.id, 2);

    const order = new Order("o1", c1.id, [orderItem1, orderItem2]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderItem3 = new OrderItem("oi3", p3.name, p3.price, p3.id, 2);

    order.addItem(orderItem3);

    await orderRepository.update(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

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
          product_id: "p1",
        },
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          order_id: order.id,
          product_id: "p2",
        },
        {
          id: orderItem3.id,
          name: orderItem3.name,
          price: orderItem3.price,
          quantity: orderItem3.quantity,
          order_id: order.id,
          product_id: "p3",
        },
      ],
    });
  });

  it("should find a Order", async () => {
    const customerRepository = new CustomerRepository();
    const c1 = new Customer("c1", "Joe Doe");
    c1.defineAddress(
      new Address("Rua souza Cardoso", 12, "28625000", "Nova Friburgo")
    );
    c1.addRewardPoints(10);
    c1.activate();
    await customerRepository.create(c1);

    const productRepository = new ProductRepository();
    const p1 = new Product("p1", "coca cola", 10);
    const p2 = new Product("p2", "pepsi cola", 9);
    await productRepository.create(p1);
    await productRepository.create(p2);

    const orderItem1 = new OrderItem("oi1", p1.name, p1.price, p1.id, 3);
    const orderItem2 = new OrderItem("oi2", p2.name, p2.price, p2.id, 2);

    const order = new Order("o1", c1.id, [orderItem1, orderItem2]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderPersisted = await orderRepository.find("o1");

    expect(order).toStrictEqual(orderPersisted);
  });
  it("should findAll Orders", async () => {
    const customerRepository = new CustomerRepository();
    const c1 = new Customer("c1", "Joe Doe");
    c1.defineAddress(
      new Address("Rua souza Cardoso", 12, "28625000", "Nova Friburgo")
    );
    c1.addRewardPoints(10);
    c1.activate();
    await customerRepository.create(c1);

    const productRepository = new ProductRepository();
    const p1 = new Product("p1", "coca cola", 10);
    const p2 = new Product("p2", "pepsi cola", 9);
    await productRepository.create(p1);
    await productRepository.create(p2);

    const orderItem1 = new OrderItem("oi1", p1.name, p1.price, p1.id, 3);
    const orderItem2 = new OrderItem("oi2", p2.name, p2.price, p2.id, 2);

    const order = new Order("o1", c1.id, [orderItem1, orderItem2]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderItem3 = new OrderItem("oi3", p2.name, p2.price, p2.id, 5);
    const order2 = new Order("o2", c1.id, [orderItem3]);
    await orderRepository.create(order2);

    const orders = await orderRepository.findAll();

    expect(orders.length).toBe(2);
    
    expect(orders.find(o => o.id === order.id)).not.toBeNull();
    expect(orders.find(o => o.id === order2.id)).not.toBeNull();
  });
});
