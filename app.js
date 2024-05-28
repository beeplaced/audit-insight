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

