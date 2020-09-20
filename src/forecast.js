const fs = require('fs')
const path = require('path')
const request = require('request')

const WEATHERSTACK_API_ACCESS_KEY = process.env.WEATHERSTACK_API_ACCESS_KEY || JSON.parse(fs.readFileSync(path.join(__dirname, '../configs.json')).toString()).WEATHERSTACK_API_ACCESS_KEY

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_API_ACCESS_KEY}&query=${latitude},${longitude}`
    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to the weather service!', undefined)
        }
        else if(response.body.error) {
            callback('Unable to get weather!', undefined)
        }
        else {
            const data = response.body.current
            callback(undefined, `${data.weather_descriptions[0]}. It is ${data.temperature} degrees out there, but it feels like ${data.feelslike}.`)
        }
    })
}

module.exports = forecast