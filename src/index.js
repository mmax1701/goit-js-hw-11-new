import axios from "axios";
import Notiflix from "notiflix";

const KEY = '37350286-5f3aac9a725d44d4223b6e61c'

const form = document.querySelector('.search-form');
const button = document.querySelector('button[type="submit"]')
const list = document.querySelector('.gallery')

form.addEventListener('submit', onSubmit)
// button.addEventListener('click', onClick)





















//"Sorry, there are no images matching your search query. Please try again."