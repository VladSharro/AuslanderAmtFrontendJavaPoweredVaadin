export class UserModel {
    mail: string;
    password: string;
    id?: string;
    isOpened = false;
    constructor (mail: string, password: string, id?:string ) {
        this.mail = mail;
        this.password = password;
        if(id != null){
            this.id = id;
        }
    }
}