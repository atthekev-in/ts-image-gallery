import pool from '../dbconfig/dbconnector';

class ImageDBController {

    async storeImage(username: string, s3Url: string) {
        try {
            const client = await pool.connect();
            const sql = "INSERT into IMAGES (username, imageurl) VALUES ($1, $2)";
            client.query(sql, [username, s3Url]);
            client.release();
        } catch (error) {
            console.log(error);
        }
    }
    async getImages(username: string): Promise<string[]> {
       let images: string[];
        try {
            const client = await pool.connect();
            const sql = "SELECT imageurl FROM images where username = $1";
            const { rows } = await client.query(sql, [username]);
            images = rows;
            client.release();
        } catch (error) {
            console.log(error);
        }
        return images;

    }
}
export default ImageDBController;