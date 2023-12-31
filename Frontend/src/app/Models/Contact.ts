export class ContactModel {
    title: string;
    value: string;
    id?: string;
    isOpened = false;
    constructor (title: string, value: string, id?:string ) {
        this.title = title;
        this.value = value;
        if(id != null){
            this.id = id;
        }
    }
}