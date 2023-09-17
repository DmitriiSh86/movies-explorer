import './App.css';
import { React, useState } from "react";
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
import moviesData from '../../utils/moviesData'

import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';

function App() {
    // eslint-disable-next-line no-unused-vars
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    function openPopup(){
      setIsPopupOpen(true)
    }

    function popupClose(){
      setIsPopupOpen(false)
    }

    return (
      <div className="app">
          <Routes>
            <Route path="/" element={
              <>
                <div className='app__header_dark'>
                  <Header 
                    isLoggedIn = {isLoggedIn} 
                    themeAccount = "theme__dark_account"
                    themeNav = "theme__dark_nav"
                    themeBurger = "theme__dark_burger"
                    openPopup = {openPopup}
                  />
                </div>
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
                <Register />
              </>
            }/>
            <Route path="/signin" element={
              <>
                <Login setIsLoggedIn = {setIsLoggedIn}/>
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
