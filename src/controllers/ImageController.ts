import S3 from 'aws-sdk/clients/s3';
import * as dotenv from 'dotenv';
import fs from 'fs';
import ImageDBController from './ImageDBController'

class ImageController {

    uploadImageToS3(req, res) {
        const file = req.file;
        const username = req.params.id;
        
        const params = {
            Bucket: process.env.BUCKETNAME,
            Folder: username + '/',
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read"
        }

        const s3 = new S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION
        });
        s3.upload(params, (error, data) => {
            if (error) {
                throw error;
            }
            console.log(`uploaded successfully ${data.Location}`);
            const imageDBController = new ImageDBController();
            imageDBController.storeImage(username, data.Location);
            res.render("home", { username })
        });
    }
 
    
    }


export default ImageController;