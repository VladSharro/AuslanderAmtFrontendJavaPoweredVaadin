export class DocumentModel {
    name: string;
    description: string;
    id?: string;
    isOpened = false;
    constructor (name: string, description: string, id?:string ) {
        this.description = description;
        this.name = name;
        if(id != null){
            this.id = id;
        }
    }
}