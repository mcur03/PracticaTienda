import { RowDataPacket } from 'mysql2';
import bcrypt from 'bcrypt';
import db from '../config/db';
import User from '../Dto/userDto';


export class UserRepository{
    static async registerUser(user:User): Promise<void>{
        const { email, pass, rol } = user;
        const hashedPass = await bcrypt.hash(pass, 10);
        await db.query('INSERT INTO users( email, pass, rol ) VALUES(?,?,?)',
            [email, hashedPass, rol]);
    }

    static async loginUser(email:string , pass:string){
        const [ rows ] = await db.query<RowDataPacket[]>('SELECT * FROM users WHERE email = ?',
            [ email])
            if (rows.length > 0) {
                const user = rows[0] as User;
                const isMatch = await bcrypt.compare(pass, user.pass);
                return isMatch ? user : null;
            }
    }
}