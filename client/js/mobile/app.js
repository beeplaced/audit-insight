import { SVG } from './svg.js'; const _svg = new SVG();
import { routes } from './routes.js'

const d = document

d.addEventListener('DOMContentLoaded', async () => {
    const logo = d.querySelector('.nav-logo')
    logo.appendChild(document.createRange().createContextualFragment(_svg.logoNav()))
    routes.start()
})