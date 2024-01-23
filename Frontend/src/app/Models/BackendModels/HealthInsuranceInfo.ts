import { Expose } from "class-transformer"

export class HealthInsuranceInfo {
   @Expose()
   has_health_insurance: boolean
   @Expose()
   insurer:string
     constructor(hasInsurance: boolean, insurer: string){
        this.insurer = insurer
        this.has_health_insurance = hasInsurance
     }
}
