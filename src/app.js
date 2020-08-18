const express = require('express');
const app = express();
const port = process.env.PORT || 3000

app.get('', (req, res) =>{
    res.send('hi this is expressapi');
})

app.get('/weather', (req, res) => {
    res.send('this is weather endpoint');
})

app.get('*', (req, res) => {
    res.send('page not found')
})

app.listen(port, () => {
    console.log('server is up', port);
})
