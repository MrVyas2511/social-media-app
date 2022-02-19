import React, { useContext, useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/auth';


function MenuBar() {
    
  const { user, logout } = useContext(AuthContext); // AuthContext
  const navigate = useNavigate();
  const pathname = window.location.pathname;
console.log(pathname);
  const path = pathname === '/' ? 'home' : pathname.substring(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);
  const handleLogout = (e,{name}) => {
    logout()
    setActiveItem(name);
    navigate('/');

}
  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name={user.username} active={activeItem === 'home'} onClick={handleItemClick} as={Link} to="/" />

      <Menu.Menu position="right">
        <Menu.Item
          name="profile"
          active={activeItem === 'profile'}
          onClick={handleItemClick}
          as={Link}
          to="/profile"
      />
        <Menu.Item name="logout" onClick={handleLogout} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="home"
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="register"
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
}

export default MenuBar;