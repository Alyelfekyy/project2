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
const user_1 = require("../../models/user");
const store = new user_1.UserStore();
describe('User Model', () => {
    it('should create a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create({
            username: 'ahmeddd',
            firstname: 'ahmed',
            lastname: 'alyyy',
            password: 'password1',
        });
        expect(result.username).toEqual('ahmeddd');
    }));
    it('should return a list of users', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result.length).toEqual(1);
    }));
    it('should return the correct user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.show(1);
        expect(result.username).toEqual('ahmeddd');
    }));
});
