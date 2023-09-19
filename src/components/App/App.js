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
import moviesData from '../../utils/moviesData'

import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';

import {getProfile} from "../../utils/MainApi"

function App() {
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    const [currentUser, setCurrentUser] = useState({});

    const [isOk, setIsOk] = useState(false)

    function openPopup(){
      setIsPopupOpen(true)
    }

    function popupClose(){
      setIsPopupOpen(false)
    }

    const checkToken = () => {
      getProfile()
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
                  moviesData={moviesData}
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
                  moviesData={moviesData}
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
                />
              </>
            }/>
            <Route path="/signup" element={
              <>            
                <Register setIsOk={setIsOk} />
              </>
            }/>
            <Route path="/signin" element={
              <>
                <Login setIsLoggedIn = {setIsLoggedIn} setIsOk={setIsOk} setCurrentUser={setCurrentUser}/>
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
      </div>
    );
}

export default App;
