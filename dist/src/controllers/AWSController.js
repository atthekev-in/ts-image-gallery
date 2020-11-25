"use strict";
// Copyright 2010-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
//
// This file is licensed under the Apache License, Version 2.0 (the "License").
// You may not use this file except in compliance with the License. A copy of the
// License is located at
//
// http://aws.amazon.com/apache2.0/
//
// This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
// OF ANY KIND, either express or implied. See the License for the specific
// language governing permissions and limitations under the License.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// To install stable release of RxJS: npm install rxjs
// To install TypeStrong/ts-node: npm install -D ts-node
// To install AWS SDK: npm install aws-sdk
//
// This CRUD API can be used in an Angular 2+ service
// To create Angular service: ng generate service [Name of service]
// See https://angular.io/tutorial/toh-pt4 for more information on Angular services
// Can be implemented inside ReactJS or React Native components to easily manage asynchronous data streams
// See https://hackernoon.com/what-happens-when-you-use-rxjs-in-react-11ae5163fc0a for more information
const s3_1 = __importDefault(require("aws-sdk/clients/s3"));
const rxjs_1 = require("rxjs");
class FileUpload {
    constructor(name, url) {
        this.name = name;
        this.url = url;
    }
}
class S3Controller {
    constructor() {
        this.FOLDER = '/* s3-folder-name */';
        this.BUCKET = process.env.BUCKETNAME;
    }
    static getS3Bucket() {
        return new s3_1.default({
            accessKeyId: process.env.ACCESSKEY,
            secretAccessKey: process.env.SECRETKEY,
            region: process.env.REGION
        });
    }
    uploadFile(file) {
        const bucket = new s3_1.default({
            accessKeyId: process.env.ACCESSKEY,
            secretAccessKey: process.env.SECRETKEY,
            region: process.env.REGION
        });
        const params = {
            Bucket: this.BUCKET,
            Key: this.FOLDER + file.name,
            Body: file,
            ACL: 'public-read'
        };
        bucket.upload(params, function (err, data) {
            if (err) {
                console.log('There was an error uploading your file: ', err);
                return false;
            }
            console.log('Successfully uploaded file.', data);
            return true;
        });
    }
    getFiles() {
        const fileUploads = [];
        const params = {
            Bucket: this.BUCKET,
            Prefix: this.FOLDER
        };
        S3Controller.getS3Bucket().listObjects(params, function (err, data) {
            if (err) {
                console.log('There was an error getting your files: ' + err);
                return;
            }
            console.log('Successfully get files.', data);
            const fileDetails = data.Contents;
            fileDetails.forEach((file) => {
                fileUploads.push(new FileUpload(file.Key, 'https://s3.amazonaws.com/' + params.Bucket + '/' + file.Key));
            });
        });
        return rxjs_1.of(fileUploads);
    }
    deleteFile(file) {
        const params = {
            Bucket: this.BUCKET,
            Key: file.name
        };
        S3Controller.getS3Bucket().deleteObject(params, (err, data) => {
            if (err) {
                console.log('There was an error deleting your file: ', err.message);
                return;
            }
            console.log('Successfully deleted file.');
        });
    }
}
//# sourceMappingURL=AWSController.js.map