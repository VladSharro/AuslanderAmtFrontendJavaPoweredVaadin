export class FaqModel {
    question: string;
    answer: string;
    id?: string;
    isOpened = false;
    constructor (question: string, answer: string, id?:string ) {
        this.question = question;
        this.answer = answer;
        if(id != null){
            this.id = id;
        }
    }
}