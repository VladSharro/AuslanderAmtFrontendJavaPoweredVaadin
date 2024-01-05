export class DocumentModel {
    name: string;
    description: string;
    id?: string;
    isOpened = false;
    isFirstTime = true;
    isExtending = true;
    constructor (name: string, description: string, id?:string ,isFirstTime?: boolean, isExtening?: boolean) {
        this.description = description;
        this.name = name;
        if(id != null){
            this.id = id
        }
        if(isFirstTime != null){
            this.isFirstTime = isFirstTime
        }
        if(isExtening != null){
            this.isExtending = isExtening
        }
    }
}