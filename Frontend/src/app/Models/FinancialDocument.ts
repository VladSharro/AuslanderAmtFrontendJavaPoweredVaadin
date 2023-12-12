export class FinancialDocument{

    fileType: string = '';
    file: File | null = null;

    constructor();
    constructor(fileType?: string, file?: File){
        if(file && fileType){
            this.file = file;
            this.fileType = fileType;
        }
    }
}