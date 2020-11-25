"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AdminController_1 = __importDefault(require("../controllers/AdminController"));
const router = express_1.Router();
const adminController = new AdminController_1.default();
router.get('/:id', adminController.getOne);
router.get('/', adminController.getAll);
router.post('/', adminController.create);
router.delete('/:id', adminController.deleteUser);
router.put("/:id", adminController.updateUser);
exports.default = router;
//# sourceMappingURL=AdminRouter.js.map