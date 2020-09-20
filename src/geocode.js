const fs = require('fs')
const path = require('path')
const request = require('request')

const MAPBOX_API_ACCESS_TOKEN = process.env.MAPBOX_API_ACCESS_TOKEN || JSON.parse(fs.readFileSync(path.join(__dirname, '../configs.json')).toString()).MAPBOX_API_ACCESS_TOKEN

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_API_ACCESS_TOKEN}&limit=1`
    request({url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to the location service!', undefined)
        }
        else if(response.body.message || response.body.features.length === 0) {
            callback('Unable to find location!', undefined)
        }
        else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode