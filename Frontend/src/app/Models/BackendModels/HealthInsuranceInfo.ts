export class HealthInsuranceInfo {
   has_health_insurance: boolean
   insurer:string
     constructor(hasInsurance: boolean, insurer: string){
        this.insurer = insurer
        this.has_health_insurance = hasInsurance
     }
}
