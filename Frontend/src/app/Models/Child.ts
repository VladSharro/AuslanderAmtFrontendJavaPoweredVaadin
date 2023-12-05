export class Child {
    lastName = '';
    firstName = '';
    sex = '';
    dateOfBirth = '';
    placeOfBirth = '';
    nationality = '';
    currentPlaceOfResidence = '';

    constructor(child: Child);
    constructor();
    constructor(child?: Child) {
        if (child) {
            this.firstName = child.firstName;
            this.lastName = child.lastName;
            this.sex = child.sex;
            this.dateOfBirth = child.dateOfBirth;
            this.placeOfBirth = child.placeOfBirth;
            this.nationality = child.nationality;
            this.currentPlaceOfResidence = child.currentPlaceOfResidence;
        }
        // Additional initialization for the empty constructor can go here if needed.
    }
}
