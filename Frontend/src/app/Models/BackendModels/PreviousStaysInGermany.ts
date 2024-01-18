
export class PreviousStaysInGermany {

    from_date: string
    to_date: string
    place: string
    distrinct: string
    state: string
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
