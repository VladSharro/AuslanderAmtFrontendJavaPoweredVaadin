

export class PlaceOfResidenceAbroad {

    country: string
    postal_code: string
    place: string
    street: string
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
