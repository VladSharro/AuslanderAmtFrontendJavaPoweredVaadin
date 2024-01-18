import { Location } from "./Location"

export class OffencesInfo {

    have_been_convicted_for_violating_law: boolean
    violating_location: string
    reason: string
    type_of_conviction: string
    under_investigation: boolean
    investigation_location: String
    investigation_authority: string
    have_been_deported: boolean
    deported_from: string
    deportation_date: string
    has_entry_application_been_rejected: boolean
    entry_application_rejected_from: string
    entry_application_rejected_date: string
    has_residence_application_been_rejected: boolean
    residence_application_rejected_from: string
    residence_application_rejected_date: string

    constructor(
        haveBeenConvictedForViolatingLaw: boolean,
        violatingLocation: string,
        reason: string,
        typeOfConviction: string,
        underInvestigation: boolean,
        investigationLocation: String,
        investigationAuthority: string,
        haveBeenDeported: boolean,
        deportedFrom: string,
        deportedDate: string,
        hasEntryApplicationBeenRejected: boolean,
        entryApplicationRejectedFrom: string,
        entryApplicationRejectedDate: string,
        hasResidenceApplicationBeenRejected: boolean,
        residenceApplicationRejectedFrom: string,
        residenceApplicationRejectedDate: string
    ) {
        this.have_been_convicted_for_violating_law = haveBeenConvictedForViolatingLaw
        this.violating_location = violatingLocation
        this.reason = reason
        this.type_of_conviction = typeOfConviction
        this.under_investigation = underInvestigation
        this.investigation_location = investigationLocation
        this.investigation_authority = investigationAuthority
        this.have_been_deported = haveBeenDeported
        this.deported_from = deportedFrom
        this.deportation_date = deportedDate
        this.has_entry_application_been_rejected = hasEntryApplicationBeenRejected
        this.entry_application_rejected_from = entryApplicationRejectedFrom
        this.entry_application_rejected_date = entryApplicationRejectedDate
        this.has_residence_application_been_rejected = hasResidenceApplicationBeenRejected
        this.residence_application_rejected_from = residenceApplicationRejectedFrom
        this.residence_application_rejected_date = residenceApplicationRejectedDate
    }

}
