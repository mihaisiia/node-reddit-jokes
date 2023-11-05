// Joke Button Handling
const jokeButton = document.getElementById('joke-button');
const jokeDisplayTitle = document.getElementById('title');
const jokeDisplayBody = document.getElementById('body');

jokeButton.addEventListener('click', getJoke)
function getJoke(){
    fetch('http://localhost:4111/joke')
    .then(response => response.json())
    .then(joke => {
        jokeDisplayTitle.textContent = joke.data.title;
        jokeDisplayBody.textContent = joke.data.body;
    })
    .catch(err => console.log(err));
}