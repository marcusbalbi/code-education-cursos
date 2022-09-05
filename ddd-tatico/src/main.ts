import { Address } from "./entity/Address";
import { Customer } from "./entity/Customer";
import Order from "./entity/Order";
import OrderItem from "./entity/OrderItem";

let customer = new Customer("123", "Balbi");
const address = new Address("Alameda bla bla", 12, "28625000", "Nova Friburgo");
customer.defineAddress(address);


const item1 = new OrderItem("1", "Caneta Azul", 0.5, "p1", 2);
const item2 = new OrderItem("2", "Caneta Rosa", 0.7, "p2", 1);
const order = new Order('1', customer.id, [item1, item2]);

