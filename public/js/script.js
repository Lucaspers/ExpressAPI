window.addEventListener('load', begin)

async function begin(){
    const result = await fetch('/api/movies')
    const movies = await result.json()
    
    addEventListeners()
    listMovies(movies)
}

function listMovies(movies){
    const ul = document.querySelector('ul')
    ul.innerHTML = ''
    for (const movie of movies){
        listMovie(movie, ul)
    }
}

function addEventListeners(){
    const button = document.getElementById('add')
    button.onclick = addMovie
} 

async function addMovie(){
    const name = document.getElementById('input')
    const movie = {name: name.value}
    
    event.preventDefault()
    event.target
    
    begin()
    makeRequest(movie)
}

function listMovie(movie, ul){
    const li = document.createElement('li')
    li.innerHTML = JSON.stringify(movie)
    ul.append(li)
}

async function makeRequest(movie) {
    const url = 'http://localhost:3000/api/movies'

    const response = await fetch(url, {
        headers: { "Content-Type": "application/json" }, 
        method: 'POST',
        body: JSON.stringify(movie)
    })
    
    const data= await response.json()
    console.log(data)
}