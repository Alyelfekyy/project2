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
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../models/order");
const store = new order_1.OrderStore();
describe('Order model', () => {
    it('should have index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have create method', () => {
        expect(store.create).toBeDefined();
    });
    it('create method should add 1 order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create({
            status: 'active',
            user_id: 1,
        });
        expect(result).toEqual({
            order_id: 1,
            status: 'active',
            user_id: 1,
        });
    }));
    it('index method should return list', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result).toEqual([
            {
                order_id: 1,
                status: 'active',
                user_id: 1,
            },
        ]);
    }));
    it('show method should return single order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.show(1);
        expect(result).toEqual({
            order_id: 1,
            status: 'active',
            user_id: 1,
        });
    }));
    it('addProduct method should add 1 product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.addProductToOrder(1, 1, 1);
        expect(result).toEqual({
            id: 1,
            order_id: 1,
            quantity: 1,
            product_id: 1,
        });
    }));
});
