import express, { Router } from 'express';
import ImageController from '../controllers/ImageController'
import multer from 'multer';

const router = Router();
const imageController = new ImageController();

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

router.post('/:id', upload.single("file"), imageController.uploadImageToS3);
export default router;