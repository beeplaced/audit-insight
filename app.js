const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const packageJson = require('./package.json');
const version = packageJson.version
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/client', express.static(path.join(__dirname, 'client')));
app.use('/custom-elements', express.static(__dirname + '/node_modules/custom-elements/components.js'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.get('/', (req, res) => {
    const isMobile = /Mobile/i.test(req.headers['user-agent']);
    const title = 'Fusion Frame'
    res.render('mobile', { title, version, isMobile });
});

app.get('/404', (req, res) => {
    res.render('404');
});


//     return

//     const { context, segment } = req.headers

//     let responseData = {};

//     switch (segment) {
//         case 'risk_score':
//             responseData = {
//                 message: 'File upload received and acknowledged',
//                 'summary': 'The scenario involves a complex industrial machinery setup within a facility, suggesting a controlled and possibly automated industrial process. The machinery includes cylindrical sections, valves, and connecting pipes, with an electrical box for operational controls',
//                 'frequency': 'Medium - Given the nature of the organizations operations and reliance on industrial machinery, the likelihood of a risk scenario occurring is moderate',
//                 'feasibility': 'High - The presence of industrial machinery with electrical integrations poses a high feasibility for potential threat actors to exploit vulnerabilities and disrupt operations',
//                 'impact': 'Medium - A disruption in the industrial process due to a risk scenario could result in moderate financial losses from system downtime, maintenance costs, and potential regulatory fines',
//                 'risk_assessment': 'Medium'
//             };
//             break;
    
//         default: //Audits
//             responseData = {
//                 message: 'File upload received and acknowledged',
//                 summary: 'The image depicts a slick of oil, manifesting as a lustrous, dark sheen which contrasts markedly with the underlying, earth-toned gritty texture.The irregular edges and patterns of the spillage are nuanced, reflecting light in various shades of amber and brown.Shadowy elements, possibly from an overhead structure, intersect the oil slick, introducing a geometric aspect to the otherwise organic flow of the spill. Specks and debris scattered across the surface add further texture to the scene, suggesting an outdoor or industrial setting',
//                 recognized_risk: 'Oil spill resulting in environmental contamination and potential harm to wildlife',
//                 potential_risk: 'Inadequate containment and cleanup efforts leading to long-term pollution of soil and water sources',
//                 finding: 'The organization should enhance spill response procedures to effectively mitigate pollution risks and prevent further environmental damage'
//             };
//             break;
//     }
//     res.json(responseData);
// });

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/error', (req, res) => {
    const errorMessage = req.query.message || 'An unexpected error occurred';
    res.render('error', { errorMessage });
});

app.get('/:route?', (req, res) => {
    res.render('404');
});

const hostname = "192.168.0.104"

app.listen(port, () => {
    console.log(`open ${hostname}:3000/`);
});
