const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')

const configsBuffer = fs.readFileSync(path.join(__dirname, '../configs.json'))
const configsJSON = configsBuffer.toString()
const configs = JSON.parse(configsJSON)

const questions = [
    {
        type: 'input',
        name: 'PORT',
        message: 'Enter the PORT number [leave blank to keep unchanged]'
    },
    {
        type: 'input',
        name: 'WEATHERSTACK_API_ACCESS_KEY',
        message: 'Enter your WEATHERSTACK API ACCESS KEY [leave blank to keep unchanged]'
    },
    {
        type: 'input',
        name: 'MAPBOX_API_ACCESS_TOKEN',
        message: 'Enter your MAPBOX API ACCESS TOKEN [leave blank to keep unchanged]'
    }
]

inquirer.prompt(questions).then(answers => {
    // Set the environment variables
    Object.entries(answers).forEach(([key, value]) => {
        if(value) configs[key] = value
    })
    fs.writeFileSync(path.join(__dirname, '../configs.json'), JSON.stringify(configs))
})

// console.log(configs)