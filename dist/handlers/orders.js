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
const authorization_1 = __importDefault(require("../middleware/authorization"));
const order_1 = require("../models/order");
const store = new order_1.OrderStore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield store.index();
    res.json(orders);
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const order = yield store.show(id);
        res.json(order);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = {
        user_id: req.body.user_id,
        status: req.body.status,
        order_id: req.body.order_id,
    };
    try {
        const newOrder = yield store.create(order);
        res.send(`Order with id ${req.body.order_id} successfully created.`);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const addProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order_id = parseInt(req.params.id);
    const product_id = parseInt(req.body.product_id);
    const quantity = parseInt(req.body.quantity);
    try {
        const addedProduct = yield store.addProductToOrder(quantity, order_id, product_id);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const deletez = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (!id) {
        return res.status(400).send('Missing required parameter :id.');
    }
    const deletedOrder = yield store.deleteOrder(id);
    res.send(`Order with id ${id} successfully deleted.`);
    res.json(deletedOrder);
});
const ordersRoutes = (app) => {
    app.get('/orders', authorization_1.default, index);
    app.get('/order/:id', authorization_1.default, show);
    app.post('/orders', authorization_1.default, create);
    app.post('/orders/:id/products', authorization_1.default, addProducts);
    app.delete('orders/:id', authorization_1.default, deletez);
};
exports.default = ordersRoutes;
