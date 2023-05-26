import { UserInterface } from "../lib/interface/auth/index.interface";
import { db } from "../provider/db";
import bcrypt from "bcrypt";

const bcryptRegex = /^\$(?:2a|2x|2y|2b)\$\d+\$/;

export class User {
  protected userData: UserInterface | undefined;

  constructor(userData: UserInterface) {
    this.userData = userData;
  }

  async save() {
    let encryptedPassword;
    
    if(!bcryptRegex.test(this.userData?.password as string)) {
      encryptedPassword = await bcrypt.hash(this.userData?.password as string, 10)
    }
    
    let users = {
      "first_name": this.userData?.first_name,
      "last_name": this.userData?.last_name,
      "email": this.userData?.email,
      "password": encryptedPassword,
      "address": this.userData?.address,
      "role": this.userData?.role,
      "phone_number": this.userData?.phone_number,
    };

    let sql = 'INSERT INTO users SET ?'

    return db.query(sql, users);
  }

  static async findAll() {
    let sql = `SELECT * FROM users;`;
    let [user, _]: any = await db.query(sql);

    return user;
  }

  static async findByEmail(email: string) {
    let sql = `SELECT * FROM users WHERE email = '${email}';`;
    let [user, _]: any = await db.query(sql);

    return user[0]?.email;
  }

  static findById(id: number) {
    let sql = `SELECT * FROM users WHERE id = ${id};`;

    return db.execute(sql);
  }
}
