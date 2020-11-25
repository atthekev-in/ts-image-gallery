import express, { Router } from 'express';
import AdminController from '../controllers/AdminController';

const router = Router();
const adminController = new AdminController();
router.get('/:id', adminController.getOne);
router.get('/', adminController.getAll);
router.post('/', adminController.create);
router.delete('/:id', adminController.deleteUser);
router.put("/:id", adminController.updateUser);

export default router;