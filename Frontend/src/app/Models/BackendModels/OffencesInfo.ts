import { Expose } from "class-transformer"
import { Location } from "./Location"

export class OffencesInfo {
    @Expose()
    have_been_convicted_for_violating_law: boolean
    @Expose()
    violating_location: string
    @Expose()
    reason: string
    @Expose()
    type_of_conviction: string
    @Expose()
    under_investigation: boolean
    @Expose()
    investigation_location: String
    @Expose()
    investigation_authority: string
    @Expose()
    have_been_deported: boolean
    @Expose()
    deported_from: string
    @Expose()
    deportation_date: string
    @Expose()
    has_entry_application_been_rejected: boolean
    @Expose()
    entry_application_rejected_from: string
    @Expose()
    entry_application_rejected_date: string
    @Expose()
    has_residence_application_been_rejected: boolean
    @Expose()
    residence_application_rejected_from: string
    @Expose()
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
