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
class AuthController {
    authenticateLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield dbconnector_1.default.connect();
                const sql = "SELECT password FROM users WHERE username = $1";
                const { username, password } = req.body;
                const { rows } = yield client.query(sql, [req.body.username]);
                client.release();
                if (password === rows[0]['password']) {
                    res.redirect('/' + username);
                }
                else {
                    alert('incorrect username or password');
                }
            }
            catch (error) {
                res.status(404).send(error);
            }
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map