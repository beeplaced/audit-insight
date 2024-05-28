require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
const packageJson = require('./package.json');
const api = require('./cognito')

const version = packageJson.version

//app.use('/custom-elements', express.static(__dirname + '/node_modules/custom-elements/components.js'));

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send('Something went wrong!');
});

app.get('/auth', async (req, res) => {
    if (!req?.headers?.accesstoken){
        res.redirect(process.env.AWS_LOGIN_SERVER);
        return
    }
    const startTime = performance.now();
    const access_token = req?.headers?.accesstoken
    const meta = await api.auth_token(access_token)
    const endTime = performance.now();
    const executionTime = (endTime - startTime) / 1000; // Convert milliseconds to seconds
    meta.executionTime = `aws cognito val in: ${executionTime.toFixed(3)} seconds`;
    res.status(200).json(meta);
    })

app.get('/login', (req, res) => {
    res.redirect(process.env.AWS_LOGIN_SERVER);
    //amazon-cognito-identity.js
});

app.get('/', async (req, res) => {
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
    app.use('/client', express.static(path.join(__dirname, 'client')));
    console.log(version)
    try {
    const isMobile = /Mobile/i.test(req.headers['user-agent']);
    const title = 'Fusion Frame'
    res.render('mobile', { title, version, isMobile });
    } catch (error) {
        console.log(error)
    }
});

//http://localhost:1234/#
//id_token=eyJraWQiOiI2aW5hMGdQQTVxWVNydTdUbzlvVkRITEhCbkt3SjNjTkk5UWJCaXgybENBPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiQlZwcnJxTGxTcnFfQ3JCc2dCVER0ZyIsInN1YiI6IjkzZTQ1ODQyLWQwMDEtNzAzMS1hZDNhLTJmYTc4NGFhZTBhZCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb21cL2V1LWNlbnRyYWwtMV9aaWRXM2U0UWQiLCJjb2duaXRvOnVzZXJuYW1lIjoiOTNlNDU4NDItZDAwMS03MDMxLWFkM2EtMmZhNzg0YWFlMGFkIiwiYXVkIjoiM2tua3VmamExcGVpb3FtZW01NjYzOHF2OHUiLCJldmVudF9pZCI6Ijc4NzM0ZTI5LTVmYzktNDdhMi05ZThlLTZjMzgzNzU2ZDE0NyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzE2OTAzMjg1LCJleHAiOjE3MTY5ODk2ODUsImlhdCI6MTcxNjkwMzI4NSwianRpIjoiYjU2YTZjYjYtOTFlYy00Y2U3LTg0YTYtMjBhNDM2N2YyMTY0IiwiZW1haWwiOiJhZG1pbkBiZWVwbGFjZS5kZSJ9.mUyytxlmovcT6TRxVKfxjYcF4g7jrSL0yfxrAMaBAOoAoIplFj7fIiUQY4bAOjrZaa1uxaIrGFgLrZNioYUq0VhbxJ7GIETsZRRUl1-4ThbzKpX8FgAlQ08-yTH3UKMorPATZsd1zOjNrD-goMInVpotmTgCbqxCPnCN5FbxV8fOTSFIlR3BpSdaDuPpIYRy4pOC8xaCuEoZbEhNTISxUAgBKfieGJmLQ09pEY2BFtpm4hUsZtKOCdTpsf6o8Q3KPQhG91vYmRwZofuxR-dB46tqe-5JAZaEiM30qvJEgEwJbQjyZGSGqvfQLwMRKYPv1VhdKk3N9d5Cl027xawBeQ&
//access_token=eyJraWQiOiJDM0RpblFGN3BvY0lRTHZEUml5N1VMeHpRM1dGSnhNYUdxZE1EbHJwR084PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5M2U0NTg0Mi1kMDAxLTcwMzEtYWQzYS0yZmE3ODRhYWUwYWQiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb21cL2V1LWNlbnRyYWwtMV9aaWRXM2U0UWQiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiIza25rdWZqYTFwZWlvcW1lbTU2NjM4cXY4dSIsImV2ZW50X2lkIjoiNzg3MzRlMjktNWZjOS00N2EyLTllOGUtNmMzODM3NTZkMTQ3IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiBwaG9uZSBvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF1dGhfdGltZSI6MTcxNjkwMzI4NSwiZXhwIjoxNzE2OTg5Njg1LCJpYXQiOjE3MTY5MDMyODUsImp0aSI6IjUwMGUwOWUxLWZiMWUtNGIzZi1iZDYwLTgxNzBhNGM4ZDNlNiIsInVzZXJuYW1lIjoiOTNlNDU4NDItZDAwMS03MDMxLWFkM2EtMmZhNzg0YWFlMGFkIn0.gIMX6zoepEtm0KQzV96K5Qvjvwb9RoJ9okzg-9hgT4ZosrAgtsLhfpd6rV28EHZwjfrJL5vM5K8kJHfpKoXHURrfZA95tx_iNFc4Ix-MeOz_yZIiWiMY11X_5kJ-LHC_IPRZjDe-uozHEiElgZGSilEGkLhUAo3agr90J7j9kvUEtjl11gpxHfD9N-SbNCnMguFLJR1Od20huAVuJCj51sriLSLYShpr8gNXmdUpmURB0amOu6ci0pE_Pahef2Jffl1socvgUyoZs3YpIKFV2hcPSBadoTdnMFg41ragdXVDcWCSrPdAbA7kzdA-ARZ32SQ4cMB_othNivwqRf7jLg
//&expires_in=86400&token_type=Bearer

app.get('/404', (req, res) => {
    res.render('404');
});

app.get('/error', (req, res) => {
    const errorMessage = req.query.message || 'An error occurred';
    res.render('error', { errorMessage });
});

app.get('/:route?', (req, res) => {
    res.render('404');
});

app.listen(process.env.PORT, () => {
    console.log(`open ${process.env.HOST}:${process.env.PORT}`);
});

