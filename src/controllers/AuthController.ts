import pool from '../dbconfig/dbconnector';
import User from '../models/User'

class AuthController {

    public async authenticateLogin(req, res) {
        try {
            const client = await pool.connect();
            const sql = "SELECT password FROM users WHERE username = $1";
            const { username, password } = req.body;
            const { rows } = await client.query(sql, [req.body.username]);
            client.release();

            if (password === rows[0]['password']) {
                res.redirect('/' + username);
            } else {
                alert('incorrect username or password');
            }
        } catch (error) {
            res.status(404).send(error);
        }
    }
}
export default AuthController;