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
    res.send('hi this is expressapi');
})

//localhost:3000/weather?address=london
app.get('/weather', (req, res) => {

    const address = req.query.address

    weatherData(address, (error, {temperature, description, cityName}) => {
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

app.get('*', (req, res) => {
    res.send('page not found')
})

app.listen(port, () => {
    console.log('server is up', port);
})
