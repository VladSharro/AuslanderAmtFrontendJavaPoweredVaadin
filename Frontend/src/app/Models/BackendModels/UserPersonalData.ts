import { Expose, Transform } from "class-transformer"
import { PlaceOfResidence } from "./PlaceOfResidence"
import { Sex } from "./Sex"

export class UserPersonalData {
    @Expose()
    family_name: string
    @Expose()
    previous_names: string[]
    @Expose()
    first_name: string
    @Expose()
    date_of_birth: string
    @Expose()
    place_of_birth: string
    @Expose()
    nationalities: string[]
    @Expose()
    // @Transform(({value}) => mapSexToEnum(value))
    sex: Sex
    @Expose()
    place_of_residence_in_Germany: PlaceOfResidence

    constructor(
        firstName: string,
        previousNames: string[],
        familyName: string,
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
// function mapSexToEnum(value: number): Sex{
//     switch(value){
//         case 0:
//             return Sex.MALE
//         case 1:
//             return Sex.FEMALE
//         case 2:
//             return Sex.DIVERSITY

//         default:
//             return Sex.DIVERSITY
//     }
// }


