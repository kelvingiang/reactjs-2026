import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/main.css';

MenuComponent.propTypes = {};

export const logout = () => {
  localStorage.removeItem('jwt_token');
  window.location.href = '/login';
};

function MenuComponent(props) {
  return (
    <div>
      <ul className="menu">
        <li>
          <NavLink to="/todo">ToDo</NavLink>
        </li>
        <li>
          <NavLink to="/album">Album</NavLink>
        </li>
        <li>
          <NavLink to="/member">Member</NavLink>
        </li>
        <li>
          <NavLink to="/staff">Staff</NavLink>
        </li>
        <li>
          <NavLink to="/products">Products</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/logout">Logout</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default MenuComponent;
