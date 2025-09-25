import { User } from "./User";


export class Agriculteur extends User {
    constructor(
        username: string,
        password: string,
        email: string,
        phone: string
    ) {
        super(username, password, email, phone);
    }
}
