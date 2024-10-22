import axios from "axios";
import Notiflix from "notiflix";

const KEY = '37350286-5f3aac9a725d44d4223b6e61c'
const URL = 'https://pixabay.com/api/?key=`${KEY}`&q=dog&image_type=photo&orientation=horizontal&safesearch=true'

const form = document.querySelector('.search-form');
const input = document.querySelector('input[name="searchQuery"]')
const button = document.querySelector('button[type="submit"]')
const list = document.querySelector('.gallery')

form.addEventListener('submit', onSubmit)

function onSubmit(evt) {
    evt.preventDefault();
    const search = input.value;
    return search;
}

function searchImg(search) {

}




















//"Sorry, there are no images matching your search query. Please try again."