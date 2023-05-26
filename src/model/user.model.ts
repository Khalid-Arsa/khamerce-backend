import { UserInterface } from "../lib/interface/auth/index.interface";
import {db} from "../provider/db"

export class User {
  protected userData: UserInterface | undefined;

  constructor(userData: UserInterface) {
    this.userData = userData;
  }

  async save() {
    let sql = `
    INSERT INTO users (
      first_name, 
      last_name, 
      email, 
      password, 
      confirm_password, 
      address, 
      role, 
      phone_number
      ) 
      values (
        '${this.userData?.first_name}', 
        '${this.userData?.last_name}', 
        '${this.userData?.email}', 
        '${this.userData?.password}', 
        '${this.userData?.confirm_password}', 
        '${this.userData?.address}', 
        '${this.userData?.role}', 
        '${this.userData?.phone_number}'
      );
    `;

    return db.execute(sql);
  }

  static async findAll() {
    let sql = `SELECT * FROM users;`
    let [user, _]: any = await db.execute(sql);

    return user
  }

  static async findByEmail(email: string) {
    let sql = `SELECT * FROM users WHERE email = '${email}';`
    let [user, _]: any = await db.execute(sql);

    return user[0]?.email
  }

  static findById(id: number) {
    let sql = `SELECT * FROM users WHERE id = ${id};`

    return db.execute(sql);
  }
}
