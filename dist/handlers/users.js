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
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authorization_1 = __importDefault(require("../middleware/authorization"));
const store = new user_1.UserStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield store.index();
    res.json(users);
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield store.show(id);
        res.json(user);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
    };
    try {
        const newUser = yield store.create(user);
        var token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json({ token });
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            username: req.body.username,
            password: req.body.password,
        };
        const authUser = yield store.authenticate(user.username, user.password);
        var token = jsonwebtoken_1.default.sign({ user: authUser }, process.env.TOKEN_SECRET);
        res.json({ token: token });
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
    const user = yield store.delete(id);
    res.send(`User with id ${id} successfully deleted.`);
    res.json(user);
});
const usersRoutes = (app) => {
    app.get('/users', authorization_1.default, index);
    app.get('/users/:id', authorization_1.default, show);
    app.post('/users', authorization_1.default, create);
    app.post('/authenticate', authenticate);
    app.delete('users/:id', authorization_1.default, deletez);
};
exports.default = usersRoutes;
