import { Expose } from "class-transformer"

export class ResidencePermitValidity {
    @Expose()
    days: number
    @Expose()
    months: number
    @Expose()
    years: number

    constructor(days: number, months: number, years: number) {
        this.days = days
        this.months = months
        this.years = years
    }

}
