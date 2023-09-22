import './App.css';
import { React, useState, useEffect } from "react";
import { Route, Routes, useNavigate} from 'react-router-dom'

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

import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';

import {CurrentUserContext} from '../../contexts/CurrentUserContext';

import {profileGet, moviesGet, moviesPost, moviesDelete, profilePatch} from "../../utils/MainApi"

const DATA_BASE_URL = 'https://api.nomoreparties.co'

function App() {
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    const [currentUser, setCurrentUser] = useState({});
    const [movies, setMovies] = useState([]);
    const [moviesSaved, setMoviesSaved] = useState([]);

    const [isOk, setIsOk] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [isShortMovies, setIsShortMovies] = useState(false);
    const [isShortMoviesSaved, setIsShortMoviesSaved] = useState(false);

    function openPopup(){
      setIsPopupOpen(true)
    }

    function popupClose(){
      setIsPopupOpen(false)
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
        setCurrentUser(result.data);
      })
      .catch(err => console.log(`Ошибка.....: ${err}`))
    }

    

    useEffect(() => {
      if (isLoggedIn){
        Promise.all([profileGet(), moviesGet()])
        .then(([userData, moviesData]) => {
          setCurrentUser(userData.data);
          setMoviesSaved(moviesData.data);
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
        navigate('/')
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
                    moviesData={movies}
                    setMovies = {setMovies}
                    moviesSaved = {moviesSaved}
                    moviesHandleLike = {moviesHandleLike}
                    moviesHandleDelete = {moviesHandleDelete}
                    isLoading = {isLoading}
                    setIsLoading = {setIsLoading}
                    isShortMovies = {isShortMovies}
                    setIsShortMovies = {setIsShortMovies}
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
                    moviesData={moviesSaved}
                    moviesHandleDelete = {moviesHandleDelete}
                    isShortMoviesSaved = {isShortMoviesSaved}
                    setIsShortMoviesSaved = {setIsShortMoviesSaved}
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
                  />
                </>
              }/>
              <Route path="/signin" element={
                <>
                  <Login setIsLoggedIn = {setIsLoggedIn} setIsOk={setIsOk}/>
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
          </CurrentUserContext.Provider>
      </div>
    );
}

export default App;
