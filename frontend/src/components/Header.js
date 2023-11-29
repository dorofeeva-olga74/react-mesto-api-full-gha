import React from 'react';
import logo from '../images/Logo.svg';
import { Routes, Route, Link } from "react-router-dom";
function Header({ userEmail, handleExitUser }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип сайта" />
      <div className="header__navContainer">
        <Routes>
          <Route path="sign-in" element={<Link to="/sign-up" className="header__textAuth">Регистрация</Link>} />
          <Route path="sign-up" element={<Link to="/sign-in" className="header__textAuth">Войти</Link>} />
          <Route path="/" element={
            <>
              <p className="header__userEmail">{userEmail}</p>
              <Link to="sign-in" className="header__textAuth" onClick={handleExitUser}>Выйти</Link>
            </>} />
        </Routes>
      </div>
    </header>
  )
}
export default Header