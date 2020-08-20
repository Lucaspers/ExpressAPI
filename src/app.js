const express = require('express');
const hbs = require('hbs');
const path = require('path');
const weatherData = require('../utils/weatherData');
const app = express();

const port = process.env.PORT || 3000

const publicStaticDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partilsPath = path.join(__dirname, '../templates/partials');

let idIndex = 1

const movies = [{
    id: 0,
    name: 'Hobbit'
}];

const { json } = require('body-parser');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partilsPath);
app.use(express.static(publicStaticDirPath));
app.use(express.json());


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
        res.send({
            temperature,
            description,
            cityName
        })
    })
})

app.get('/api/movies', (req, res) => res.json(movies))

app.post('/api/movies', (req, res) =>{
    if (!req.body.name){
        res.status(400).json({message: 'Data sent as body is incorrect'})
    }
    else{
        const movie = {id: idIndex++, ...req.body }
        movies.push(movie)
        res.status(201).json(movie)
        }
})


app.get('*', (req, res) => {
    res.render('404', {
        title: 'Sidan hittades inte!'
    })
})


app.listen(port, () => {
    console.log('server is up', port);
})
