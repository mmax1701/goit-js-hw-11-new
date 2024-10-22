import axios from "axios";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const KEY = '37350286-5f3aac9a725d44d4223b6e61c'
let search;
let page = 1;
let totalLoaded = 0;
let lightbox;

const form = document.querySelector('.search-form');
const input = document.querySelector('input[name="searchQuery"]')
const button = document.querySelector('.load-more')
const list = document.querySelector('.gallery')

button.hidden = true;

form.addEventListener('submit', onSubmit)
button.addEventListener('click', onLoad)

function initLightbox() {
    lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
    });
}

function onSubmit(evt) {
    evt.preventDefault();
    search = input.value;
    page = 1;
    list.innerHTML = '';
    createMarkup(page);
}

function createMarkup(page) {
    const URL = `https://pixabay.com/api/?key=${KEY}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;

    return axios.get(URL)
        .then(resp => {
            const data = resp.data;
            if (data.total === 0) {
                Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
                list.innerHTML = '';
                button.hidden = true;
                return;
            }

            if (page === 1) {
                Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
            }

            totalLoaded += data.hits.length;
            if (totalLoaded >= data.totalHits) {
                button.hidden = true;
                Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
            } else {
                button.hidden = false;
            }
    
        
      const markup = data.hits.map(elem => {
                return `<div class="photo-card">
                <a href="${elem.largeImageURL}"><img src="${elem.webformatURL}" alt="${elem.tags}" loading="lazy" /></a>
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

            
            
        list.insertAdjacentHTML('beforeend', markup)
            button.hidden = false;
              if (lightbox) {
                lightbox.refresh();
            } else {
                initLightbox();
            }
        })
        .catch(err => err);
}


function onLoad() {
    page += 1;
    createMarkup(page)
}