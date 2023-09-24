import './App.css';
import { React, useState, useEffect } from "react";
import { Route, Routes} from 'react-router-dom'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile'
import Register from '../Register/Register.js'
import Login from '../Login/Login.js'
import NotFound from '../NotFound/NotFound.js'
import Popup from '../Popup/Popup.js'
import InfoToolTip from '../InfoToolTip/InfoToolTip'

import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';

import {CurrentUserContext} from '../../contexts/CurrentUserContext';

import {profileGet, moviesGet, moviesPost, moviesDelete, profilePatch} from "../../utils/MainApi"
import { useResize } from "../../utils/useResize"

const DATA_BASE_URL = 'https://api.nomoreparties.co'

function App() {
    // eslint-disable-next-line no-unused-vars
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    const [currentUser, setCurrentUser] = useState({});
    const [isLoading, setIsLoading] = useState(false)

    const [isOk, setIsOk] = useState({status: false, message: ''})
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)
    

    const [moviesPlaceholder, setMoviesPlaceholder] = useState('');
    const [moviesSavedPlaceholder, setMoviesSavedPlaceholder] = useState('');
    
    const [moviesFound, setMoviesFound] = useState(JSON.parse(localStorage.getItem('moviesFound')) || []);
    const [moviesToDrow, setMoviesToDrow] = useState([]);
    const [isShortMovies, setIsShortMovies] = useState(JSON.parse(localStorage.getItem('moviesSwitcherStatus')) || false);

    const [isMore, setIsMore] = useState(true)




    const [moviesSaved, setMoviesSaved] = useState([]);
    const [isShortMoviesSaved, setIsShortMoviesSaved] = useState(JSON.parse(localStorage.getItem('moviesSavedSwitcherStatus')) || false);

    const [moviesSavedToDrow, setMoviesSavedToDrow] = useState(
      JSON.parse(localStorage.getItem('moviesSavedFound')) || 
      JSON.parse(localStorage.getItem('moviesSavedBase'))
      );

    const [moviesFoundSaved, setMoviesFoundSaved] = useState(JSON.parse(localStorage.getItem('moviesSavedFound')));


    useEffect(() => {
      if (isShortMoviesSaved === true) {
        let moviesShort = moviesFoundSaved.filter(function(movie) {
          return (movie.duration < 40);
        });
        setMoviesSavedToDrow(moviesShort)
      } else {
        setMoviesSavedToDrow(moviesFoundSaved)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isShortMoviesSaved, moviesFoundSaved]);



    

    function openPopup(){
      setIsPopupOpen(true)
    }

    function popupClose(){
      setIsPopupOpen(false)
    }

    function infoToolTipClose(){
      setIsInfoTooltipOpen(false)
    }

    function moviesHandleLike(movie){
      moviesPost({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${DATA_BASE_URL}${movie.image.url}`,
        trailer: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: `${DATA_BASE_URL}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id
      })
      .then((data) => {
        moviesGet()
        .then((data) => {
          setMoviesSaved(data.data)
          localStorage.setItem('moviesSavedBase', JSON.stringify(data.data));
        })
        .catch(err => console.log(`Ошибка.....: ${err}`))
      })
      .catch(err => console.log(`Ошибка.....: ${err}`))
    }

    function moviesHandleDelete(movie){
      moviesDelete(movie._id)
      .then((data) => {
        moviesGet()
        .then((data) => {
          setMoviesSaved(data.data)
          localStorage.setItem('moviesSavedBase', JSON.stringify(data.data));
        })
        .catch(err => console.log(`Ошибка.....: ${err}`))
      })
      .catch(err => console.log(`Ошибка.....: ${err}`))
    }

    function handleUpdateUser(name, email) {
      profilePatch(name, email)
      .then((result) => {
        setIsOk({status: true, message: 'Вы успешно обновили данные'});
        setIsInfoTooltipOpen(true)
        setCurrentUser(result.data);

      })
      .catch(err => console.log(`Ошибка.....: ${err}`))
        setIsOk({status: false, message: 'Что-то пошло не так...'});
        setIsInfoTooltipOpen(true);
    }

    

    useEffect(() => {
      if (isLoggedIn){
        profileGet()
        .then((userData) => {
          setCurrentUser(userData.data);
        })
        .catch(err => console.log(`Ошибка.....: ${err}`))
      }
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isLoggedIn]);

    const checkToken = () => {
      profileGet()
      .then(({data}) => {
        if (!data){
          return
        }        
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoggedIn(false);
      })
    }

    useEffect(() => {
      checkToken();
      // eslint-disable-next-line
    }, [])



    const {width} = useResize();
    const [moviesToWidth, setMoviesToWidth] = useState({all: Number, row: Number});

    function updateMoviesToWidth(width) {
      if (width > 1100) 
        {setMoviesToWidth({all: 16, row: 4})}
      if ((width > 800) && (width <= 1100)) 
        {setMoviesToWidth({all: 12, row: 3})}
      if ((width > 500) && (width < 800)) 
        {setMoviesToWidth({all: 8, row: 2})}
      if (width <= 500) 
        {setMoviesToWidth({all: 5, row: 2})}
      return
    }

    useEffect(() => {
      updateMoviesToWidth(width);
    }, [width]);

    useEffect(() => {
      if (moviesToDrow.length >= moviesFound.length){
        setIsMore(false)
      } else {
        setIsMore(true)
      }
      
    },[moviesToDrow, moviesFound.length]);

    useEffect(() => {
      if (isShortMovies === true) {
        let moviesShort = moviesFound.filter(function(movie) {
          return (movie.duration < 40);
        });
        setMoviesToDrow(moviesShort.slice(0, moviesToWidth.all))
      } else {
      setMoviesToDrow(moviesFound.slice(0, moviesToWidth.all))
      }
    },[moviesToWidth.all, moviesFound, isShortMovies]);

    


    return (
      <div className="app">
          <CurrentUserContext.Provider value={currentUser}>
            <Routes>
              <Route path="/" element={
                <>
                  <Header 
                    isLoggedIn = {isLoggedIn}
                    themeHeader = {'header__dark'}
                    themeAccount = "theme__dark_account"
                    themeNav = "theme__dark_nav"
                    themeBurger = "theme__dark_burger"
                    openPopup = {openPopup}
                  />
                  <Main />
                  <Footer />
                </>
              }/>
              <Route path="/movies" element={
                <>
                  <Header 
                    isLoggedIn = {isLoggedIn}
                    openPopup = {openPopup}
                  />
                  <ProtectedRoute element={Movies}
                    isLoggedIn = {isLoggedIn}
                    moviesFound={moviesFound}
                    setMoviesFound = {setMoviesFound}
                    moviesSaved = {moviesSaved}
                    moviesHandleLike = {moviesHandleLike}
                    moviesHandleDelete = {moviesHandleDelete}
                    isLoading = {isLoading}
                    setIsLoading = {setIsLoading}
                    isShortMovies = {isShortMovies}
                    setIsShortMovies = {setIsShortMovies}
                    moviesToWidth = {moviesToWidth}
                    setMoviesToWidth = {setMoviesToWidth}
                    isMore = {isMore}
                    moviesToDrow = {moviesToDrow}
                    moviesPlaceholder = {moviesPlaceholder}
                    setMoviesPlaceholder = {setMoviesPlaceholder}
                  />
                  <Footer />
                </>
              }/>
              <Route path="/saved-movies" element={
                <>
                  <Header
                    isLoggedIn = {isLoggedIn}
                    openPopup = {openPopup}
                  />
                  <ProtectedRoute element={SavedMovies}
                    isLoggedIn = {isLoggedIn}
                    moviesSaved = {moviesSaved}
                    setMoviesSaved = {setMoviesSaved}
                    setMoviesFoundSaved = {setMoviesFoundSaved}
                    moviesSavedToDrow={moviesSavedToDrow}
                    setMoviesSavedToDrow={setMoviesSavedToDrow}
                    moviesHandleDelete = {moviesHandleDelete}
                    isShortMoviesSaved = {isShortMoviesSaved}
                    setIsShortMoviesSaved = {setIsShortMoviesSaved}
                    setIsLoading = {setIsLoading}
                    moviesSavedPlaceholder = {moviesSavedPlaceholder}
                    setMoviesSavedPlaceholder = {setMoviesSavedPlaceholder}
                    
                  />
                  <Footer />
                </>
              }/>
              <Route path="/profile" element={
                <>
                  <Header
                    isLoggedIn = {isLoggedIn}
                    openPopup = {openPopup}
                  />
                  <ProtectedRoute element={Profile}
                    isLoggedIn = {isLoggedIn}
                    setIsLoggedIn = {setIsLoggedIn}
                    handleUpdateUser = {handleUpdateUser}
                  />
                </>
              }/>
              <Route path="/signup" element={
                <>            
                  <Register
                    setIsOk={setIsOk}
                    setIsLoggedIn = {setIsLoggedIn}
                    setIsInfoTooltipOpen={setIsInfoTooltipOpen}
                    setMoviesSaved = {setMoviesSaved}
                    setMoviesFound = {setMoviesFound}
                    setMoviesSavedToDrow = {setMoviesSavedToDrow}
                  />
                </>
              }/>
              <Route path="/signin" element={
                <>
                  <Login
                    setIsLoggedIn = {setIsLoggedIn}
                    setIsOk={setIsOk}
                    setIsInfoTooltipOpen={setIsInfoTooltipOpen}
                    moviesSaved = {moviesSaved}
                    setMoviesSaved = {setMoviesSaved}
                    setMoviesFound = {setMoviesFound}
                    setMoviesSavedToDrow = {setMoviesSavedToDrow}
                  />
                </>
              }/>
              <Route path="/*" element={
                <>
                  <NotFound />
                </>
              }/>
            </Routes>
            <Popup 
                isOpen={isPopupOpen}
                popupClose = {popupClose}
            />
            <InfoToolTip 
                isInfoTooltipOpen={isInfoTooltipOpen}
                infoToolTipClose = {infoToolTipClose}
                isOk = {isOk}
            />
          </CurrentUserContext.Provider>
      </div>
    );
}

export default App;
