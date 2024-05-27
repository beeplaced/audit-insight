import { SVG } from './svg.js'; const _svg = new SVG();
import { TextBox, BubbleBox, ShowImage, UploadImg, HeadlineBox } from '../components/_Mobile.js';
import { API } from './api.js';
import { IMAGECOMPRESS } from './compressor.js';
import { OUTPUT } from './output.js';
import { MENU } from './menu.js';
const d = document

export const routes = {

    start: async () => {

    //     const data = {
    //     "Description": "The image depicts a large pile of mixed construction and demolition waste, including wood, metal, and other materials, in an outdoor area. There is an excavator on top of the pile, indicating ongoing waste handling activities.",
    //         "Risk Scenarios": [
    //             {
    //                 "Scenario": "Unsegregated Waste",
    //                 "Description": "The waste appears to be unsegregated, which can lead to inefficient recycling and disposal processes.",
    //                 "Risk Score": "High - The lack of segregation can result in significant environmental impact and non-compliance with waste management regulations.",
    //                 "Norm reference": "ISO 14001:2015, Clause 8.1 - Operational Planning and Control"
    //             },
    //             {
    //                 "Scenario": "Potential for Contamination",
    //                 "Description": "Mixed waste can lead to contamination of recyclable materials, reducing the effectiveness of recycling efforts.",
    //                 "Risk Score": "Medium - Contamination can be mitigated with proper waste management practices, but the current state poses a moderate risk.",
    //                 "Norm reference": "ISO 14001:2015, Clause 8.2 - Emergency Preparedness and Response"
    //             },
    //             {
    //                 "Scenario": "Safety Hazards",
    //                 "Description": "The large, unorganized pile of waste poses safety hazards for workers, including the risk of injury from sharp objects or unstable materials.",
    //                 "Risk Score": "High - The physical hazards present a significant risk to worker safety.",
    //                 "Norm reference": "ISO 14001:2015, Clause 6.1.2 - Environmental Aspects"
    //             }
    //         ],
    //             "Finding": "There is clear evidence of unmanaged waste segregation and potential safety hazards.",
    //                 "Root Cause": "The underlying factors contributing to these deviations include inadequate waste management procedures, lack of training for workers on proper waste segregation, and insufficient safety protocols.",
    //                     "Risk Score": [
    //                         {
    //                             "Scenario": "Unsegregated Waste",
    //                             "Risk Score": "High - The lack of segregation can result in significant environmental impact and non-compliance with waste management regulations."
    //                         },
    //                         {
    //                             "Scenario": "Potential for Contamination",
    //                             "Risk Score": "Medium - Contamination can be mitigated with proper waste management practices, but the current state poses a moderate risk."
    //                         },
    //                         {
    //                             "Scenario": "Safety Hazards",
    //                             "Risk Score": "High - The physical hazards present a significant risk to worker safety."
    //                         }
    //                     ],
    //                         "Norm reference": [
    //                             {
    //                                 "Scenario": "Unsegregated Waste",
    //                                 "Norm reference": "ISO 14001:2015, Clause 8.1 - Operational Planning and Control"
    //                             },
    //                             {
    //                                 "Scenario": "Potential for Contamination",
    //                                 "Norm reference": "ISO 14001:2015, Clause 8.2 - Emergency Preparedness and Response"
    //                             },
    //                             {
    //                                 "Scenario": "Safety Hazards",
    //                                 "Norm reference": "ISO 14001:2015, Clause 6.1.2 - Environmental Aspects"
    //                             }
    //                         ]
    // }
        // const output = new OUTPUT()
        // output.render(data)
        // return
        
        //
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

        let file

        UploadImgForm.imageUploadInput.addEventListener('change', async (e) => {
            file = e.target.files[0];
            console.log(UploadImgForm.inputField.value)
            if (!UploadImgForm.inputField.value || UploadImgForm.inputField.value === ''){
            UploadImgForm.inputField.placeholder = 'add optional context'
            }
            //UploadImgForm.handleInput()
            d.querySelector('.img-box-render').innerHTML = ''
            d.querySelector('.img-box-render').appendChild(new ShowImage({ file }))
        })



        sendBtn.addEventListener('click', async (e) => {
            try {
            const txtEntry = d.querySelector('.upload-box-input')
            const context = txtEntry.value
            const customSlider = d.querySelector('custom-slider[selected="1"]');
            const segment = customSlider.contentinit
            let file = UploadImgForm.imageUploadInput.files[0]
                        

          
            const _api = new API({ context, segment });

            if (!file && (!context || context.length ===0)) {
                window.confirm("nothing to send");
                return
            }

            const output = new OUTPUT()
            const startTime = performance.now(); // Get start time
            UploadImgForm.spinnerToggle('on')
            let apiResponse

            if (file) {
                const size = file.size
                const compressSlider = d.querySelector('compress-slider');
                if (compressSlider.selected) {
                    const comp = new IMAGECOMPRESS(file)
                    file = await comp.compress()
                    if (size !== file.size) d.querySelector('[img_meta]').innerHTML += ` > ${comp.formatFileSize(file.size)}`
                }
                UploadImgForm.adjustInitTextarea()
                apiResponse = await _api.SEND_IMG(file)
                if (context.length > 0) output.addContext(context)
            }

            if (context.length > 0 && !file){//Send text only
                apiResponse = await _api.SEND_TXT(context)
            }

          const data = apiResponse.response
            
            // const data = {
            //             "Description": "The image shows a rusted metal container placed near a building with visible signs of wear and tear. There is also some visible dust or smoke in the air.",
            //                 "Compliance Risks": {
            //                 "Potential Risk": "Non-compliance with waste management regulations.",
            //                     "Finding": "The rusted container suggests improper maintenance and potential leakage of hazardous materials.",
            //                         "Root-Cause": "Lack of regular inspection and maintenance of waste containers.",
            //                             "Recommendation": "Implement a regular inspection and maintenance schedule for waste containers to ensure they are in good condition and compliant with regulations."
            //             },
            //             "Resource Depletion": {
            //                 "Potential Risk": "Increased resource consumption due to inefficient waste management.",
            //                     "Finding": "The deteriorated state of the container may lead to inefficient waste handling and increased resource use for repairs or replacements.",
            //                         "Root-Cause": "Neglect in maintaining waste management infrastructure.",
            //                             "Recommendation": "Invest in durable waste management infrastructure and establish a preventive maintenance program to extend the lifespan of equipment and reduce resource consumption."
            //             },
            //             "Pollution and Emissions": {
            //                 "Potential Risk": "Environmental contamination from potential leaks and emissions.",
            //                     "Finding": "The rust and potential leaks from the container can lead to soil and air contamination.",
            //                         "Root-Cause": "Failure to properly maintain and seal waste containers.",
            //                             "Recommendation": "Ensure all waste containers are properly sealed and maintained to prevent leaks. Conduct regular environmental monitoring to detect and address any contamination promptly."
            //             }
            //         }
  
            output.render(data)

            UploadImgForm.spinnerToggle('off')
            //d.querySelector('.render-info').innerHTML = ''
            const endTime = performance.now(); // Get end time
            const executionTimeInSeconds = (endTime - startTime) / 1000; // Calculate execution time in seconds
            const roundedExecutionTime = executionTimeInSeconds.toFixed(2);
            d.querySelector('.bubble-box-form').appendChild(new TextBox(`execution time: ${roundedExecutionTime} seconds`))
            } catch (error) {
                console.error(error)
                const errorMessage = encodeURIComponent(error.message);
              //  window.location.href = `/error?message=${errorMessage}`;
            }
        }, false);

        }
}


//As an internal auditor for ISO 27001, you are tasked with assessing the following scenario and providing a risk assessment score based on the Fine - Kinney\ncriteria:Scenario Description: { CONTEXT } \nProvide a concise, formal, and audit-like summary of the scenario. Rate the likelihood on a scale of low, medium, or high\nRisk Exposure: Assess the likelihood of the risk scenario occurring within the organization, considering historical data, industry trends, and internal factors.Rate the likelihood on a scale of low, medium, or high.\nLikelihood: Evaluate the feasibility of the risk scenario based on ease of exploitation or realization by potential threat actors.Consider factors like existing vulnerabilities, attacker capabilities, and effectiveness of current controls.Rate on a scale of low, medium, or high.\nConsequence: Estimate the potential financial impact of the risk scenario on the organization, considering both direct and indirect costs like data breaches, system downtime, regulatory fines, legal fees, and reputational damage.Rate on a scale of low, medium, or high.\nOverall Risk Assessment: Combine the individual ratings for Risk Exposure, Likelihood, and Consequence to calculate an overall risk score.Provide the overall risk score as only one word.\nProvide the result back as JSON.

//"As an internal auditor for ISO 27001, you are tasked with assessing the following scenario and providing a risk assessment score based on the criteria of fine-kinney:\n You will be provided with an image and the context of the items that are depicted in the image.\n Scenario Description: { CONTEXT } \n Give a concise, formal, and audit-like summary of the scenario\n Provide Risk Exposure, Likelihood and Consequence on a scale of low, medium, or high.\n Overall Risk Assessment being Risk Exposure x Likelihood x Consequence = Overall Risk Score as only one word\n Risk Exposure:\n Rate the likelihood of the risk scenario occurring within the organization.\n Consider historical data, industry trends, and internal factors that may influence the probability of occurrence.\n Assign a score to reflect the likelihood of the risk scenario on a scale of low, medium, or high.\n Likelihood:\n Evaluate the feasibility of the risk scenario based on the ease of exploitation or realization by potential threat actors.\n Consider factors such as the existence of vulnerabilities, attacker capabilities, and effectiveness of existing controls.\n Assign a score to reflect the feasibility of the risk scenario on a scale of low, medium, or high.\n Consequence: \n Estimate the potential financial impact of the risk scenario on the organization.\n Consider direct and indirect costs associated with data breaches, system downtime, regulatory fines, legal fees, and reputational damage.\n Assign a score to reflect the financial impact of the risk scenario on a scale of low, medium, or high.\n Overall Risk Assessment: \n Combine the individual ratings for Risk Exposure x Likelihood x Consequence to calculate an overall risk score.\n Consider the relative importance of each criterion and adjust the weighting accordingly.\n Give a concise, formal, and audit-like description of the assessed risk scenario.\nGive the result back as json."

//As an internal auditor for ISO 27001, you are tasked with assessing the following scenario and providing a risk assessment score based on the Fine-Kinney criteria:\nScenario Description: { CONTEXT } \nProvide a concise, formal, and audit-like summary of the scenario.Provide Risk Exposure, Likelihood and Consequence each on a scale of low, medium, or high.\nRisk Exposure: Assess the likelihood of the risk scenario occurring within the organization, considering historical data, industry trends, and internal factors.\nLikelihood: Evaluate the feasibility of the risk scenario based on ease of exploitation or realization by potential threat actors.Consider factors like existing vulnerabilities, attacker capabilities, and effectiveness of current controls.\nConsequence: Estimate the potential financial impact of the risk scenario on the organization, considering both direct and indirect costs like data breaches, system downtime, regulatory fines, legal fees, and reputational damage.\nOverall Risk Assessment: Combine the individual ratings for Risk Exposure, Likelihood, and Consequence to calculate an overall risk score.Provide the overall risk score as only one word.Provide the result back as JSON\n

// {
//     "message": "no context",
//         "response": {
//         "Compliance Risks": {
//             "Potential Risk": "Non-compliance with waste management regulations",
//                 "Finding": "Large amounts of wood waste are stored in an open area without clear containment measures.",
//                     "Root-Cause": "Lack of proper waste management protocols and containment facilities.",
//                         "Recommendation": "Implement proper containment and storage protocols for wood waste to prevent environmental contamination and ensure compliance with local waste management regulations."
//         },
//         "Resource Depletion": {
//             "Potential Risk": "Inefficient use of resources leading to depletion",
//                 "Finding": "The facility appears to be processing a significant amount of wood waste, which may indicate inefficient use of wood resources.",
//                     "Root-Cause": "Potential lack of resource optimization and recycling strategies.",
//                         "Recommendation": "Conduct a resource efficiency audit to identify opportunities for reducing wood waste and improving recycling and reuse practices."
//         },
//         "Pollution and Emissions": {
//             "Potential Risk": "Air and soil pollution from wood waste processing",
//                 "Finding": "The open storage and processing of wood waste can lead to dust and particulate emissions, as well as potential soil contamination.",
//                     "Root-Cause": "Inadequate dust control measures and lack of proper containment for wood waste.",
//                         "Recommendation": "Install dust control systems and ensure proper containment of wood waste to minimize air and soil pollution. Regularly monitor emissions to ensure compliance with environmental standards."
//         }
//     }
// }
//old
// {
//     "message": "no context",
//         "response": {
//         "Description": "The image depicts a facility with a large amount of wood waste and debris being processed by machinery.",
//             "Compliance Risks": {
//             "Recognized Risk": "",
//                 "Potential Risk": "Failure to comply with waste management regulations and proper disposal of wood waste.",
//                     "Finding": "The facility may not be adhering to local and national regulations regarding the handling and disposal of wood waste.",
//                         "Action": "Conduct a thorough review of waste management practices and ensure compliance with all relevant environmental regulations."
//         },
//         "Resource Depletion": {
//             "Recognized Risk": "",
//                 "Potential Risk": "Excessive use of energy and resources in the processing of wood waste.",
//                     "Finding": "The facility's operations may lead to significant consumption of energy and other resources, impacting sustainability."
//         },
//         "Pollution and Emissions": {
//             "Recognized Risk": "",
//                 "Potential Risk": "Release of dust, particulate matter, and other pollutants during the processing of wood waste.",
//                     "Finding": "The facility's activities may contribute to air pollution and environmental contamination if not properly managed."
//         }
//     }
// }