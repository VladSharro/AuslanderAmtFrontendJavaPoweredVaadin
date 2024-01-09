import { Child } from "./Child"
import { DocumentModel } from "./DocumentModel"
import { FinancialDocument } from "./FinancialDocument"

export class Application{
    first_name = ''
    last_name = ''
    birth_date = ''
    sex_type = ''
    place_country = ''
    nationality = ''
    martial_type = ''
    since = ''
    eyes_color = ''
    height = 0
    mobile = ''
    email = ''

    passportFile: File | null = null;

    passportNr = ''
    valid_from = ''
    valid_to = ''
    issued_by = ''
    issued_on = ''

    ///////////////////////

    partnerLastName = ''
    partnerFirstName = ''
    partnerDateOfBirth = ''
    partnerPlaceOfBirth = ''
    partnerNationality = ''
    partnerSex = ''
    partnerCurrentResidenceInGermany = ''
    isChildrenAvailable = ''
    childern = [new Child()]
    isFatherApplicable = ''
    fatherLastName = ''
    fatherFisrtName = ''
    fatherNationality = ''
    fatherPlaceOfBirthForMinors = ''
    fatherDateOfBirthForMinors = ''
    fatherCurrentResidenceForMinors = ''
    isMotherApplicable = ''
    motherLastName = ''
    motherFisrtName = ''
    motherNationality = ''
    motherPlaceOfBirthForMinors = ''
    motherDateOfBirthForMinors = ''
    motherCurrentResidenceForMinors = ''

    //////////////////////

    registrationFile: File | null = null;
    enrollmentCertificateFile: File | null = null

    placeOfResidence = ''
    isPreviousStays = ''
    previousStayAddress = ''
    dateFrom = ''
    dateTo =''
    residenceAbroadIfRetained = ''
    isResidenceAbroadRetained = ''

    ////////////////////////

    visaFile: File | null = null;

    lastEntryDate = ''
    lastEntryVisaType = ''
    visaIssueBy = ''
    visaIssueOn = ''
    visaNumber = ''
    visaValidFrom = ''
    visaValidTo = ''
    lengthOfStay = ''
    purposeOfStay = ''

    ////////////////////////

    meansOfSupport = ''
    isSecondOrTwelfth = ''
    supportTyeIfYes = ''
    isInsuranceAvailable = ''
    insuranceCompany = ''
    finalValueOfFinancialSupport = 0


    financialSupportFiles: FinancialDocument[] = [];
    insuranceFile: File | null = null;


    ///////////////////////////////

    isConvicted = ''
    convictionPlace = ''
    convictionReason = ''
    convictionTypeAndamount = ''
    isUnderInvestigation = ''
    investigationPlace = ''
    investigationAuthority = ''
    isExpelledOrDeported = ''
    expelledFrom = ''
    expelledOn = ''
    isEntryApplicationRejected = ''
    entryRejectedFrom = ''
    entyRejectedOn = ''
    isResidenceApplicationRejected = ''
    residenceRejectedFrom = ''
    residenceRejectedOn = ''


    //////////////////////////////////


    photoFile: File |  null = null;


    ///////////////////////////////////

    additionalDocs = new Map<string, File>();



}