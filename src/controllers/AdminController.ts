import pool from '../dbconfig/dbconnector'

class AdminController {
    
    public async create(req, res) {
        try {
            const client = await pool.connect();
            const { username, password } = req.body;
            const sql = "INSERT into users (username, password) VALUES ($1, $2)";
            client.query(sql, [username, password]);
            client.release();
            res.status(200).send({result: "redirect", url: "/admin/users"});
        } catch (error) {
            res.status(400).send(error);
            
        }
    }
    public async updateUser(req, res) {
        try {
            const client = await pool.connect();
            const { username, password } = req.body;
            const query = {
                text: "UPDATE users SET password = ($1) WHERE username = ($2)",
                values: [password, username]
            }
            client.query(query);
            client.release();
            res.status(200).send({result: 'redirect', url: "/admin/users"});
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async deleteUser(req, res) {
        try {
            const client = await pool.connect();
            const sql = "DELETE from users WHERE username = $1";
            client.query(sql, [req.params.id]);
            client.release();
      
            res.status(200).send({ result: 'redirect', url: "/admin/users"})
        } catch (error) {
            res.status(404).send(error);
        }
    }

    public async getOne(req, res) {
        try {
            const client = await pool.connect();
            const sql = "SELECT * FROM users WHERE username = $1";
            const { rows } = await client.query(sql, [req.params.id]);
            const user = rows;
            client.release();
            res.render("user", { user } );
        } catch (error) {
            res.status(404).send(error);
        }
    }
    
    public async getAll(req, res) {

        try {
            const client = await pool.connect();
            const sql = "SELECT * FROM users";
            const { rows } = await client.query(sql);
            const users = rows;
            client.release();
            res.render("users", { users });
        } catch (error) {
            res.status(400).send(error);
        }
    }
    
}
export default AdminController;