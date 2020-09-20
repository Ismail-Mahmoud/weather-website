console.log('Client-side JS file loaded!')

const form = document.querySelector('form')
const search = document.querySelector('input')

const p1 = document.querySelector('#p1')
const p2 = document.querySelector('#p2')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value
    const url = `/weather?address=${location}`

    p1.textContent = 'Loading..........'
    p2.textContent = ''
    
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                p1.textContent = data.error
            }
            else {
                p1.textContent = data.location
                p2.textContent = data.weather
            }
        })
    })
})