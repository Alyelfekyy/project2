"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get orders. Error: ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderSql = 'SELECT * FROM orders WHERE order_id=($1)';
                const connection = yield database_1.default.connect();
                const rows = yield connection.query(orderSql, [id]);
                const order = rows.rows[0];
                return order;
            }
            catch (err) {
                throw new Error(`Could not find order ${id}. ${err}`);
            }
        });
    }
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO orders ( user_id, status) VALUES($1, $2) RETURNING *';
                const connection = yield database_1.default.connect();
                const rows = yield connection.query(sql, [
                    order.user_id,
                    order.status,
                ]);
                const createdOrder = rows.rows[0];
                connection.release();
                return Object.assign({}, createdOrder);
            }
            catch (err) {
                throw new Error(`Could not add new order for user ${order.user_id}. ${err}`);
            }
        });
    }
    addProductToOrder(quantity, order_id, product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            // check order if it is active
            try {
                const ordersql = 'SELECT * FROM orders WHERE order_id=($1)';
                //@ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(ordersql, [order_id]);
                const order = result.rows[0];
                if (order.status !== 'active') {
                    throw new Error(`Could not add product ${product_id} to order ${order_id} because order status is ${order.status}`);
                }
                conn.release();
            }
            catch (err) {
                throw new Error(`${err}`);
            }
            try {
                const sql = 'INSERT INTO product_of_order (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
                //@ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [
                    quantity,
                    order_id,
                    product_id,
                ]);
                const order_products = result.rows[0];
                conn.release();
                return order_products;
            }
            catch (err) {
                throw new Error(`Could not add product ${product_id} to order ${order_id}: ${err}`);
            }
        });
    }
    deleteOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const orderProductsSql = 'DELETE FROM  product_of_order WHERE order_id=($1)';
                yield connection.query(orderProductsSql, [id]);
                const sql = 'DELETE FROM orders WHERE id=($1)';
                const rows = yield connection.query(sql, [id]);
                const order = rows.rows[0];
                connection.release();
                return order;
            }
            catch (err) {
                throw new Error(`Could not delete order ${id}. ${err}`);
            }
        });
    }
}
exports.OrderStore = OrderStore;
