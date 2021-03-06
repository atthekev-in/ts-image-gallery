"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const AdminRouter_1 = __importDefault(require("./routers/AdminRouter"));
const LoginRouter_1 = __importDefault(require("./routers/LoginRouter"));
const ImageRouter_1 = __importDefault(require("./routers/ImageRouter"));
const dbconnector_1 = __importDefault(require("./dbconfig/dbconnector"));
class Server {
    constructor() {
        this.start = (port) => {
            return new Promise((resolve, reject) => {
                this.app.listen(port, () => {
                    resolve(port);
                }).on('error', (err) => reject(err));
            });
        };
        dotenv.config();
        this.app = express_1.default();
        this.config();
        this.routerConfig();
        this.dbConnect();
    }
    config() {
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.json({ limit: '1mb' }));
        this.app.set("views", path_1.default.join(__dirname + "/views"));
        this.app.set("view engine", "ejs");
    }
    dbConnect() {
        dbconnector_1.default.connect(function (err, client, done) {
            if (err)
                throw new Error(err.message);
            console.log("connected to database");
        });
    }
    routerConfig() {
        this.app.use('/admin/users', AdminRouter_1.default);
        this.app.use('/', LoginRouter_1.default);
        this.app.use('/upload', ImageRouter_1.default);
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map