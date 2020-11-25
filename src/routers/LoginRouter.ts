import { Router } from "express";
import express from 'express';

import AuthController from '../controllers/AuthController';
import ImageDBController from '../controllers/ImageDBController';
import { resolve } from "path";

const router = Router();
const authController = new AuthController();
router.get('/', (req, res) => {
    res.render('login');
});
router.get('/:id', async (req, res) => {
    let username = req.params.id;
    let images;
    try {
        const imageDBController = new ImageDBController();
        images = await imageDBController.getImages(req.params.id);
    
        console.log(images);
        
    } catch (error) {
        
    }

    res.render('home', { username });
})
router.post('/auth', authController.authenticateLogin);
export default router;