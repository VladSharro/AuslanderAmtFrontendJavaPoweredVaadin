
export class PlaceOfResidence {

    postal_code: string
    place: string
    street: string
    house_number: string
    constructor(
        postalCode: string,
        place: string,
        street: string,
        houseNumber: string
    ) {
        this.postal_code = postalCode
        this.place = place
        this.street = street
        this.house_number = houseNumber
    }


}
