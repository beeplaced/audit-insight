import { SVG } from './svg.js'; const _svg = new SVG();
import { BubbleBox, ShowImage, UploadImg, RenderSelection, HeadlineBox } from '../components/_Mobile.js';
import { SLIDER } from '../components/_Radio.js';
import { API } from './api.js';
const d = document

export const routes = {

    start: async () => {

        const UploadImgForm = new UploadImg()
        d.querySelector('.img-box-upload').appendChild(UploadImgForm)

        const RenderSelectionForm = new RenderSelection()

        const slider_1 = new SLIDER({ contentinit: 'audits_findings', selected: 1 })
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
                // console.log(UploadImgForm.inputField.value)
                // d.querySelector('.bubble-box-form').innerHTML = `send ${UploadImgForm.inputField.value} to server`
                let answer = window.confirm("nothing to send");
                if (answer) {
                } else {
                }
                return
            }
            if (file) {
                UploadImgForm.spinnerToggle('on')

                //UploadImgForm.inputField.value = ``
                UploadImgForm.adjustInitTextarea()

                const customSlider = document.querySelector('custom-slider[selected="1"]');
                const segment = customSlider.contentinit

                const _api = new API({ context, segment });
                const apiResponse = await _api.CALL(file)
                console.log("apiResponse", apiResponse)

                const data = apiResponse.data.response
                console.log("data", data)
                //d.querySelector('.img-box-render').innerHTML = ''
                d.querySelector('.bubble-box-form').innerHTML = ''

                // const { 
                //     summary, 
                //     recognized_risk, 
                //     potential_risk, 
                //     finding,
                //     frequency,
                //     impact,
                //     feasibility,
                //     risk_assessment
                // } = apiResponse



                let addtltag

                if (context){
                    addtltag = context.split(/[ ,;]+/)
                }

                Object.keys(data).map(a => {
                    const content = data[a]


switch (true) {
    case a === 'Description':
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
        break;
}


})


                



                // if (summary){
                //     d.querySelector('.bubble-box-form').appendChild(new BubbleBox({
                //         header: 'summary',
                //         logo: 'summary',
                //         content: summary
                //     }))
                // }

                // if (recognized_risk){
                //     d.querySelector('.bubble-box-form').appendChild(new BubbleBox({
                //         header: 'Recognized Risks',
                //         logo: 'risks',
                //         content: recognized_risk
                //     }))
                // }

                // if (potential_risk){
                //     d.querySelector('.bubble-box-form').appendChild(new BubbleBox({
                //         header: 'Potential Risks',
                //         logo: 'p_risks',
                //         content: potential_risk
                //     }))
                // }

                // if (finding){
                //     d.querySelector('.bubble-box-form').appendChild(new BubbleBox({
                //         header: 'Finding',
                //         logo: 'findings',
                //         content: finding
                //     }))
                // }

                // if (frequency) {
                //     d.querySelector('.bubble-box-form').appendChild(new BubbleBox({
                //         header: 'Frequency',
                //         logo: 'findings',
                //         content: frequency
                //     }))
                // }

                // if (impact) {
                //     d.querySelector('.bubble-box-form').appendChild(new BubbleBox({
                //         header: 'Impact',
                //         logo: 'findings',
                //         content: impact
                //     }))
                // }

                // if (feasibility) {
                //     d.querySelector('.bubble-box-form').appendChild(new BubbleBox({
                //         header: 'Feasibility',
                //         logo: 'findings',
                //         content: feasibility
                //     }))
                // }

                // if (risk_assessment) {
                //     d.querySelector('.bubble-box-form').appendChild(new BubbleBox({
                //         header: 'Risk Assessment Score',
                //         logo: 'findings',
                //         content: risk_assessment
                //     }))
                // }

                UploadImgForm.spinnerToggle('off')
            }
        }, false);

        }
}