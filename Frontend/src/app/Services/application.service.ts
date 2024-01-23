import { Injectable } from '@angular/core';
import { Application } from '../Models/Application';
import { Child } from '../Models/Child';
import { BasicDataLabels } from '../Labels/basic_data_labels';
import { FinancialDocument } from '../Models/FinancialDocument';
import { Sex } from '../Models/BackendModels/Sex';
import { PlaceOfResidence } from '../Models/BackendModels/PlaceOfResidence';
import { UserPersonalData } from '../Models/BackendModels/UserPersonalData';
import { MaritalStatus } from '../Models/BackendModels/MaritalStatus';
import { ColourOfEyes } from '../Models/BackendModels/ColourOfEyes';
import { PassportType } from '../Models/BackendModels/PassportType';
import { PreviousStaysInGermany } from '../Models/BackendModels/PreviousStaysInGermany';
import { PlaceOfResidenceAbroad } from '../Models/BackendModels/PlaceOfResidenceAbroad';
// import { file, forEach } from 'jszip';
import { PurposeOfStayInGermany } from '../Models/BackendModels/PurposeOfStayInGermany';
import { TrainingTypes } from '../Models/BackendModels/TrainingTypes';
import { JobSeekingType } from '../Models/BackendModels/JobSeekingType';
import { GainfulEmploymentType } from '../Models/BackendModels/GainfulEmploymentType';
import { ReasonsDefinedUnderInternationalLaw } from '../Models/BackendModels/ReasonsDefinedUnderInternationalLaw';
import { ApplicationForExhibitionType } from '../Models/BackendModels/ApplicationForExhibitionType';
import { FamilyReasonType } from '../Models/BackendModels/FamilyReasonType';
import { SpecialResidenceRightsType } from '../Models/BackendModels/SpecialResidenceRightsType';
import { BenefitsUnderSocialLaw } from '../Models/BackendModels/BenefitsUnderSocialLaw';
import { HealthInsuranceInfo } from '../Models/BackendModels/HealthInsuranceInfo';
import { OffencesInfo } from '../Models/BackendModels/OffencesInfo';
import { Location } from '../Models/BackendModels/Location';
import { ResidencePermitValidity } from '../Models/BackendModels/ResidencePermitValidity';
import { FinalForm } from '../Models/BackendModels/FinalForm';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor() { }
  
  private applicationData = new Application()
  private basicDataLabels = new BasicDataLabels()

  tempPassportFile: File | null = null
  tempVisaFile: File | null = null
  tempRegistrationFile: File | null = null
  tempEnrollment: File | null = null
  tempFinancial: FinancialDocument[] = []
  tempInsurance: File | null = null
  tempPhoto: File | null = null
  tempSignature : File | null = null
  tempAdditional = new Map<string, File>()


  setApplicationPassport(passport: File){
    this.applicationData.passportFile = passport
    this.tempPassportFile = passport
  }
  

  setApplicationVisa(visa: File){
    this.applicationData.visaFile = visa
    this.tempVisaFile = visa
  }

  setApplicationRegistration(registration: File){
    this.applicationData.registrationFile = registration
    this.tempRegistrationFile = registration
  }

  setApplicationEnrollment(enrollment: File){
    this.applicationData.enrollmentCertificateFile = enrollment
    this.tempEnrollment = enrollment
  }

  setApplicationFinancial(financial: FinancialDocument[]){
    this.applicationData.financialSupportFiles = financial
    this.tempFinancial = financial
  }

  setApplicationInsurance(insurance: File){
    this.applicationData.insuranceFile = insurance
    this.tempInsurance = insurance
  }

  setApplicationPhoto(photo: File){
    this.applicationData.photoFile = photo
    this.tempPhoto = photo
  }

  setApplicationSignature(signature: File){
    this.applicationData.signatureFile = signature
    this.tempSignature = signature
  }

  setApplicationAdittionalDocs(additionalDocs: Map<string, File>){
    this.applicationData.additionalDocs = additionalDocs
    this.tempAdditional = additionalDocs
    console.log(this.tempAdditional)

  }


  setApplicationType(isDownload: boolean){
    this.applicationData.isContinue = isDownload;
  }

  setApplicationData(application: Application){
    this.applicationData = application;
  }

  getApplicationData(){
    //console.log(this.applicationData)
    return this.applicationData;
  }

  setBasicdata(first_name: string, last_name: string, birth_date: string, sex_type: string, place_country: string, nationality: string, martial_type: string, since: string, eyes_color: string, height: number, mobile: string, email: string){

    this.applicationData.first_name = first_name
    this.applicationData.last_name = last_name
    this.applicationData.birth_date = birth_date
    this.applicationData.sex_type = sex_type
    this.applicationData.place_country = place_country
    this.applicationData.nationality = nationality
    this.applicationData.martial_type = martial_type
    this.applicationData.since = since
    this.applicationData.eyes_color = eyes_color
    this.applicationData.height = height
    this.applicationData.mobile = mobile
    this.applicationData.email = email

  }

  setPassportData(passportNr: string, valid_from: string, valid_to: string, issued_by: string, issued_on: string, passportFile: File | null){

    this.applicationData.passportNr = passportNr
    this.applicationData.valid_from = valid_from
    this.applicationData.valid_to = valid_to
    this.applicationData.issued_by = issued_by
    this.applicationData.issued_on = issued_on
    this.applicationData.passportFile = passportFile

  }

  setFamilyData(partnerLastName: string, partnerFirstName: string, partnerDateOfBirth: string, partnerPlaceOfBirth: string, partnerNationality: string, partnerSex: string, partnerCurrentResidenceInGermany: string,  isChildrenAvailable: string, childern: Child[], isFatherApplicable: string, fatherLastName: string, fatherFisrtName: string, fatherNationality: string, fatherPlaceOfBirthForMinors: string, fatherDateOfBirthForMinors: string, fatherCurrentResidenceForMinors: string, isMotherApplicable: string, motherLastName: string, motherFisrtName: string, motherNationality: string, motherPlaceOfBirthForMinors: string, motherDateOfBirthForMinors: string, motherCurrentResidenceForMinors: string){

    this.applicationData.partnerLastName = partnerLastName
    this.applicationData.partnerFirstName = partnerFirstName
    this.applicationData.partnerDateOfBirth = partnerDateOfBirth
    this.applicationData.partnerPlaceOfBirth = partnerPlaceOfBirth
    this.applicationData.partnerNationality = partnerNationality
    this.applicationData.partnerSex = partnerSex
    this.applicationData.partnerCurrentResidenceInGermany = partnerCurrentResidenceInGermany
    this.applicationData.isChildrenAvailable = isChildrenAvailable
    this.applicationData.childern = childern
    this.applicationData.isFatherApplicable = isFatherApplicable
    this.applicationData.fatherLastName = fatherLastName
    this.applicationData.fatherFisrtName = fatherFisrtName
    this.applicationData.fatherNationality = fatherNationality
    this.applicationData.fatherPlaceOfBirthForMinors = fatherPlaceOfBirthForMinors
    this.applicationData.fatherDateOfBirthForMinors = fatherDateOfBirthForMinors
    this.applicationData.fatherCurrentResidenceForMinors = fatherCurrentResidenceForMinors
    this.applicationData.isMotherApplicable = isMotherApplicable
    this.applicationData.motherLastName = motherLastName
    this.applicationData.motherFisrtName = motherFisrtName
    this.applicationData.motherNationality = motherNationality
    this.applicationData.motherPlaceOfBirthForMinors = motherPlaceOfBirthForMinors
    this.applicationData.motherDateOfBirthForMinors = motherDateOfBirthForMinors
    this.applicationData.motherCurrentResidenceForMinors = motherCurrentResidenceForMinors

  }

  isMinorWithFather(): boolean{
      if(this.applicationData.birth_date === ''){
      const dateObject = new Date(this.applicationData.birth_date);
      const year = dateObject.getFullYear();
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();

      if(currentYear -  year < 19){
        return true
      } 
      }
    
    return false;
  }

  isMinorWithMother(): boolean{
      if(this.applicationData.birth_date === ''){
      const dateObject = new Date(this.applicationData.birth_date);
      const year = dateObject.getFullYear();
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();

      if(currentYear -  year < 19){
        return true
      } 
    }

    return false;

  }

  isPartnerDataNeeded(): boolean{
    if(this.applicationData.martial_type === this.basicDataLabels.martial_options_married  || this.applicationData.martial_type === this.basicDataLabels.martial_options_registered){
      return true;
    }
    else{
      return false;
     }
  }

  setResidenceData(placeOfResidence: string, isPreviousStays: string, previousStayAddress: string, dateFrom: string, dateTo: string, residenceAbroadIfRetained: string, isResidenceAbroadRetained: string, registrationFile: File | null, enrollmentCertificateFile: File | null){
    
    this.applicationData.placeOfResidence  = placeOfResidence
    this.applicationData.isPreviousStays  = isPreviousStays
    this.applicationData.previousStayAddress  = previousStayAddress
    this.applicationData.dateFrom  = dateFrom
    this.applicationData.dateTo  = dateTo
    this.applicationData.residenceAbroadIfRetained  = residenceAbroadIfRetained
    this.applicationData.isResidenceAbroadRetained  = isResidenceAbroadRetained
    this.applicationData.registrationFile = registrationFile
    this.applicationData.enrollmentCertificateFile = enrollmentCertificateFile
  }

  setStayData(lastEntryDate: string, lastEntryVisaType: string, visaIssueBy: string, visaIssueOn: string, visaNumber: string, visaValidFrom: string, visaValidTo: string, lengthOfStay: string, purposeOfStay: string, visaFile: File | null){
    
    this.applicationData.lastEntryDate = lastEntryDate
    this.applicationData.lastEntryVisaType = lastEntryVisaType
    this.applicationData.visaIssueBy = visaIssueBy
    this.applicationData.visaIssueOn = visaIssueOn
    this.applicationData.visaNumber = visaNumber
    this.applicationData.visaValidFrom = visaValidFrom
    this.applicationData.visaValidTo = visaValidTo
    this.applicationData.lengthOfStay = lengthOfStay
    this.applicationData.purposeOfStay = purposeOfStay
    this.applicationData.visaFile = visaFile

  }

  setStayRenewalData(purposeOfStay: string, PurposeChanged: string){
    
    this.applicationData.purposeOfStay = purposeOfStay;
    this.applicationData.PurposeChanged = PurposeChanged;

  }

  setFinancialDocumentsData(meansOfSupport: string, isSecondOrTwelfth: string, supportTyeIfYes: string, isInsuranceAvailable: string, insuranceCompany: string, insuranceExpiryDate:string,finalValueOfFinancialSupport: number, financialSupportFiles: FinancialDocument[],noOfMonths: number , insuranceFile: File | null){

    this.applicationData.meansOfSupport = meansOfSupport
    this.applicationData.isSecondOrTwelfth = isSecondOrTwelfth
    this.applicationData.supportTyeIfYes = supportTyeIfYes
    this.applicationData.isInsuranceAvailable = isInsuranceAvailable
    this.applicationData.insuranceCompany = insuranceCompany
    this.applicationData.insuranceExpiryDate = insuranceExpiryDate
    this.applicationData.finalValueOfFinancialSupport = finalValueOfFinancialSupport
    this.applicationData.financialSupportFiles = financialSupportFiles
    this.applicationData.noOfMonths = noOfMonths;
    this.applicationData.insuranceFile = insuranceFile
    

  }

  setOffenceData(isConvicted: string, convictionPlace: string, convictionReason: string, convictionTypeAndamount: string, isUnderInvestigation: string, investigationPlace: string, investigationAuthority: string, isExpelledOrDeported: string, expelledFrom: string, expelledOn: string, isEntryApplicationRejected: string, entryRejectedFrom: string, entyRejectedOn: string, isResidenceApplicationRejected: string, residenceRejectedFrom: string,residenceRejectedOn: string){

    this.applicationData.isConvicted = isConvicted
    this.applicationData.convictionPlace = convictionPlace
    this.applicationData.convictionReason = convictionReason
    this.applicationData.convictionTypeAndamount = convictionTypeAndamount
    this.applicationData.isUnderInvestigation = isUnderInvestigation
    this.applicationData.investigationPlace = investigationPlace
    this.applicationData.investigationAuthority = investigationAuthority
    this.applicationData.isExpelledOrDeported = isExpelledOrDeported
    this.applicationData.expelledFrom = expelledFrom
    this.applicationData.expelledOn = expelledOn
    this.applicationData.isEntryApplicationRejected = isEntryApplicationRejected
    this.applicationData.entryRejectedFrom = entryRejectedFrom
    this.applicationData.entyRejectedOn = entyRejectedOn
    this.applicationData.isResidenceApplicationRejected = isResidenceApplicationRejected
    this.applicationData.residenceRejectedFrom = residenceRejectedFrom
    this.applicationData.residenceRejectedOn = residenceRejectedOn

  }

  setPhotoData(photoFile: File | null, signatureFile: File | null){
    this.applicationData.photoFile = photoFile;
    this.applicationData.signatureFile = signatureFile;
  }

  setAdditionalDocuments(additionalDocuments: Map<string, File>){
    this.applicationData.additionalDocs = additionalDocuments
    this.tempAdditional = additionalDocuments
  }

  generateDocumentsFrom(){
    if(this.applicationData.passportFile !=null){
      this.applicationData.additionalDocs.set("Passport", this.applicationData.passportFile)
    }
    if(this.applicationData.insuranceFile != null){
      this.applicationData.additionalDocs.set("insurance", this.applicationData.insuranceFile)

    }
    if(this.applicationData.visaFile != null){
      this.applicationData.additionalDocs.set("visa", this.applicationData.visaFile)
    }

    if(this.applicationData.photoFile != null){
      this.applicationData.additionalDocs.set("photo", this.applicationData.photoFile)
    }
    if(this.applicationData.enrollmentCertificateFile != null){
      this.applicationData.additionalDocs.set("enrollment", this.applicationData.enrollmentCertificateFile)
    }
    if(this.applicationData.registrationFile != null){
      this.applicationData.additionalDocs.set("registration", this.applicationData.registrationFile)
    }

    if(this.applicationData.financialSupportFiles.length > 0){
      let index = 1
      this.applicationData.financialSupportFiles.forEach( (doc) =>{
        if(doc.file != null){
          this.applicationData.additionalDocs.set(doc.fileType+index, doc.file)
          index ++
        }

      });
    }

    return this.applicationData.additionalDocs
  }

  generateFinalForm(){

    const firstName = this.applicationData.first_name
    const familyName = this.applicationData.last_name
    const birthDate = this.applicationData.birth_date
    const placeOfBirth = this.applicationData.place_country
    const nationalities = this.applicationData.nationality.split(" ")
    const sex = this.getSexEnum(this.applicationData.sex_type)
    
    const postalCode = ""
    const place= ""
    const street = this.applicationData.placeOfResidence
    const houseNumber = ""

    const placeOfResidenceInGermany = new PlaceOfResidence(postalCode, place, street, houseNumber)
    const userPersonalData = new UserPersonalData(firstName, [], familyName, birthDate, placeOfBirth, nationalities, sex, placeOfResidenceInGermany)
    const martialStatus = this.getMartialTypeEnum(this.applicationData.martial_type)
    const martialStatusSince = this.applicationData.since
    const eyesColor = this.getEyesColorEnum(this.applicationData.eyes_color).toString()
    const height = String(this.applicationData.height)
    const mobileNumber = this.applicationData.mobile
    const email = this.applicationData.email
    const passportType = PassportType.PASSPORT
    const customPassportType = ""
    const passportNumber = this.applicationData.passportNr
    const passportValidFrom = this.applicationData.valid_from
    const passpoerValidTo = this.applicationData.valid_to
    const issuedBy = this.applicationData.issued_by
    const issuedOn = this.applicationData.issued_on
    const isPreviousStaysInGermany = this.applicationData.isPreviousStays == "Yes" ? true : false
    const previousStayInGermany = new PreviousStaysInGermany(this.applicationData.dateFrom, this.applicationData.dateTo ,"","", this.applicationData.previousStayAddress, "")
    const isPlaceOfResidenceAbroadRetains = this.applicationData.isResidenceAbroadRetained == "Yes" ? true: false
    const placeOfResidenceAbroad = new PlaceOfResidenceAbroad(this.applicationData.residenceAbroadIfRetained, "", "", "", "")
    const partnerPersonalData = new UserPersonalData(this.applicationData.partnerLastName, [],  this.applicationData.partnerFirstName, this.applicationData.partnerDateOfBirth, this.applicationData.partnerPlaceOfBirth, this.applicationData.partnerNationality.split(" "), this.getSexEnum(this.applicationData.partnerSex), new PlaceOfResidence("", "", this.applicationData.partnerCurrentResidenceInGermany, ""))
    const childrenPersonalData: UserPersonalData[] = []

    this.applicationData.childern.forEach((child) => {
      const childPersonalData = new UserPersonalData(child.lastName, [], child.firstName, child.dateOfBirth, child.placeOfBirth, child.nationality.split(" "), this.getSexEnum(child.sex), new PlaceOfResidence("", "", child.currentPlaceOfResidence, ""))
      childrenPersonalData.push(childPersonalData)
    });
    const motherPersonalData = new UserPersonalData(this.applicationData.motherLastName, [], this.applicationData.motherFisrtName, this.applicationData.motherDateOfBirthForMinors, this.applicationData.motherPlaceOfBirthForMinors, this.applicationData.motherNationality.split(" "), this.getSexEnum("F"), new PlaceOfResidence("", "", this.applicationData.motherCurrentResidenceForMinors, ""))
    const fatherPersonalData = new UserPersonalData(this.applicationData.fatherLastName, [], this.applicationData.fatherFisrtName, this.applicationData.fatherDateOfBirthForMinors, this.applicationData.fatherPlaceOfBirthForMinors, this.applicationData.fatherNationality.split(" "), this.getSexEnum("F"), new PlaceOfResidence("", "", this.applicationData.fatherCurrentResidenceForMinors, ""))
    const purposeOfStayInGermany = new PurposeOfStayInGermany(true, this.applicationData.PurposeChanged)
    const trainingTypes = TrainingTypes.STUDIES
    const jobSeekingType = JobSeekingType.AFTER_COMPLETING_STUDIES
    const employer = ""
    const gainfulEmploymentType = GainfulEmploymentType.HIGHLY_QUALIFIED_PERSON
    const reasonsDefinedUnderInternationalLaw = ReasonsDefinedUnderInternationalLaw.ADMISSION_FROM_FOREIGN_COUNTRY
    const applicationForExhibitionType = ApplicationForExhibitionType.ID_CARD_REPLACEMENT
    const applicationForExhibitionsReason = ""
    const familyReasonType = FamilyReasonType.TO_JOIN_GERMAN_PARENTS
    const specialResidenceRightsType = SpecialResidenceRightsType.RESIDENCE_TITLE_FOR_FORMER_GERMANS
    const meansOfSupport = ""
    let needsBenefitsUnderSocialLaw = false
    const benefitsUnderSocialLaw = this.getBenefitsUnderSocialLawEnum(this.applicationData.isSecondOrTwelfth)
    
    const healthInsuranceInfo = new HealthInsuranceInfo(this.applicationData.isInsuranceAvailable == "Yes" ? true : false, this.applicationData.insuranceCompany)
    let convictedType =""
    let convicedAmount = ""
    if(this.applicationData.convictionTypeAndamount != ""){
      if(this.applicationData.convictionTypeAndamount.split(" ").length > 1){
        convicedAmount = this.applicationData.convictionTypeAndamount.split(" ")[1]
      }
      convictedType = this.applicationData.convictionTypeAndamount.split(" ")[0]
    }
    const offencesInfo = new OffencesInfo(this.applicationData.isConvicted == "Yes" ? true : false , this.getLocationEnum(this.applicationData.convictionReason).toString(), convictedType, convicedAmount, this.applicationData.isUnderInvestigation == "Yes" ? true : false, this.getLocationEnum(this.applicationData.investigationPlace).toString(), this.applicationData.investigationAuthority, this.applicationData.isExpelledOrDeported == "Yes" ? true : false, this.applicationData.expelledFrom, this.applicationData.expelledOn, this.applicationData.isEntryApplicationRejected == "Yes" ? true: false, this.applicationData.entryRejectedFrom, this.applicationData.entyRejectedOn, this.applicationData.isResidenceApplicationRejected == "Yes"? true : false, this.applicationData.residenceRejectedFrom, this.applicationData.residenceRejectedOn)
    const residencePermitValidity = new ResidencePermitValidity(0,0,0);
    const applicationPlace = "Passau"

    return new FinalForm(userPersonalData,martialStatus, martialStatusSince, eyesColor, height, mobileNumber, email,passportType, customPassportType, passportNumber, passportValidFrom, passpoerValidTo, issuedBy, issuedOn, isPreviousStaysInGermany, previousStayInGermany, isPlaceOfResidenceAbroadRetains, placeOfResidenceAbroad, partnerPersonalData, childrenPersonalData, motherPersonalData, fatherPersonalData, purposeOfStayInGermany, trainingTypes, jobSeekingType, employer, gainfulEmploymentType, reasonsDefinedUnderInternationalLaw, applicationForExhibitionType, applicationForExhibitionsReason, familyReasonType, specialResidenceRightsType, meansOfSupport, needsBenefitsUnderSocialLaw, benefitsUnderSocialLaw, healthInsuranceInfo, offencesInfo, residencePermitValidity, applicationPlace )
  }

  getSignature(){
    return this.applicationData.signatureFile
  }

  getLocationEnum(place: string){
    switch (place){
      case "In Germany":
        return Location.IN_GERMANY
      case "Abroad":
        return Location.ABROAD

      default:
        return Location.IN_GERMANY
    }
  }

  getBenefitsUnderSocialLawEnum(benefit: string){
    switch(benefit){
      case "Social welfare benefits":
        return BenefitsUnderSocialLaw.SOCIAL_WELFARE_BENEFIT
      case "Basic support for employment seekers (Unemployment Benefit Scheme II":
        return BenefitsUnderSocialLaw.BASIC_SUPPORT_FOR_EMPLOYMENT_SEEKERS
      default:
        return BenefitsUnderSocialLaw.SOCIAL_WELFARE_BENEFIT
    }
  }


  getEyesColorEnum(color: string){
    switch(color){
      case "blue":
        return ColourOfEyes.BLUE
      case "green":
        return ColourOfEyes.GREEN
      case "brown":
        return ColourOfEyes.BROWN
      case "grey":
        return ColourOfEyes.GREY
     
      default:
        return ColourOfEyes.BLUE
    }
  }

  getMartialTypeEnum(martialType: String){
    switch(martialType){
      case "single":
        return MaritalStatus.SINGLE
      case "Married":
        return MaritalStatus.MARRIED
      case "Living in registered partenership":
        return MaritalStatus.LIVING_IN_REGISTERED_PARTNERSHIP
      case "Divorced":
        return MaritalStatus.DIVORCED
      case "Widowed":
        return MaritalStatus.WIDOWED
      case "Separated":
        return MaritalStatus.SEPARATED
      default:
        return MaritalStatus.SINGLE
    }
  }

  getSexEnum(sex: string){
    switch (sex) {
      case "M":
        return Sex.MALE
      case "F":
          return Sex.FEMALE
      case "D":
        return Sex.DIVERSITY
      default:
        return Sex.DIVERSITY

    }
  }


}
