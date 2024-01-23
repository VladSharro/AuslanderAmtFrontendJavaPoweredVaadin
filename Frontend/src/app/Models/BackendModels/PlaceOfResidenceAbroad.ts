import { Expose } from "class-transformer"


export class PlaceOfResidenceAbroad {
    @Expose()
    country: string
    @Expose()
    postal_code: string
    @Expose()
    place: string
    @Expose()
    street: string
    @Expose()
    house_number: string


    constructor(
        country: string,
        postalCode: string,
        place: string,
        street: string,
        houseNumber: string
    ) {
        this.country = country
        this.postal_code = postalCode
        this.place = place
        this.street = street
        this.house_number = houseNumber
    }
}
