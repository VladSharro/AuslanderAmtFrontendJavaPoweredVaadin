import { PlaceOfResidence } from "./PlaceOfResidence"
import { Sex } from "./Sex"

export class UserPersonalData {
    family_name: string
    previous_names: string[]
    first_name: string
    date_of_birth: string
    place_of_birth: string
    nationalities: string[]
    sex: Sex
    place_of_residence_in_Germany: PlaceOfResidence

    constructor(
        familyName: string,
        previousNames: string[],
        firstName: string,
        dateOfBirth: string, 
        placeOfBirth: string,
        nationalities: string [],
        sex: Sex,
        placeOfResidenceInGermany: PlaceOfResidence
    ) {
        this.family_name = familyName
        this.previous_names = previousNames
        this.first_name = firstName
        this.date_of_birth = dateOfBirth
        this.place_of_birth = placeOfBirth
        this.nationalities = nationalities
        this.sex = sex
        this.place_of_residence_in_Germany = placeOfResidenceInGermany
    }

}
