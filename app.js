require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
const packageJson = require('./package.json');
const auth = require('./auth')

const version = packageJson.version
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/client', express.static(path.join(__dirname, 'client')));
app.use('/custom-elements', express.static(__dirname + '/node_modules/custom-elements/components.js'));

app.use((err, req, res, next) => {
    res.status(500).send('Something went wrong!');
});

app.get('/', (req, res) => {
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