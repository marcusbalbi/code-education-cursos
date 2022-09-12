import { Sequelize } from "sequelize-typescript";
import Order from "../../domain/entity/Order";
import OrderItem from "../../domain/entity/OrderItem";
import OrderRepositoryInterface from "../../domain/repository/order.repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => {
          return {
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
          };
        }),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
  async update(entity: Order): Promise<void> {
    try {
      const t = await OrderModel.sequelize?.transaction();
      await OrderModel.update(
        {
          id: entity.id,
          customer_id: entity.customerId,
          total: entity.total(),
        },
        {
          where: { id: entity.id },
          transaction: t,
        }
      );
      await OrderItemModel.destroy({
        where: { order_id: entity.id },
        transaction: t,
      });
      await OrderItemModel.bulkCreate(
        entity.items.map((item) => {
          return {
            id: item.id,
            name: item.name,
            order_id: entity.id,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
          };
        }),
        { transaction: t }
      );
    } catch (err) {
      debugger;
      throw err;
    }
  }
  async find(id: string): Promise<Order | null> {
    const orderModel = await OrderModel.findOne({
      where: { id },
      include: ["items"],
    });
    if (!orderModel) {
      return null;
    }

    const orderItems = orderModel.items.map((itemModel) => {
      return new OrderItem(
        itemModel.id,
        itemModel.name,
        itemModel.price,
        itemModel.product_id,
        itemModel.quantity
      );
    });

    return new Order(orderModel.id, orderModel.customer_id, orderItems);
  }
  async findAll(): Promise<Order[]> {
    const ordersModel = await OrderModel.findAll({
      include: ["items"],
    });

    const orders = ordersModel.map((order) => {
      const orderItems = order.items.map((itemModel) => {
        return new OrderItem(
          itemModel.id,
          itemModel.name,
          itemModel.price,
          itemModel.product_id,
          itemModel.quantity
        );
      });

      return new Order(order.id, order.customer_id, orderItems);
    });

    return orders;
  }
}
