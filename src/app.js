const fs = require('fs')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./geocode')
const forecast = require('./forecast')

const PORT = process.env.PORT || JSON.parse(fs.readFileSync(path.join(__dirname, '../configs.json')).toString()).PORT

const app = express()

// Define paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set handlebars engine & views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set static directory
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ismail El-Toukhy'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Ismail El-Toukhy'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        msg: 'Help Articles [to be added]',
        name: 'Ismail El-Toukhy'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address

    if(!address) {
        return res.send({error: 'Please provide your location!'})
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, weatherData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                weather: weatherData,
                location,
                address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ismail El-Toukhy',
        errorMessage: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ismail El-Toukhy',
        errorMessage: 'Page not found!'
    })
})

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}!`)
})