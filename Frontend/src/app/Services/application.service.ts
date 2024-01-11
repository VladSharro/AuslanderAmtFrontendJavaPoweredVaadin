import { Injectable } from '@angular/core';
import { Application } from '../Models/Application';
import { Child } from '../Models/Child';
import { BasicDataLabels } from '../Labels/basic_data_labels';
import { FinancialDocument } from '../Models/FinancialDocument';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor() { }

  private applicationData = new Application()
  private basicDataLabels = new BasicDataLabels()

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

  setFinancialDocumentsData(meansOfSupport: string, isSecondOrTwelfth: string, supportTyeIfYes: string, isInsuranceAvailable: string, insuranceCompany: string, finalValueOfFinancialSupport: number, financialSupportFiles: FinancialDocument[], insuranceFile: File | null){

    this.applicationData.meansOfSupport = meansOfSupport
    this.applicationData.isSecondOrTwelfth = isSecondOrTwelfth
    this.applicationData.supportTyeIfYes = supportTyeIfYes
    this.applicationData.isInsuranceAvailable = isInsuranceAvailable
    this.applicationData.insuranceCompany = insuranceCompany
    this.applicationData.finalValueOfFinancialSupport = finalValueOfFinancialSupport
    this.applicationData.financialSupportFiles = financialSupportFiles
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

  setPhotoData(photoFile: File | null){
    this.applicationData.photoFile = photoFile;
  }

  setAdditionalDocuments(additionalDocuments: Map<string, File>){
    this.applicationData.additionalDocs = additionalDocuments
  }
}
