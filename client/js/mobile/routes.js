import { SVG } from './svg.js'; const _svg = new SVG();
import { TextBox, BubbleBox, ShowImage, UploadImg, HeadlineBox } from '../components/_Mobile.js';

import { API } from './api.js';
import { OUTPUT } from './output.js';
import { MENU } from './menu.js';
const d = document

export const routes = {

    start: async () => {

        // const data = {
        //     "Description": "The image depicts a construction or industrial site with piles of earth, a truck, and some machinery. The area appears to be in a rural or forested location.",
        //     "Compliance Risks": {
        //         "Recognized Risk": "",
        //         "Potential Risk": "Failure to comply with environmental regulations regarding land use, waste management, and emissions control.",
        //         "Finding": "The site appears to lack visible measures for managing waste and emissions, which may lead to non-compliance with environmental regulations.",
        //         "Action": "Conduct a thorough review of applicable environmental regulations and ensure that all necessary permits and compliance measures are in place. Implement waste management and emissions control protocols."
        //     },
        //     "Resource Depletion": {
        //         "Recognized Risk": "",
        //         "Potential Risk": "Excessive use of natural resources such as water and raw materials for construction.",
        //         "Finding": "The site shows signs of significant earth movement and potential resource use without visible conservation measures."
        //     },
        //     "Pollution and Emissions": {
        //         "Recognized Risk": "",
        //         "Potential Risk": "Soil and water contamination from construction activities and machinery emissions.",
        //         "Finding": "The site has exposed soil and machinery, which could lead to pollution if not properly managed."
        //     }
        // }


        const UploadImgForm = new UploadImg()
        d.querySelector('.img-box-upload').appendChild(UploadImgForm)

        new MENU()

        d.querySelector('.bubble-box-form').appendChild(new BubbleBox({
            header: 'Instruction',
            logo: 'info_circle',
            content: `<p>You can <span class="txt-hgh">asses a scenario</span> by choosing one of the following options</p>
            <p><span class="txt-hgh">Upload Image</span>: Click the &quot;clamp&quot; button to select an image from your device or shoot a new one</p>
            <p><span class="txt-hgh">Enter Image URL</span>: Paste the URL of an image into the designated field.</p>
            <p><span class="txt-hgh">Enter Text</span>: Type, speak or paste text directly into the input box to extract and recognize characters.</p>
            <p>Choose the method that works best for you to get started with text recognition and click send</p>`
        }))

        const sendBtn = d.querySelector('.upload-box-btn')

        UploadImgForm.imageUploadInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            UploadImgForm.inputField.placeholder = 'add optional context'
            UploadImgForm.handleInput()
            d.querySelector('.img-box-render').innerHTML = ''
            d.querySelector('.img-box-render').appendChild(new ShowImage({ file }))
        })

        sendBtn.addEventListener('click', async (e) => {
            const txtEntry = d.querySelector('.upload-box-input')
            const context = txtEntry.value
            const customSlider = d.querySelector('custom-slider[selected="1"]');
            const segment = customSlider.contentinit

            //d.querySelector('.render-info').appendChild(new HeadlineBox(`mode: ${segment}`))

            const _api = new API({ context, segment });

            const file = UploadImgForm.imageUploadInput.files[0]

            if (!file && (!context || context.length ===0)) {
                window.confirm("nothing to send");
                return
            }

            const output = new OUTPUT()

            const startTime = performance.now(); // Get start time
            UploadImgForm.spinnerToggle('on')
            let apiResponse

            if (file) {
                UploadImgForm.adjustInitTextarea()
                apiResponse = await _api.SEND_IMG(file)
                if (context.length > 0) output.addContext(context)
            }

            if (context.length > 0 && !file){//Send text only
                apiResponse = await _api.SEND_TXT(context)
            }

           const data = apiResponse.data.response
            
            // const data = {
            //     "Description": "The image depicts a construction or industrial site with piles of earth, a truck, and some machinery. The area appears to be in a rural or forested location.",
            //     "Compliance Risks": {
            //         "Recognized Risk": "",
            //         "Potential Risk": "Failure to comply with environmental regulations regarding land use, waste management, and emissions control.",
            //         "Finding": "The site appears to lack visible measures for managing waste and emissions, which may lead to non-compliance with environmental regulations.",
            //         "Action": "Conduct a thorough review of applicable environmental regulations and ensure that all necessary permits and compliance measures are in place. Implement waste management and emissions control protocols."
            //     },
            //     "Resource Depletion": {
            //         "Recognized Risk": "",
            //         "Potential Risk": "Excessive use of natural resources such as water and raw materials for construction.",
            //         "Finding": "The site shows signs of significant earth movement and potential resource use without visible conservation measures."
            //     },
            //     "Pollution and Emissions": {
            //         "Recognized Risk": "",
            //         "Potential Risk": "Soil and water contamination from construction activities and machinery emissions.",
            //         "Finding": "The site has exposed soil and machinery, which could lead to pollution if not properly managed."
            //     }
            // }
            output.render(data)

            UploadImgForm.spinnerToggle('off')
            //d.querySelector('.render-info').innerHTML = ''
            const endTime = performance.now(); // Get end time
            const executionTimeInSeconds = (endTime - startTime) / 1000; // Calculate execution time in seconds
            const roundedExecutionTime = executionTimeInSeconds.toFixed(2);
            d.querySelector('.bubble-box-form').appendChild(new TextBox(`execution time: ${roundedExecutionTime} seconds`))
        }, false);






        }
}


//As an internal auditor for ISO 27001, you are tasked with assessing the following scenario and providing a risk assessment score based on the Fine - Kinney\ncriteria:Scenario Description: { CONTEXT } \nProvide a concise, formal, and audit-like summary of the scenario. Rate the likelihood on a scale of low, medium, or high\nRisk Exposure: Assess the likelihood of the risk scenario occurring within the organization, considering historical data, industry trends, and internal factors.Rate the likelihood on a scale of low, medium, or high.\nLikelihood: Evaluate the feasibility of the risk scenario based on ease of exploitation or realization by potential threat actors.Consider factors like existing vulnerabilities, attacker capabilities, and effectiveness of current controls.Rate on a scale of low, medium, or high.\nConsequence: Estimate the potential financial impact of the risk scenario on the organization, considering both direct and indirect costs like data breaches, system downtime, regulatory fines, legal fees, and reputational damage.Rate on a scale of low, medium, or high.\nOverall Risk Assessment: Combine the individual ratings for Risk Exposure, Likelihood, and Consequence to calculate an overall risk score.Provide the overall risk score as only one word.\nProvide the result back as JSON.

//"As an internal auditor for ISO 27001, you are tasked with assessing the following scenario and providing a risk assessment score based on the criteria of fine-kinney:\n You will be provided with an image and the context of the items that are depicted in the image.\n Scenario Description: { CONTEXT } \n Give a concise, formal, and audit-like summary of the scenario\n Provide Risk Exposure, Likelihood and Consequence on a scale of low, medium, or high.\n Overall Risk Assessment being Risk Exposure x Likelihood x Consequence = Overall Risk Score as only one word\n Risk Exposure:\n Rate the likelihood of the risk scenario occurring within the organization.\n Consider historical data, industry trends, and internal factors that may influence the probability of occurrence.\n Assign a score to reflect the likelihood of the risk scenario on a scale of low, medium, or high.\n Likelihood:\n Evaluate the feasibility of the risk scenario based on the ease of exploitation or realization by potential threat actors.\n Consider factors such as the existence of vulnerabilities, attacker capabilities, and effectiveness of existing controls.\n Assign a score to reflect the feasibility of the risk scenario on a scale of low, medium, or high.\n Consequence: \n Estimate the potential financial impact of the risk scenario on the organization.\n Consider direct and indirect costs associated with data breaches, system downtime, regulatory fines, legal fees, and reputational damage.\n Assign a score to reflect the financial impact of the risk scenario on a scale of low, medium, or high.\n Overall Risk Assessment: \n Combine the individual ratings for Risk Exposure x Likelihood x Consequence to calculate an overall risk score.\n Consider the relative importance of each criterion and adjust the weighting accordingly.\n Give a concise, formal, and audit-like description of the assessed risk scenario.\nGive the result back as json."

//As an internal auditor for ISO 27001, you are tasked with assessing the following scenario and providing a risk assessment score based on the Fine-Kinney criteria:\nScenario Description: { CONTEXT } \nProvide a concise, formal, and audit-like summary of the scenario.Provide Risk Exposure, Likelihood and Consequence each on a scale of low, medium, or high.\nRisk Exposure: Assess the likelihood of the risk scenario occurring within the organization, considering historical data, industry trends, and internal factors.\nLikelihood: Evaluate the feasibility of the risk scenario based on ease of exploitation or realization by potential threat actors.Consider factors like existing vulnerabilities, attacker capabilities, and effectiveness of current controls.\nConsequence: Estimate the potential financial impact of the risk scenario on the organization, considering both direct and indirect costs like data breaches, system downtime, regulatory fines, legal fees, and reputational damage.\nOverall Risk Assessment: Combine the individual ratings for Risk Exposure, Likelihood, and Consequence to calculate an overall risk score.Provide the overall risk score as only one word.Provide the result back as JSON\n