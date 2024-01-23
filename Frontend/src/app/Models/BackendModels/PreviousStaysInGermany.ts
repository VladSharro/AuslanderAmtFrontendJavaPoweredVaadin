import { Expose } from "class-transformer"

export class PreviousStaysInGermany {
    @Expose()
    from_date: string
    @Expose()
    to_date: string
    @Expose()
    place: string
    @Expose()
    distrinct: string
    @Expose()
    state: string
    @Expose()
    land: string

    constructor(
        fromDate: string,
        toDate: string,
        place: string,
        district: string,
        state: string,
        land: string
    ) {
        this.from_date = fromDate
        this.to_date = toDate
        this.place = place
        this.distrinct = district
        this.state = state
        this.land = land
    }
}
