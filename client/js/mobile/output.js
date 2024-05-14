import { BubbleBox, HeadlineBox, TextBox } from '../components/_Mobile.js';
const d = document

export class OUTPUT {

    constructor() {
    }

    addContext = (context) => {
        if (context) this.context = context
    }

    render = (data) => {
        if (!typeof data === 'object') {
            console.log('data is incorrect')
            d.querySelector('.bubble-box-form').appendChild(new HeadlineBox('incorrect data return'))
            return
        }

        d.querySelector('.bubble-box-form').innerHTML = ''

        let addtltag

        if (this.context) addtltag = this.context.split(/[ ,;]+/)

        Object.keys(data).map(a => {
            const content = data[a]

            switch (true) {
                case
                    a === 'Description' ||
                    a === 'Scenario Description':
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

                    if (content['Action']) {
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

    }
}