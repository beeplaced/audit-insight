export class Content {
    constructor() {
        this.lang = 'de'
    }

    getSlider = (ident) => {

        const params = {
            audit_risk: () => {
                return { on: 'check Audits and generate Findings', off: 'check Audits and generate Findings' }
            },
            risk_score: () => {
                return { on: 'create Risk Score', off: 'create Risk Score' }
            }
        }

        return params[ident]()
    }

}