import express, { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();
const userController = new UserController();
router.get('/:id', userController.getOne);
router.get('/', userController.getAll);
router.post('/', userController.create);
router.delete('/:id', userController.deleteUser);
router.put("/:id", userController.updateUser);

export default router;