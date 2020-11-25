"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ImageController_1 = __importDefault(require("../controllers/ImageController"));
const multer_1 = __importDefault(require("multer"));
const router = express_1.Router();
const imageController = new ImageController_1.default();
const storage = multer_1.default.memoryStorage();
const upload = multer_1.default({ storage: storage });
router.post('/:id', upload.single("file"), imageController.uploadImageToS3);
exports.default = router;
//# sourceMappingURL=ImageRouter.js.map