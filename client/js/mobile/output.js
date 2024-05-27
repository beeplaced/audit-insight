import { BubbleBox, HeadlineBox, TextBox } from '../components/_Mobile.js';
const d = document

export class OUTPUT {

    constructor() {
    }

    addContext = (context) => {
        if (context) this.context = context
    }

    render = (data) => {
        console.log(data)
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
                        header: 'Summary',
                        logo: 'summary',
                        addtltag,
                        content
                    }))
                    break;

                    case 
                    a === 'Risk Scenarios':
                    d.querySelector('.bubble-box-form').appendChild(new HeadlineBox(`Risk Scenarios`))
                    content.map((c,i) => {

                        if (c['Description']) {
                            const header = c['Scenario'] ? `Risk Scenario | ${c['Scenario']}` : `Risk Scenario`
                            d.querySelector('.bubble-box-form').appendChild(new BubbleBox({
                                header,
                                logo: 'risks',
                                addtltag,
                                content: c['Description']
                            }))
                        }

                        if (c['Risk Score']) {
                            d.querySelector('.bubble-box-form').appendChild(new BubbleBox({
                                header: 'Risk Score',
                                logo: 'p_risks',
                                type: 'scores',
                                addtltag,
                                content: c['Risk Score']
                            }))
                        }
                        if (c['Norm reference']) {
                            d.querySelector('.bubble-box-form').appendChild(new BubbleBox({
                                header: 'Norm reference',
                                logo: 'risks',
                                addtltag,
                                content: c['Norm reference']
                            }))
                        }


                    })

                    console.log(content)
                    break;


                case
                    a === 'Compliance Risks' ||
                    a === 'Pollution and Emissions' ||
                    a === 'Resource Depletion':

                    d.querySelector('.bubble-box-form').appendChild(new HeadlineBox(a))

                    // if (content['Recognized Risk'] || content['Recognized Risk'] !== '') {
                    //     d.querySelector('.bubble-box-form').appendChild(new BubbleBox({
                    //         header: 'Recognized Risk',
                    //         logo: 'r_risks',
                    //         addtltag,
                    //         content: content['Recognized Risk']
                    //     }))
                    // }

                    if (content['Potential Risk']) {
                        d.querySelector('.bubble-box-form').appendChild(new BubbleBox({
                            header: 'Potential Risk',
                            logo: 'risks',
                            addtltag,
                            content: content['Potential Risk']
                        }))
                    }

                    if (content['Recommendation']) {
                        d.querySelector('.bubble-box-form').appendChild(new BubbleBox({
                            header: 'Recommendation',
                            logo: 'p_risks',
                            addtltag,
                            content: content['Recommendation']
                        }))
                    }

                    if (content['Root-Cause']) {
                        d.querySelector('.bubble-box-form').appendChild(new BubbleBox({
                            header: 'Root-Cause',
                            logo: 'p_risks',
                            addtltag,
                            content: content['Root-Cause']
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