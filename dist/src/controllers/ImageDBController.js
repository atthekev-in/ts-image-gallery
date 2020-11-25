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
class ImageDBController {
    storeImage(username, s3Url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield dbconnector_1.default.connect();
                const sql = "INSERT into IMAGES (username, imageurl) VALUES ($1, $2)";
                client.query(sql, [username, s3Url]);
                client.release();
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getImages(username) {
        return __awaiter(this, void 0, void 0, function* () {
            let images;
            try {
                const client = yield dbconnector_1.default.connect();
                const sql = "SELECT imageurl FROM images where username = $1";
                const { rows } = yield client.query(sql, [username]);
                images = rows;
                client.release();
            }
            catch (error) {
                console.log(error);
            }
            return images;
        });
    }
}
exports.default = ImageDBController;
//# sourceMappingURL=ImageDBController.js.map