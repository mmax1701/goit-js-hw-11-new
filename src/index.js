import axios from "axios";
import Notiflix from "notiflix";

const KEY = '37350286-5f3aac9a725d44d4223b6e61c'
let search;

const form = document.querySelector('.search-form');
const input = document.querySelector('input[name="searchQuery"]')
const button = document.querySelector('button[type="submit"]')
const list = document.querySelector('.gallery')

form.addEventListener('submit', onSubmit)

function onSubmit(evt) {
    evt.preventDefault();
    search = input.value;
    
    createMarkup();
}

function createMarkup() {
    const URL = `https://pixabay.com/api/?key=${KEY}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true`;

    fetch(URL)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(console.log(resp.statusText))
            }
            return resp.json();
        })
        .then(data => {
            if (data.total === 0) {
                console.log("Sorry, there are no images matching your search query. Please try again.");
            }
            console.log(data)
        })
        .catch(err => err)
}








