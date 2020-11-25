"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s3_1 = __importDefault(require("aws-sdk/clients/s3"));
const ImageDBController_1 = __importDefault(require("./ImageDBController"));
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
        };
        const s3 = new s3_1.default({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION
        });
        s3.upload(params, (error, data) => {
            if (error) {
                throw error;
            }
            console.log(`uploaded successfully ${data.Location}`);
            const imageDBController = new ImageDBController_1.default();
            imageDBController.storeImage(username, data.Location);
            res.render("home", { username });
        });
    }
}
exports.default = ImageController;
//# sourceMappingURL=ImageController.js.map