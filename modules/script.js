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
    errorContainer.innerHTML = '';
    const topmovie = x.results
    PopularMovies.classList.add('hiddenClass');
    SearchMovies.classList.add('hiddenClass');
    for (let i = 0; i < topmovie.length; i++) {
      console.log(topmovie[i].title)
      const movietime = document.createElement('p')
      movietime.innerText = topmovie[i].title
      //movieContainer.append(movietime);
      const movieReleaseDate = document.createElement('p');
      movieReleaseDate.innerHTML = topmovie[i].release_date
      const img = document.createElement('img');
      img.src = `https://image.tmdb.org/t/p/w500/` + topmovie[i].poster_path
      movieContainer.append(movietime, movieReleaseDate, img)
    }

    // document.body.append( JSON.stringify(topmovie[0]))
  })
  .catch(displayError);

topMovieButton.addEventListener('click', event => {
  event.preventDefault();
  popularContainer.innerHTML = ''
  TopRated.classList.remove('hiddenClass');
  SearchMovies.classList.add('hiddenClass');
  console.log('hhhhhwjhduewdhwbfuwbdhbhwbduwbduwbdwbudbu')
})

popularMovieButton.addEventListener('click', event => {
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
      errorContainer.innerHTML = '';
      for (let i = 0; i < popular.length; i++) {
        const popmovie = document.createElement('p')
        popmovie.innerHTML = popular[i].title
        const popularReleaseDate = document.createElement('p');
        popularReleaseDate.innerHTML = popular[i].release_date
        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w500/` + popular[i].poster_path
        popularContainer.append(popmovie,popularReleaseDate, img)

      }

    })
    // .catch(displayError)
})


form.addEventListener('submit', event => {
  event.preventDefault();//${searchTerm}
  searchContainer.innerHTML = ''
  popularContainer.innerHTML = ''
  TopRated.classList.add('hiddenClass');
  const searchTerm = document.querySelector('input').value;
  const searchType = document.querySelector('select').value;
  console.log(searchTerm)
  // this is the search if statments for a fetch
  if (searchType == "title") {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`, options)
      .then(response => response.json())
      .then(y => {
        console.log(y)
        if (y.results.length == 0 ) {
          // displayError();
          throw new Error('Not found')
        }
        errorContainer.innerHTML = '';
        SearchMovies.classList.remove('hiddenClass')
        const searchText = y.results
        for (let i = 0; i < searchText.length; i++) {
          console.log(searchText[i].title)
          const searchTime = document.createElement('p');
          searchTime.innerHTML = searchText[i].title
          const searchDate = document.createElement('p');
          searchDate.innerHTML = searchText[i].release_date
          console.log(searchText[i].release_date)
          const searchOverview = document.createElement('p');
          searchOverview.innerHTML = searchText[i].overview
          const img = document.createElement('img');
          img.src = `https://image.tmdb.org/t/p/w500/` + searchText[i].poster_path
          searchContainer.append(searchTime, searchDate, searchOverview, img,)
          if (searchText[i].poster_path == null) {
            img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/660px-No-Image-Placeholder.svg.png?20200912122019'
            searchContainer.append(searchTime, searchOverview, searchDate, img)
          }
        }
        console.log(searchText)
      })
      .catch(displayError);
  }
  if (searchType == "actor") {
    fetch(`https://api.themoviedb.org/3/search/person?query=${searchTerm}&include_adult=false&language=en-US&page=1`, options)
      .then(response => response.json())
      .then(z => {
        SearchMovies.classList.remove('hiddenClass')
        errorContainer.innerHTML = '';
        console.log(z)
        const searchActor = z.results

      
       for (let i = 0; i < searchActor.length; i++) {
        
        const actorTime = document.createElement('p'); 
        const actorDep = document.createElement('p');
        
        actorTime.innerHTML = 'name: ' + searchActor[i].name
       
        actorDep.innerHTML = 'Job Department: ' + searchActor[i].known_for_department
        searchContainer.append(actorTime, actorDep)
        for (let ir = 0; ir < searchActor[i].known_for.length; ir++) {
          console.log(searchActor[i].known_for[ir].title)
          const mediaType = document.createElement('p')
          mediaType.innerHTML = searchActor[i].known_for[ir].media_type + ': ' + searchActor[i].known_for[ir].title;
          if (searchActor[i].known_for[ir].title == null) {
            mediaType.innerHTML = searchActor[i].known_for[ir].media_type + ': ' + searchActor[i].known_for[ir].name;
          }




          searchContainer.append(mediaType)


          
        }     const actorImg = document.createElement('img');
        actorImg.src = `https://image.tmdb.org/t/p/w500/` + searchActor[i].profile_path
        searchContainer.append(actorImg)
        console.log(searchActor)
        if (searchActor[i].profile_path == null) {
            const img = document.createElement('img');
            img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/660px-No-Image-Placeholder.svg.png?20200912122019'
            // searchContainer.append(mediaType)
            // searchContainer.append(actorTime)
            // searchContainer.append(actorDep)
            searchContainer.append(img)
          }
       } 
    
      })
      .catch(displayError);

  }
})

function displayError(error) {
 
if ( error == "Error: Not found") {
  const errorEl = document.createElement('h1');
  errorContainer.innerText = ""
  errorContainer.append(errorEl);
} if (error == "TypeError: Failed to fetch") {
    console.log('ejfklwnfljkwnfkljnsljkvnwsjklvwejklfnweljk')

    console.log(error)

    const errorEl = document.createElement('h1');
    errorContainer.innerText = ""
    errorEl.innerText = "network Error/server timeout. please check Wi-fi connection or try again later."
    errorContainer.append(errorEl);
  }  if (error == "TypeError: Cannot read properties of undefined (reading 'name')") {
    console.log(error)

    const errorEl = document.createElement('h1');
    errorContainer.innerText = ""
    errorEl.innerText = "search not found in database. please check your spelling and try again"
    errorContainer.append(errorEl);

  } else{
    const errorEl = document.createElement('h1');
    errorContainer.innerText = ""
    errorEl.innerText = error.message
    errorContainer.append(errorEl);
  }
}
