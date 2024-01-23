import { Expose } from "class-transformer"

export class PurposeOfStayInGermany {
    @Expose()
    is_changed: boolean
    @Expose()
    explanation: String

    constructor(isChanged: boolean, explanation: String) {
        this.is_changed = isChanged
        this.explanation = explanation
    }
}
