import { COMPONENTS } from './_Base.js';
import { SVG } from '../mobile/svg.js'; const _svg = new SVG();
import { API } from '../mobile/api.js';


export class ActionBar extends COMPONENTS {

    constructor() {
        super();
        this.render()
    }

    render() {
        this.innerHTML = ''
    }
}; customElements.define('action-bar', ActionBar);

export class AnswerBox extends COMPONENTS {

    constructor(route) {
        super();
        this.render(route)
    }

    render(route) {
        let c = this.divc({ class: 'bubble-box-logo' })
        c += this.divc({ class: '_t bubble-box-headline', content: "How many chemicals do you have in your repository?" })
        c += this.divc({
            class: '_t bubble-box-txt', content: "If you say there is an explanation for something, you mean that there is a reason for it. The deputy airport manager said there was no apparent explanation for the crash. [+ for] Scientific explanations for natural phenomena are widely accepted. It's the only explanation for these results. "
        })
        this.innerHTML = c
        this.logo = this.querySelector('.bubble-box-logo')
        this.logo.appendChild(document.createRange().createContextualFragment(_svg.idea()))
    }
}; customElements.define('answer-box', AnswerBox);

export class HeadlineBox extends COMPONENTS {

    constructor(input) {
        super();
        this.render(input)
    }

    render(input) {
        let c = this.divorow({ class: 'headline-box' })
        c += this.divc({ class: '_t', content: input })
        c += this.end(1)
        this.innerHTML = c
    }
}; customElements.define('headline-box', HeadlineBox);

export class TextBox extends COMPONENTS {

    constructor(input) {
        super();
        this.render(input)
    }

    render(input) {
        let c = this.divorow({ class: 'text-box' })
        c += this.divc({ class: '_t', content: input })
        c += this.end(1)
        this.innerHTML = c
    }
}; customElements.define('text-box', TextBox);

export class BubbleBox extends COMPONENTS {

    constructor(input) {
        super();
        this.type = input.type || 'default'
        if (input.addtltag) this.addtltag = input.addtltag
        this.render(input)
    }

    highlightWords (text) {

        let highlightedString = ''
        let tags
        let escapedTags;
        let regex;

        switch (this.type) {

            case "scores":
                tags = ["low", "medium", "high"]; // Array of tags to highlight
                escapedTags = tags.map(tag => tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
                regex = new RegExp(`\\b(${escapedTags.join('|')})\\b`, 'gi');
                let currentIndex = 0;
                let match;

                // Find all matches in the text
                while ((match = regex.exec(text)) !== null) {
                    const matchedWord = match[0];
                    const tagIndex = tags.findIndex(tag => tag.toLowerCase() === matchedWord.toLowerCase());

                    if (tagIndex !== -1) {
                        const beforeText = text.substring(currentIndex, match.index);
                        const highlightedWord = `<span class="highlight-${tagIndex}">${matchedWord}</span>`;

                        highlightedString += beforeText + highlightedWord;
                        currentIndex = match.index + matchedWord.length;
                    }
                }

                // Append remaining text after the last match
                highlightedString += text.substring(currentIndex);
                break;
        
            default:
                tags = [
                    "waste",
                    "debris",
                    "wear",
                    "environmental",
                    "management",
                    "water",
                    "chemicals",
                    "hazardous",
                    "inspections",
                    "compliance",
                    "safety",
                    "spills",
                    "leaks",
                    "recycling",
                    "pollution",
                    "contamination",
                    "disposal",
                    "regulations",
                    "ecology",
                    "sustainability",
                    "clean-up",
                    "wastewater",
                    "toxic",
                    "hazard",
                    "protection",
                    "environment",
                    "monitoring",
                    "biodegradable",
                    "reduction"
                ];
                if (this.addtltag && Array.isArray(this.addtltag)) {
                    tags = [...tags, ...this.addtltag];
                }
                
                escapedTags = tags.map(tag => tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
                regex = new RegExp(`\\b(${escapedTags.join('|')})\\b`, 'gi');
                highlightedString = text.replace(regex, '<span class="highlight">$&</span>');
                break;
        }

        return highlightedString
    }

    render(input) {
        const { header, content, logo } = input
        let c = this.divc({ class: 'bubble-box-logo' })
        c += this.divc({ class: '_t bubble-box-headline', content: header })
        c += this.divc({
            class: '_t bubble-box-txt', content: this.highlightWords(content)
        })
        this.innerHTML = c
        this.logo = this.querySelector('.bubble-box-logo')
        this.logo.appendChild(document.createRange().createContextualFragment(_svg[logo]()))
    }
}; customElements.define('bubble-box', BubbleBox);

export class ShowImage extends COMPONENTS {

    constructor(input) {
        super();
        this.render(input)
    }

    formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';

    const sizes = ['bytes', 'kb', 'mb', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const formattedSize = parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];

    return formattedSize;
}

    formatUnixTimestampToGermanDate = (timestamp) => {
    // Create a new Date object using the provided timestamp
    const date = new Date(timestamp);

    // Options for formatting the date in German locale
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Europe/Berlin' // Optional: Set the time zone to Berlin (Central European Time)
    };

    // Format the date string in German locale
    const formattedDate = date.toLocaleString('de-DE', options);

    return formattedDate;
}

    render(input) {
        const { file } = input
        console.log(file)
        const that = this
        const reader = new FileReader();
        reader.onload = function (event) {
            const imageUrl = event.target.result;

        // URL of the image you want to show
        // const imageUrl = 'https://beeplaced.github.io/DSCF0018.JPG'; // Replace this with your image URL
        
            const meta = `${that.formatUnixTimestampToGermanDate(file.lastModified)} | ${that.formatFileSize(file.size)}`

            // Extract GPS coordinates if available
            // const exifData = EXIF.getData(file); 
            // console.log(exifData)
            // const gpsInfo = exifData ? exifData.gps : null;

            // if (gpsInfo) {
            //     const latitude = gpsInfo.GPSLatitude;
            //     const longitude = gpsInfo.GPSLongitude;
            //     const altitude = gpsInfo.GPSAltitude;

            //     console.log('GPS Latitude:', formatGPS(latitude));
            //     console.log('GPS Longitude:', formatGPS(longitude));
            //     console.log('GPS Altitude:', altitude + ' meters above sea level');
            // } else {
            //     console.log('No GPS data found in the image.');
            // }


            let imgBox = that.divocol({ class: 'img-box' })
            imgBox += that.divc({ class: 'img-box-img' })
            imgBox += that.divc({ class: '_t img-box-text img-box-text-title', content: file.name })
            imgBox += that.divc({ class: '_t img-box-text', content: meta })
            imgBox += that.end(1)

            that.innerHTML = imgBox
        // Create a new <img> element
        const imgElement = document.createElement('img');

        // Set the 'src' attribute of the <img> element to the image URL
        imgElement.src = imageUrl;
            that.imgBox = that.querySelector('.img-box-img')
            that.imgBox.appendChild(imgElement);
        }
        reader.readAsDataURL(file);
    }
}; customElements.define('img-box', ShowImage);

export class RenderSelection extends COMPONENTS {
    constructor(input) {
        super();
        this.render()
    }

    render() {

        let box = this.divc({ class: 'headline', content: 'What would you like to do?'})
        box += this.divc({ class: 'checkboxes' })
        this.innerHTML = box

        this.checkboxes = this.querySelector('.checkboxes')


    }

}; customElements.define('render-selection-box', RenderSelection);

export class UploadImg extends COMPONENTS {

    constructor(input) {
        super();
        this.render(input)
    }

    adjustTextarea = () => {
        const { height } = this.inputField.getBoundingClientRect()
        const scrollHeight = this.inputField.scrollHeight
        if (scrollHeight > height) {
            this.inputField.style.height = `${scrollHeight}px`
            this.inputField.style.minHeight = `${scrollHeight}px`
        }
    }

    adjustInitTextarea = () => {
        this.inputField.style.height = `30px`
        this.inputField.style.minHeight = `30px`
    }

    handleInput = () => {
        this.adjustTextarea()
    }

    openFolder = () => {
        this.imageUploadInput.click();
    }

    handleFileSelect = async (event) => {
        const file = event.target.files[0]; // Get the selected file
        // Do something with the selected file (e.g., upload to server)
        if (file) {
            console.log('Selected file:', file);
            const _api = new API({ file });
            await _api.CALL()
            }
    }

    spinnerToggle = (mode) => {
        switch (true) {
            case mode === 'on':
                this.klammer.style.display = 'none'
                this.spinner.style.display = 'flex'
                break;
        
            default:
                this.klammer.style.display = 'flex'
                this.spinner.style.display = 'none'
                break;
        }

    }

    render() {
        let c = this.divorow({ class: 'upload-box' })
        c += `<input type="file" id="imageUploadInput" accept="image/*" style="display: ;" >`
        c += this.divc({ class: 'upload-box-icon' })
        c += `<div class="spinner" id="spinner"></div>`

        c += this.divocol({ class: 'upload-input-wrapper'})
        //c += this.divc({ class: 'img-selected', content:'little text' })
        c += this.divorow({ class: '' })
        c += `<textarea 
        class="upload-box-input" 
        maxlength="3000" type="text" 
        placeholder="upload data"
        spellcheck="false" 
        autocomplete="off"></textarea>`

        c += this.divc({ class: 'upload-box-btn', content: 'send' })
        c += this.end(1)
        c += this.end(1)
        c += this.end(1)

        this.innerHTML = c
        this.klammer = this.querySelector('.upload-box-icon')
        this.klammer.appendChild(document.createRange().createContextualFragment(_svg.klammer()))
        this.spinner = this.querySelector('.spinner')
        this.klammer.addEventListener('click', this.openFolder, true)
        this.imageUploadInput = this.querySelector('#imageUploadInput')
        this.inputField = this.querySelector(`textarea`);
        this.imgSelected = this.querySelector('.img-selected')
        // this.inputField.addEventListener('focus', this.handleInputFocus, true);
        // this.inputField.addEventListener('focusout', this.handleInputFocusOut, true);
        // this.inputField.addEventListener('keyup', this.handleInputKeyup, true);
        this.inputField.addEventListener('input', this.handleInput, true);
    }
}; customElements.define('upload-img-box', UploadImg);