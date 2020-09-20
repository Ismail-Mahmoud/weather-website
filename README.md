# Weather website
A web application interacting with `weatherstack` and `mapbox` APIs to get the current weather of a location you provide

# Requirements
[Node.js](https://nodejs.org/)

# Installation

Clone this repository to your local machine
```bash
git clone https://github.com/Ismail-Mahmoud/weather-website.git
```

Go to the project directory
```bash
cd weather-website
```

Install dependencies
```bash
npm install
```

# Configuration
Go to [weatherstack](https://weatherstack.com/) and sign up to get your API key

Go to [mapbox](https://www.mapbox.com/) and sign up to get your API key

Run this command to set the localhost port and the API keys you've got
```bash
npm run config
```

# Getting started

Run this command
```bash
npm start
```

Go to the localhost port you've specified (for example http://localhost:3000/)

Enter your location to get the weather

![weather](../weather.jpg)