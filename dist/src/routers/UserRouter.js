"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const router = express_1.Router();
const userController = new UserController_1.default();
router.get('/:id', userController.getOne);
router.get('/', userController.getAll);
router.post('/', userController.create);
router.delete('/:id', userController.deleteUser);
router.put("/:id", userController.updateUser);
exports.default = router;
//# sourceMappingURL=UserRouter.js.map