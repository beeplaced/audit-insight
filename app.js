require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
const packageJson = require('./package.json');
const Authorization = 'eyJraWQiOiJDM0RpblFGN3BvY0lRTHZEUml5N1VMeHpRM1dGSnhNYUdxZE1EbHJwR084PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5M2U0NTg0Mi1kMDAxLTcwMzEtYWQzYS0yZmE3ODRhYWUwYWQiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNzE2NjU1ODc2LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb21cL2V1LWNlbnRyYWwtMV9aaWRXM2U0UWQiLCJleHAiOjE3MTY3NDIyNzYsImlhdCI6MTcxNjY1NTg3NiwidmVyc2lvbiI6MiwianRpIjoiMjg3YjFkYTEtMmMxYy00NmI4LWIwNDctMzYyYjhiNWY1Yzk3IiwiY2xpZW50X2lkIjoiM2tua3VmamExcGVpb3FtZW01NjYzOHF2OHUiLCJ1c2VybmFtZSI6IjkzZTQ1ODQyLWQwMDEtNzAzMS1hZDNhLTJmYTc4NGFhZTBhZCJ9.Odvr5VIGvM-GE_J0qJqjyuOWbDxcOjwGKUhrvtt-X0Gy_oL67ZAlSXPXgk4CdgtsHmyIFjkkFwcDx0Q84486U1tt5hcchQOf8Kw2sLt5smtNWD433oeyn0sMR-JYTsrpEw72yY5cRg5efap8qEEfsDo0FCUHLqQ0yuDqV2nNAFom0KhAcd5cyyTogNhhh8w8aAumDxTlYZRWg-qtEJGIcQgqR9jHVMLQXqzS6GKNwMgYuhfnQe7IDRNe66bUPJOvAGQk5cF15vSTP9tGiSur5438PQ2qDxs8WKDHI_EXMMLSjemIOqmkhrAEFtw60in4gK70hgtbFgx1eJag3-JoIQ'
const bodyParser = require('body-parser');
const FormData = require('form-data');
const axios = require('axios');
const cors = require('cors');
const expressFormidable = require('express-formidable');

app.use(cors());

const version = packageJson.version
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/client', express.static(path.join(__dirname, 'client')));
app.use('/custom-elements', express.static(__dirname + '/node_modules/custom-elements/components.js'));

app.use((err, req, res, next) => {
    res.status(500).send('Something went wrong!');
});

app.get('/', (req, res) => {
    const isMobile = /Mobile/i.test(req.headers['user-agent']);
    const title = 'Fusion Frame'
    res.render('mobile', { title, version, isMobile });
});

app.use(bodyParser.json({ limit: '50mb' }));

app.post('/upload', async (req, res) => {
    console.log(req.files)

    const context = req.body.context;
    const segment = req.body.segment;
    const imageFile = req.file;
    console.log(imageFile)


    const imageData = Buffer.from(imageFile, 'base64');

    // Create a FormData object
    const formData = new FormData();
    formData.append('context', "context");
    formData.append('segment', 'AUDIT_RISK');
    formData.append('file', imageData);
    const imageURL = `https://mqsbls9jf2.execute-api.eu-central-1.amazonaws.com/image-analyzer`
    // Forward the FormData to another API
    try {
        const response = await axios.post(imageURL, formData, {
            headers: {
                ...formData.getHeaders(),
                'Authorization': Authorization
            }
        });

        // Optionally, handle response from the API

        // Respond to the client
        res.status(response.status).send(response.data);
    } catch (error) {
        // Handle error
        console.error('Error forwarding image:', error);
        res.status(500).send('Error forwarding image');
    }
});

app.get('/404', (req, res) => {
    res.render('404');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/aws-redirect', (req, res) => {
    console.log(req)
    console.log(res)
    res.status(200).send('redirect');
});

app.get('/aws', (req, res) => {
    res.redirect(process.env.AWS_LOGIN_SERVER);
    //amazon-cognito-identity.js
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
