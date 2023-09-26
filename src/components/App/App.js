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

const {
    DURATION,
    WIDTH_M,
    WIDTH_L,
    WIDTH_XL,
    MOVIES_TOTAL_S,
    MOVIES_TOTAL_M,
    MOVIES_TOTAL_L,
    MOVIES_TOTAL_XL,
    MOVIES_ROW_M,
    MOVIES_ROW_L,
    MOVIES_ROW_XL,
    DATA_BASE_URL
  } = require('../../utils/const');



function App() {
    // eslint-disable-next-line no-unused-vars
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    const [currentUser, setCurrentUser] = useState({
      name: '',
      email: ''
    });
    const [isLoading, setIsLoading] = useState(false)

    const [isOk, setIsOk] = useState({status: false, message: ''})
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)
    

    const [formValueFound, setFormValueFound] = useState((localStorage.getItem('moviesPlaceholder')) || '');
    
    const [moviesFound, setMoviesFound] = useState(JSON.parse(localStorage.getItem('moviesFound')) || []);
    const [moviesToDrow, setMoviesToDrow] = useState([]);
    const [isShortMovies, setIsShortMovies] = useState(JSON.parse(localStorage.getItem('moviesSwitcherStatus')) || false);

    const [isMore, setIsMore] = useState(true)



    const [moviesSaved, setMoviesSaved] = useState([]);

    

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
        Promise.all([profileGet(), moviesGet()])
        .then(([userData, moviesData]) => {
          setCurrentUser(userData.data);          
          setMoviesSaved(moviesData.data)
          console.log('hello')
        })
        .catch(err => console.log(`Ошибка.....: ${err}`))
      }
      
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
      console.log('check token')
      // eslint-disable-next-line
    }, [])

    const {width} = useResize();
    const [moviesToWidth, setMoviesToWidth] = useState({all: Number, row: Number});

    function updateMoviesToWidth(width) {
      if (width > WIDTH_XL) 
        {setMoviesToWidth({all: MOVIES_TOTAL_XL, row: MOVIES_ROW_XL})}
      if ((width > WIDTH_L) && (width <= WIDTH_XL)) 
        {setMoviesToWidth({all: MOVIES_TOTAL_L, row: MOVIES_ROW_L})}
      if ((width > WIDTH_M) && (width < WIDTH_L)) 
        {setMoviesToWidth({all: MOVIES_TOTAL_M, row: MOVIES_ROW_M})}
      if (width <= WIDTH_M) 
        {setMoviesToWidth({all: MOVIES_TOTAL_S, row: MOVIES_ROW_M})}
      return
    }

    useEffect(() => {
      updateMoviesToWidth(width);
    }, [width, moviesFound]);

    useEffect(() => {
      if ((moviesToDrow.length >= moviesFound.length) || (moviesToDrow.length < moviesToWidth.all)){
        setIsMore(false)
      } else {
        setIsMore(true)
      }
      
    },[moviesToDrow, moviesFound.length, moviesToWidth]);

    useEffect(() => {
      if (isShortMovies === true) {
        let moviesShort = moviesFound.filter(function(movie) {
          return (movie.duration < DURATION);
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
                    formValueFound = {formValueFound}
                    setFormValueFound = {setFormValueFound}
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
                    moviesHandleDelete = {moviesHandleDelete}
                    setIsLoading = {setIsLoading}
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
                    setMoviesFound = {setMoviesFound}
                    setFormValueFound = {setFormValueFound}
                  />
                </>
              }/>
              <Route path="/signup" element={
                <>            
                  <Register
                    isLoggedIn = {isLoggedIn}
                    setIsOk={setIsOk}
                    setIsLoggedIn = {setIsLoggedIn}
                    setIsInfoTooltipOpen={setIsInfoTooltipOpen}
                    setMoviesSaved = {setMoviesSaved}
                    setMoviesFound = {setMoviesFound}
                  />
                </>
              }/>
              <Route path="/signin" element={
                <>
                  <Login
                    isLoggedIn = {isLoggedIn}
                    setIsLoggedIn = {setIsLoggedIn}
                    setIsOk={setIsOk}
                    setIsInfoTooltipOpen={setIsInfoTooltipOpen}
                    moviesSaved = {moviesSaved}
                    setMoviesSaved = {setMoviesSaved}
                    setMoviesFound = {setMoviesFound}
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
