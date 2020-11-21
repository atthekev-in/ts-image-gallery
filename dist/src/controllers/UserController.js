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
const dbconnector_1 = __importDefault(require("../dbconfig/dbconnector"));
class UserController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield dbconnector_1.default.connect();
                const { username, password } = req.body;
                const sql = "INSERT into users (username, password) VALUES ($1, $2)";
                client.query(sql, [username, password]);
                client.release();
                res.status(200).send({ result: "redirect", url: "/users" });
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield dbconnector_1.default.connect();
                const { username, password } = req.body;
                const query = {
                    text: "UPDATE users SET password = ($1) WHERE username = ($2)",
                    values: [password, username]
                };
                client.query(query);
                client.release();
                res.status(200).send({ result: 'redirect', url: "/users" });
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield dbconnector_1.default.connect();
                const sql = "DELETE from users WHERE username = $1";
                client.query(sql, [req.params.id]);
                client.release();
                res.status(200).send({ result: 'redirect', url: "/users" });
            }
            catch (error) {
                res.status(404).send(error);
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield dbconnector_1.default.connect();
                const sql = "SELECT * FROM users WHERE username = $1";
                const { rows } = yield client.query(sql, [req.params.id]);
                const user = rows;
                client.release();
                res.render("user", { user });
            }
            catch (error) {
                res.status(404).send(error);
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield dbconnector_1.default.connect();
                const sql = "SELECT * FROM users";
                const { rows } = yield client.query(sql);
                const users = rows;
                client.release();
                res.render("users", { users });
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map