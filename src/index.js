import axios from "axios";
import Notiflix from "notiflix";

const KEY = '37350286-5f3aac9a725d44d4223b6e61c'
let search;
let page = 1;

const form = document.querySelector('.search-form');
const input = document.querySelector('input[name="searchQuery"]')
const button = document.querySelector('.load-more')
const list = document.querySelector('.gallery')

button.style.display = 'none';

form.addEventListener('submit', onSubmit)

function onSubmit(evt) {
    evt.preventDefault();
    search = input.value;
    
    createMarkup();
}

function createMarkup() {
    const URL = `https://pixabay.com/api/?key=${KEY}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;

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
                list.innerHTML = '';
                return;
            }

            list.innerHTML = data.hits.map(elem => {
                return `<div class="photo-card">
                <img src="${elem.webformatURL}" alt="${elem.tags}" loading="lazy" />
                <div class="info">
                    <p class="info-item">
                    <b>${elem.likes}</b>
                    </p>
                    <p class="info-item">
                    <b>${elem.views}</b>
                    </p>
                    <p class="info-item">
                    <b>${elem.comments}</b>
                    </p>
                    <p class="info-item">
                    <b>${elem.downloads}</b>
                    </p>
                </div>
                </div>`
            }).join('');

            button.style.display = 'block';
        })
        .catch(err => err);
}








