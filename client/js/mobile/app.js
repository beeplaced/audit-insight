import { SVG } from './svg.js'; const _svg = new SVG();
import { routes } from './routes.js'

const d = document

d.addEventListener('DOMContentLoaded', async () => {
    const logo = d.querySelector('.nav-logo')
    logo.appendChild(document.createRange().createContextualFragment(_svg.logoNav()))


    const nav = d.querySelector('nav')
    const navBtn = nav.querySelector('.nav-btn')

    const svgNode = document.createRange().createContextualFragment(_svg.nav());
    navBtn.appendChild(svgNode)
    navBtn.addEventListener('click', (e) => {
        // const logoutBtn = document.querySelector('.menu-inner-footer-logo')
        // logoutBtn.appendChild(document.createRange().createContextualFragment(_svg.logout()))
        const mobileMenu = d.querySelector('.menu')
        if (mobileMenu.classList.contains('open')) {
            mobileMenu.classList.remove('open');
            mobileMenu.classList.add('close');
            return
        }
        mobileMenu.classList.remove('close');
        mobileMenu.classList.add('open');
        // const searchBar = mobileMenu.querySelector('.main-search')
        // //searchBar.focus()
        // searchBar.addEventListener('keyup', async (e) => {
        //     const inputVal = searchBar.value
        //     switch (true) {
        //         case inputVal !== '' && inputVal.length >= 3:
        //             console.log('s')
        //             navBar.innerHTML = ''
        //             navBar.classList.add('reco')
        //             const recommend = new RecommendOutput()
        //             await recommend.output(inputVal)
        //             navBar.appendChild(recommend)
        //             if (navOpen === 'nav') {
        //                 const svgNode = document.createRange().createContextualFragment(_svg.back());
        //                 navBack.appendChild(svgNode)
        //                 navBack.addEventListener('touchstart', () => {
        //                     navBack.innerHTML = ''
        //                     navOpen = 'nav'
        //                     recommend.remove()
        //                     navBar.innerHTML = ''
        //                     navBar.classList.remove('reco')
        //                     navBar.appendChild(navigation)
        //                 })
        //             }
        //             navOpen = 'reco'
        //             break;
        //         case inputVal !== '' && inputVal.length < 3:
        //             break;
        //         default: //empty
        //             break;
        //     }
        // });

    })


    routes.start()
})