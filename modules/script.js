//import {getRadnomDogImages} from "./fetchPicture.js";
//const thumbnails = [];

const API_KEY = "31860017b9a5f2df2e5bdaa05d95162a";
const errorContainer = document.querySelector('#errorMessage');
const movieContainer = document.querySelector('#movieContainer');
const popularContainer = document.querySelector('#popularContainer');
const searchContainer = document.querySelector('#searchContainer');
const TopRated = document.querySelector('.TopRated');
const PopularMovies = document.querySelector('.PopularMovies');
const SearchMovies = document.querySelector('.SearchMovies');
const ErrorMessage = document.querySelector('.ErrorMessage');
const form = document.querySelector('form');

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTg2MDAxN2I5YTVmMmRmMmU1YmRhYTA1ZDk1MTYyYSIsInN1YiI6IjY2MWZhZGM2M2M0MzQ0MDE2MzAzNGM1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pfHrNWYJye_UX0jPomSk7JpOdjDQyWOHRiCxs6p09cc'
  }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then(x => {
    console.log(x)
    const topmovie = x.results
    PopularMovies.classList.add('hiddenClass');
    SearchMovies.classList.add('hiddenClass');
    for (let i = 0; i < topmovie.length; i++) {
      console.log(topmovie[i].title)
      const movietime = document.createElement('p')
      movietime.innerText = topmovie[i].title
      //movieContainer.append(movietime);

      const img = document.createElement('img');
      img.src = `https://image.tmdb.org/t/p/w500/` + topmovie[i].poster_path
      movieContainer.append(movietime, img)
    }

    // document.body.append( JSON.stringify(topmovie[0]))
  })
  .catch(err => console.error(err));

form.addEventListener('submit', event => {
  event.preventDefault();//${searchTerm}
  TopRated.classList.add('hiddenClass');
  const searchTerm = document.querySelector('input').value;
  const searchType = document.querySelector('select').value;
  console.log(searchTerm)
  // const url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`;
  //console.log(url);
  if (searchType == "title") {
    //const url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`;
    //console.log("hello babrie")
    fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`, options)
      .then(response => response.json())
      .then(y => {
        console.log(y)
        const searchText = y.results
        for (let i = 19; i < searchText.length; i++) {
          console.log(searchText[i].title)
          const searchTime = document.createElement('p');
          searchTime.innerHTML = searchText[i].title
          searchContainer.append(searchTime)
        }
        console.log(searchText)
      })
      .catch(err => console.error(err));
  }
  if (searchType == "actor") {
    fetch(`https://api.themoviedb.org/3/search/person?query=${searchTerm}&include_adult=false&language=en-US&page=1`, options)
  .then(response => response.json())
  .then(z => {
    console.log(z)
    const searchActor = z.results
    for (let i = 0; i < searchActor.length; i++) {
      console.log(searchActor[i].known_for[0].title)
      const actorTime = document.createElement('p');
      actorTime.innerHTML = searchActor[i].known_for
      searchContainer.append(actorTime)
      console.log(actorTime)
    }
    console.log(searchActor)
  })
  .catch(err => console.error(err));
  }
}) 
