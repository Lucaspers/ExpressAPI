const express = require('express');
const hbs = require('hbs');
const path = require('path');
const weatherData = require('../utils/weatherData');
const app = express();

const port = process.env.PORT || 3000

const publicStaticDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partilsPath = path.join(__dirname, '../templates/partials');


app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partilsPath);
app.use(express.static(publicStaticDirPath));


app.get('', (req, res) =>{
    res.render('index', {
        title: 'ExpressAPI'
    })
})


app.get('/weather', (req, res) => {

    const address = req.query.address
    if(!address) {
        return res.send({
            error: 'Du måste skriva adressen i sökfältet'
        })
    }

    weatherData(address, (error, {temperature, description, cityName} ={}) => {
        if(error) {
            return res.send({
                error
            })
        }
        console.log(temperature, description, cityName);
        res.send({
            temperature,
            description,
            cityName
        })
    })
})

app.get('/movie', (req, res) => {
    res.send('FILM ENDPOINT');
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Sidan hittades inte!'
    })
})


app.listen(port, () => {
    console.log('server is up', port);
})
