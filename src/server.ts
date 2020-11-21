import express, { Application, Router } from 'express';
import * as dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import userRouter from './routers/UserRouter';
import pool from './dbconfig/dbconnector';
import UserController from './controllers/UserController';

class Server {
    private app;

    constructor() {
        dotenv.config();
        this.app = express();
        this.config();
        this.routerConfig();
        this.dbConnect();
    }

    private config() {
        this.app.use(bodyParser.urlencoded({ extended:true }));
        this.app.use(bodyParser.json({ limit: '1mb' }));
        this.app.set("views", path.join(__dirname + "/views"));
        this.app.set("view engine", "ejs");
    }

    private dbConnect() {
        pool.connect(function(err, client, done) {
            if (err) throw new Error(err.message);
            console.log("connected to database");

        })
    }

    private routerConfig() {
        this.app.use('/users', userRouter);
  
    }

    public start = (port: number) => {
        return new Promise((resolve, reject) => {
            this.app.listen(port, () => {
                resolve(port);
            }).on('error', (err: Object) => reject(err));
        });
    }
}

export default Server;