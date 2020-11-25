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
const express_1 = require("express");
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const ImageDBController_1 = __importDefault(require("../controllers/ImageDBController"));
const router = express_1.Router();
const authController = new AuthController_1.default();
router.get('/', (req, res) => {
    res.render('login');
});
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let username = req.params.id;
    let images;
    try {
        const imageDBController = new ImageDBController_1.default();
        images = yield imageDBController.getImages(req.params.id);
        console.log(images);
    }
    catch (error) {
    }
    res.render('home', { username });
}));
router.post('/auth', authController.authenticateLogin);
exports.default = router;
//# sourceMappingURL=LoginRouter.js.map