import { ApplicationForExhibitionType } from "./ApplicationForExhibitionType";
import { BenefitsUnderSocialLaw } from "./BenefitsUnderSocialLaw";
import { ColourOfEyes } from "./ColourOfEyes";
import { FamilyReasonType } from "./FamilyReasonType";
import { GainfulEmploymentType } from "./GainfulEmploymentType";
import { HealthInsuranceInfo } from "./HealthInsuranceInfo";
import { JobSeekingType } from "./JobSeekingType";
import { MaritalStatus } from "./MaritalStatus";
import { OffencesInfo } from "./OffencesInfo";
import { PassportType } from "./PassportType";
import { PlaceOfResidenceAbroad } from "./PlaceOfResidenceAbroad";
import { PreviousStaysInGermany } from "./PreviousStaysInGermany";
import { PurposeOfStayInGermany } from "./PurposeOfStayInGermany";
import { ReasonsDefinedUnderInternationalLaw } from "./ReasonsDefinedUnderInternationalLaw";
import { ResidencePermitValidity } from "./ResidencePermitValidity";
import { SpecialResidenceRightsType } from "./SpecialResidenceRightsType";
import { TrainingTypes } from "./TrainingTypes";
import { UserPersonalData } from "./UserPersonalData";

export class FinalForm {

    personal_data: UserPersonalData
    marital_status: string
    marital_status_since: String
    colour_of_eyes: string
    height: String
    mobile_number: String
    email: String
    passport_type: string
    custom_passport_type: String
    passport_number: String
    valid_from: String
    valid_till: String
    issued_by: String
    issued_on: String
    is_previous_stays_in_Germany: Boolean
    previous_stays_in_Germany: PreviousStaysInGermany
    is_place_of_residence_abroad_retains: Boolean
    place_of_residence_abroad: PlaceOfResidenceAbroad
    partner_personal_data: UserPersonalData
    children_personal_data: UserPersonalData[]
    mother_personal_data: UserPersonalData
    father_personal_data: UserPersonalData
    purpose_of_stay_in_Germany: PurposeOfStayInGermany
    training_type : string
    job_seeking_type: string
        employer: String
        gainful_employment: string
        reasons_defined_under_international_law: string
        application_for_exhibitions_type: string
        application_for_exhibitions_reason: String
        family_reason: string
        special_residence_right: string
        means_of_support: String
        needs_benefit_under_social_law: Boolean
        benefit_under_social_law: string
        health_insurance_info: HealthInsuranceInfo
        offences_info: OffencesInfo
        residence_permit_validity: ResidencePermitValidity
        application_place: String


    constructor(
        personalData: UserPersonalData,
        maritalStatus: MaritalStatus,
        maritalStatusSince: String,
        colourOfEyes: String,
        height: String,
        mobileNumber: String,
        email: String,
        passportType: PassportType,
        customPassportType: String,
        passportNumber: String,
        validFrom: String,
        validTill: String,
        issuedBy: String,
        issuedOn: String,
        isPreviousStaysInGermany: Boolean,
        previousStaysInGermany: PreviousStaysInGermany,
        isPlaceOfResidenceAbroadRetains: Boolean,
        placeOfResidenceAbroad: PlaceOfResidenceAbroad,
        partnerPersonalData: UserPersonalData,
        childrenPersonalData: UserPersonalData[],
        motherPersonalData: UserPersonalData,
        fatherPersonalData: UserPersonalData,
        purposeOfStayInGermany: PurposeOfStayInGermany,
        trainingTypes: TrainingTypes,
        jobSeekingType: JobSeekingType,
        employer: String,
        gainfulEmploymentType: GainfulEmploymentType,
        reasonsDefinedUnderInternationalLaw: ReasonsDefinedUnderInternationalLaw,
        applicationForExhibitionType: ApplicationForExhibitionType,
        applicationForExhibitionsReason: String,
        familyReasonType: FamilyReasonType,
        specialResidenceRightsType: SpecialResidenceRightsType,
        meansOfSupport: String,
        needsBenefitsUnderSocialLaw: Boolean,
        benefitsUnderSocialLaw: BenefitsUnderSocialLaw,
        healthInsuranceInfo: HealthInsuranceInfo,
        offencesInfo: OffencesInfo,
        residencePermitValidity: ResidencePermitValidity,
        applicationPlace: String
    ) {
        this.personal_data = personalData
        this.marital_status = maritalStatus.toString()
        this.marital_status_since = maritalStatusSince
        this.colour_of_eyes = colourOfEyes.toString()
        this.height = height
        this.mobile_number = mobileNumber
        this.email = email
        this.passport_type = passportType.toString()
        this.custom_passport_type = customPassportType
        this.passport_number = passportNumber
        this.valid_from = validFrom
        this.valid_till = validTill
        this.issued_by = issuedBy
        this.issued_on = issuedOn
        this.is_previous_stays_in_Germany = isPreviousStaysInGermany
        this.previous_stays_in_Germany = previousStaysInGermany
        this.is_place_of_residence_abroad_retains = isPlaceOfResidenceAbroadRetains
        this.place_of_residence_abroad = placeOfResidenceAbroad
        this.partner_personal_data = partnerPersonalData
        this.children_personal_data = childrenPersonalData
        this.mother_personal_data = motherPersonalData
        this.father_personal_data = fatherPersonalData
        this.purpose_of_stay_in_Germany = purposeOfStayInGermany
        this.training_type = trainingTypes.toString()
        this.job_seeking_type = jobSeekingType.toString()
        this.employer = employer
        this.gainful_employment = gainfulEmploymentType.toString()
        this.reasons_defined_under_international_law = reasonsDefinedUnderInternationalLaw.toString()
        this.application_for_exhibitions_type = applicationForExhibitionType.toString()
        this.application_for_exhibitions_reason = applicationForExhibitionsReason.toString()
        this.family_reason = familyReasonType.toString()
        this.special_residence_right = specialResidenceRightsType.toString()
        this.means_of_support = meansOfSupport
        this.needs_benefit_under_social_law = needsBenefitsUnderSocialLaw
        this.benefit_under_social_law = benefitsUnderSocialLaw.toString()
        this.health_insurance_info = healthInsuranceInfo
        this.offences_info = offencesInfo
        this.residence_permit_validity = residencePermitValidity
        this.application_place = applicationPlace
    } 
}