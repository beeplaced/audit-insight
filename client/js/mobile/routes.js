import { SVG } from './svg.js'; const _svg = new SVG();
import { BubbleBox, ShowImage, UploadImg, RenderSelection, HeadlineBox, TextBox } from '../components/_Mobile.js';
import { SLIDER } from '../components/_Radio.js';
import { API } from './api.js';
const d = document

export const routes = {

    start: async () => {

        const UploadImgForm = new UploadImg()
        d.querySelector('.img-box-upload').appendChild(UploadImgForm)

        const RenderSelectionForm = new RenderSelection()

        const slider_1 = new SLIDER({ contentinit: 'audit_risk', selected: 1 })
        const slider_2 = new SLIDER({ contentinit: 'risk_score', selected: 0 })

        RenderSelectionForm.checkboxes.appendChild(slider_1)
        RenderSelectionForm.checkboxes.appendChild(slider_2)

        slider_1.addtl = () => {
            const attr = slider_1.getAttribute('selected')
            switch (true) {
                case attr === "1":
                    slider_2.deactivate();
                    break;
                default:
                    slider_2.activate();
                    break;
            }
        }

        slider_2.addtl = () => {
            const attr = slider_2.getAttribute('selected')
            switch (true) {
                case attr === "1":
                    slider_1.deactivate();
                    break;
                default:
                    slider_1.activate();
                    break;
            }
        }

        d.querySelector('.render-selection').appendChild(RenderSelectionForm)

        d.querySelector('.bubble-box-form').appendChild(new BubbleBox({
            header: 'Image-Text recognition',
            logo: 'info_circle',
            content: `<p>You can <span class="txt-hgh">asses a scenario</span> by choosing one of the following options</p>
            <p><span class="txt-hgh">Upload Image</span>: Click the &quot;clamp&quot; button to select an image from your device or shoot a new one</p>
            <p><span class="txt-hgh">Enter Image URL</span>: Paste the URL of an image into the designated field.</p>
            <p><span class="txt-hgh">Enter Text</span>: Type, speak or paste text directly into the input box to extract and recognize characters.</p>
            <p>Choose the method that works best for you to get started with text recognition and click send</p>`
        }))

        const sendBtn = d.querySelector('.upload-box-btn')

        UploadImgForm.imageUploadInput.addEventListener('change', async (e) => {
            const file = e.target.files[0]; // Get the selected file
            UploadImgForm.imgSelected.style.display = 'block'
            UploadImgForm.imgSelected.innerHTML = `${file.name}`
            UploadImgForm.inputField.placeholder = 'Context (optional)'
            UploadImgForm.handleInput()
            d.querySelector('.img-box-render').innerHTML = ''
            d.querySelector('.img-box-render').appendChild(new ShowImage({ file }))
        })

        sendBtn.addEventListener('click', async (e) => {
            const txtEntry = d.querySelector('.upload-box-input')
            const context = txtEntry.value || 'industrial setting'

            const file = UploadImgForm.imageUploadInput.files[0]
            if (!file){
                window.confirm("nothing to send");
                return
            }
            if (file) {
                const startTime = performance.now(); // Get start time

                UploadImgForm.spinnerToggle('on')
                UploadImgForm.adjustInitTextarea()
                const customSlider = document.querySelector('custom-slider[selected="1"]');
                const segment = customSlider.contentinit
                const _api = new API({ context, segment });
                const apiResponse = await _api.CALL(file)
                console.log("apiResponse", apiResponse)

                const data = apiResponse.data.response
                console.log("data", data)
                d.querySelector('.bubble-box-form').innerHTML = ''

                let addtltag

                if (context) addtltag = context.split(/[ ,;]+/)

                Object.keys(data).map(a => {
                    const content = data[a]

            switch (true) {
                case 
                a === 'Description' ||
                a === 'Scenario Description' :
                        d.querySelector('.bubble-box-form').appendChild(new BubbleBox({
                            header: 'summary',
                            logo: 'summary',
                            addtltag,
                            content
                        }))
                    break;

                case 
                a === 'Compliance Risks' || 
                a === 'Pollution and Emissions' ||
                a === 'Resource Depletion':

                    d.querySelector('.bubble-box-form').appendChild(new HeadlineBox(a))
                    
                    if (content['Recognized Risk'] || content['Recognized Risk'] !== '') {
                        d.querySelector('.bubble-box-form').appendChild(new BubbleBox({
                            header: 'Recognized Risk',
                            logo: 'r_risks',
                            addtltag,
                            content: content['Recognized Risk']
                        }))
                    }

                    if (content['Potential Risk']) {
                        d.querySelector('.bubble-box-form').appendChild(new BubbleBox({
                            header: 'Potential Risk',
                            logo: 'p_risks',
                            addtltag,
                            content: content['Potential Risk']
                        }))
                    }

                    if (content['Finding']) {
                        d.querySelector('.bubble-box-form').appendChild(new BubbleBox({
                            header: 'Finding',
                            logo: 'findings',
                            addtltag,
                            content: content['Finding']
                        }))
                    }

                    if (content['Action']){
                        d.querySelector('.bubble-box-form').appendChild(new BubbleBox({
                            header: 'Actions',
                            logo: 'findings',
                            addtltag,
                            content: content['Action']
                        }))
                    }

                break;

                default:
                    d.querySelector('.bubble-box-form').appendChild(new BubbleBox({
                        header: a,
                        logo: 'p_risks',
                        type: 'scores',
                        addtltag,
                        content
                    })) 
                    break;
            }
})
            UploadImgForm.spinnerToggle('off')

                const endTime = performance.now(); // Get end time

                const executionTimeInSeconds = (endTime - startTime) / 1000; // Calculate execution time in seconds

                const roundedExecutionTime = executionTimeInSeconds.toFixed(2);

                d.querySelector('.bubble-box-form').appendChild(new TextBox(`execution time: ${roundedExecutionTime} seconds`))
            }
        }, false);

        }
}


//As an internal auditor for ISO 27001, you are tasked with assessing the following scenario and providing a risk assessment score based on the Fine - Kinney\ncriteria:Scenario Description: { CONTEXT } \nProvide a concise, formal, and audit-like summary of the scenario. Rate the likelihood on a scale of low, medium, or high\nRisk Exposure: Assess the likelihood of the risk scenario occurring within the organization, considering historical data, industry trends, and internal factors.Rate the likelihood on a scale of low, medium, or high.\nLikelihood: Evaluate the feasibility of the risk scenario based on ease of exploitation or realization by potential threat actors.Consider factors like existing vulnerabilities, attacker capabilities, and effectiveness of current controls.Rate on a scale of low, medium, or high.\nConsequence: Estimate the potential financial impact of the risk scenario on the organization, considering both direct and indirect costs like data breaches, system downtime, regulatory fines, legal fees, and reputational damage.Rate on a scale of low, medium, or high.\nOverall Risk Assessment: Combine the individual ratings for Risk Exposure, Likelihood, and Consequence to calculate an overall risk score.Provide the overall risk score as only one word.\nProvide the result back as JSON.

//"As an internal auditor for ISO 27001, you are tasked with assessing the following scenario and providing a risk assessment score based on the criteria of fine-kinney:\n You will be provided with an image and the context of the items that are depicted in the image.\n Scenario Description: { CONTEXT } \n Give a concise, formal, and audit-like summary of the scenario\n Provide Risk Exposure, Likelihood and Consequence on a scale of low, medium, or high.\n Overall Risk Assessment being Risk Exposure x Likelihood x Consequence = Overall Risk Score as only one word\n Risk Exposure:\n Rate the likelihood of the risk scenario occurring within the organization.\n Consider historical data, industry trends, and internal factors that may influence the probability of occurrence.\n Assign a score to reflect the likelihood of the risk scenario on a scale of low, medium, or high.\n Likelihood:\n Evaluate the feasibility of the risk scenario based on the ease of exploitation or realization by potential threat actors.\n Consider factors such as the existence of vulnerabilities, attacker capabilities, and effectiveness of existing controls.\n Assign a score to reflect the feasibility of the risk scenario on a scale of low, medium, or high.\n Consequence: \n Estimate the potential financial impact of the risk scenario on the organization.\n Consider direct and indirect costs associated with data breaches, system downtime, regulatory fines, legal fees, and reputational damage.\n Assign a score to reflect the financial impact of the risk scenario on a scale of low, medium, or high.\n Overall Risk Assessment: \n Combine the individual ratings for Risk Exposure x Likelihood x Consequence to calculate an overall risk score.\n Consider the relative importance of each criterion and adjust the weighting accordingly.\n Give a concise, formal, and audit-like description of the assessed risk scenario.\nGive the result back as json."

//As an internal auditor for ISO 27001, you are tasked with assessing the following scenario and providing a risk assessment score based on the Fine-Kinney criteria:\nScenario Description: { CONTEXT } \nProvide a concise, formal, and audit-like summary of the scenario.Provide Risk Exposure, Likelihood and Consequence each on a scale of low, medium, or high.\nRisk Exposure: Assess the likelihood of the risk scenario occurring within the organization, considering historical data, industry trends, and internal factors.\nLikelihood: Evaluate the feasibility of the risk scenario based on ease of exploitation or realization by potential threat actors.Consider factors like existing vulnerabilities, attacker capabilities, and effectiveness of current controls.\nConsequence: Estimate the potential financial impact of the risk scenario on the organization, considering both direct and indirect costs like data breaches, system downtime, regulatory fines, legal fees, and reputational damage.\nOverall Risk Assessment: Combine the individual ratings for Risk Exposure, Likelihood, and Consequence to calculate an overall risk score.Provide the overall risk score as only one word.Provide the result back as JSON\n