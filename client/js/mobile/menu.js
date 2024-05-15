import { RenderSelection } from '../components/_Mobile.js';
import { SLIDER } from '../components/_Radio.js';
const d = document

export class MENU {

    constructor() {
        this.render()
    }

    render = () => {

        const RenderSelectionForm = new RenderSelection('What would you like to do?')

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

        const RenderSelectionForm_compress = new RenderSelection('Compress Images')

        class SetSlider extends SLIDER {
        }; customElements.define('compress-slider', SetSlider);

        const slider_compress = new SetSlider({ contentinit: 'compress_images', selected: 1 })

        RenderSelectionForm_compress.checkboxes.appendChild(slider_compress)
        d.querySelector('.render-selection').appendChild(RenderSelectionForm_compress)
    }
}