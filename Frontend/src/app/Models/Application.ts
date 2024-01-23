import { Expose } from "class-transformer"
import { Child } from "./Child"
import { DocumentModel } from "./DocumentModel"
import { FinancialDocument } from "./FinancialDocument"

export class Application{
    isContinue = false;

    @Expose()
    first_name = ''
    @Expose()
    last_name = ''
    @Expose()
    birth_date = ''
    @Expose()
    sex_type = ''
    @Expose()
    place_country = ''
    @Expose()
    nationality = ''
    @Expose()
    martial_type = ''
    @Expose()
    since = ''
    @Expose()
    eyes_color = ''
    @Expose()
    height = 0
    @Expose()
    mobile = ''
    @Expose()
    email = ''

    passportFile: File | null = null;
    @Expose()
    passportNr = ''
    @Expose()
    valid_from = ''
    @Expose()
    valid_to = ''
    @Expose()
    issued_by = ''
    @Expose()
    issued_on = ''

    ///////////////////////
    @Expose()
    partnerLastName = ''
    @Expose()
    partnerFirstName = ''
    @Expose()
    partnerDateOfBirth = ''
    @Expose()
    partnerPlaceOfBirth = ''
    @Expose()
    partnerNationality = ''
    @Expose()
    partnerSex = ''
    @Expose()
    partnerCurrentResidenceInGermany = ''
    @Expose()
    isChildrenAvailable = ''
    @Expose()
    childern = [new Child()]
    @Expose()
    isFatherApplicable = ''
    @Expose()
    fatherLastName = ''
    @Expose()
    fatherFisrtName = ''
    @Expose()
    fatherNationality = ''
    @Expose()
    fatherPlaceOfBirthForMinors = ''
    @Expose()
    fatherDateOfBirthForMinors = ''
    @Expose()
    fatherCurrentResidenceForMinors = ''
    @Expose()
    isMotherApplicable = ''
    @Expose()
    motherLastName = ''
    @Expose()
    motherFisrtName = ''
    @Expose()
    motherNationality = ''
    @Expose()
    motherPlaceOfBirthForMinors = ''
    @Expose()
    motherDateOfBirthForMinors = ''
    @Expose()
    motherCurrentResidenceForMinors = ''
    @Expose()

    //////////////////////
    @Expose()
    registrationFile: File | null = null;
    enrollmentCertificateFile: File | null = null
    @Expose()
    placeOfResidence = ''
    @Expose()
    isPreviousStays = ''
    @Expose()
    previousStayAddress = ''
    @Expose()
    dateFrom = ''
    @Expose()
    dateTo =''
    @Expose()
    residenceAbroadIfRetained = ''
    @Expose()
    isResidenceAbroadRetained = ''

    ////////////////////////

    visaFile: File | null = null;
    @Expose()
    lastEntryDate = ''
    @Expose()
    lastEntryVisaType = ''
    @Expose()
    visaIssueBy = ''
    @Expose()
    visaIssueOn = ''
    @Expose()
    visaNumber = ''
    @Expose()
    visaValidFrom = ''
    @Expose()
    visaValidTo = ''
    @Expose()
    lengthOfStay = ''
    @Expose()
    purposeOfStay = ''
    @Expose()
    PurposeChanged = ''

    ////////////////////////

    meansOfSupport = ''
    @Expose()
    isSecondOrTwelfth = ''
    @Expose()
    supportTyeIfYes = ''
    @Expose()
    isInsuranceAvailable = ''
    @Expose()
    insuranceCompany = ''
    @Expose()
    insuranceExpiryDate = ''
    @Expose()
    finalValueOfFinancialSupport = 0
    @Expose()
    noOfMonths = 0


    financialSupportFiles: FinancialDocument[] = [];
    insuranceFile: File | null = null;


    ///////////////////////////////
    @Expose()
    isConvicted = ''
    @Expose()
    convictionPlace = ''
    @Expose()
    convictionReason = ''
    @Expose()
    convictionTypeAndamount = ''
    @Expose()
    isUnderInvestigation = ''
    @Expose()
    investigationPlace = ''
    @Expose()
    investigationAuthority = ''
    @Expose()
    isExpelledOrDeported = ''
    @Expose()
    expelledFrom = ''
    @Expose()
    expelledOn = ''
    @Expose()
    isEntryApplicationRejected = ''
    @Expose()
    entryRejectedFrom = ''
    @Expose()
    entyRejectedOn = ''
    @Expose()
    isResidenceApplicationRejected = ''
    @Expose()
    residenceRejectedFrom = ''
    @Expose()
    residenceRejectedOn = ''


    //////////////////////////////////


    photoFile: File |  null = null;
    signatureFile: File | null = null;


    ///////////////////////////////////

    additionalDocs = new Map<string, File>();



}