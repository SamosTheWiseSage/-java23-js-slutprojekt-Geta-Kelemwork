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
const topMovieButton = document.querySelector('#topMovieButton');
const popularMovieButton = document.querySelector('#popularMovieButton');

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

topMovieButton.addEventListener('click', event => {
  event.preventDefault();
  popularContainer.innerHTML = ''
TopRated.classList.remove('hiddenClass');
SearchMovies.classList.add('hiddenClass');
console.log('hhhhhwjhduewdhwbfuwbdhbhwbduwbduwbdwbudbu')
 })

popularMovieButton.addEventListener('click', event=>{
  event.preventDefault();  
  popularContainer.innerHTML = ''
  searchContainer.innerHTML = ''
  TopRated.classList.add('hiddenClass');
  PopularMovies.classList.remove('hiddenClass');
  fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`, options)
  .then(response => response.json())
  .then(b => {
    console.log(b)
    const popular = b.results; 
  
    for (let i = 0; i < popular.length; i++) {
const popmovie = document.createElement('p')
      popmovie.innerHTML = popular[i].title
      const img = document.createElement('img');
          img.src = `https://image.tmdb.org/t/p/w500/` + popular[i].poster_path
      popularContainer.append(popmovie,img)
     
    }

  })
})


form.addEventListener('submit', event => {
  event.preventDefault();//${searchTerm}
  searchContainer.innerHTML = ''
  popularContainer.innerHTML = ''
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
        SearchMovies.classList.remove('hiddenClass')
        const searchText = y.results
        for (let i = 0; i < searchText.length; i++) {
          console.log(searchText[i].title)
          const searchTime = document.createElement('p');
          searchTime.innerHTML = searchText[i].title
          const img = document.createElement('img');
          img.src = `https://image.tmdb.org/t/p/w500/` + searchText[i].poster_path
         searchContainer.append(searchTime,img)
         if (searchText[i].poster_path == null) {
          const img = document.createElement('img');
          img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/660px-No-Image-Placeholder.svg.png?20200912122019'
          searchContainer.append(searchTime,img)
         }
        }
        console.log(searchText)
      })
      .catch(err => console.error(err));
  }
  if (searchType == "actor") {
    fetch(`https://api.themoviedb.org/3/search/person?query=${searchTerm}&include_adult=false&language=en-US&page=1`, options)
  .then(response => response.json())
  .then(z => {
    SearchMovies.classList.remove('hiddenClass')
    console.log(z)
    let i;
    const searchActor = z.results
    for (i = 0; i < searchActor[0].known_for.length; i++) {
      console.log(searchActor[0].known_for[i].title)
      const actorTime = document.createElement('p');
      actorTime.innerHTML = searchActor[0].known_for[i].title
      //searchContainer.append(actorTime)
      console.log(actorTime)
            const img = document.createElement('img');
      img.src = `https://image.tmdb.org/t/p/w500/` + searchActor[0].known_for[i].poster_path
     searchContainer.append(actorTime,img)
     if (searchActor[0].known_for[i].poster_path == null) {
      const img = document.createElement('img');
      img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/660px-No-Image-Placeholder.svg.png?20200912122019'
     }
    }
    console.log(searchActor)
  })
  .catch(err => console.error(err));
  }
}) 
